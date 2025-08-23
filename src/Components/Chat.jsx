import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";

const DEFAULT_AVATAR = "/default-avatar.png";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((s) => s.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);

  const socketRef = useRef(null);
  const seenIdsRef = useRef(new Set());
  const bottomRef = useRef(null);

  // --- Helpers --------------------------------------------------------------

  // get an ID string out of many possible shapes
  const getId = (v) => {
    if (!v) return undefined;
    if (typeof v === "string") return v;
    if (typeof v === "object") {
      // common shapes from backends
      return v._id || v.id || v.userId || v.authorId;
    }
    return String(v);
  };

  const normalize = (m) => {
    // prefer senderId, but fall back to userId/authorId if your server uses those
    const authorId =
      getId(m.senderId) ?? getId(m.userId) ?? getId(m.authorId);

    const senderObj =
      (m.senderId && typeof m.senderId === "object" ? m.senderId : null) ||
      (m.author && typeof m.author === "object" ? m.author : null);

    return {
      _id: m._id,                          // server _id if present
      text: m.text || "",
      senderId: authorId,                  // unified author id
      firstName: m.firstName || senderObj?.firstName,
      photoUrl: m.photoUrl || senderObj?.photoUrl,
      createdAt: m.createdAt || new Date().toISOString(),
    };
  };

  const isMine = (msg) => {
    const sid = getId(msg.senderId);
    const uid = getId(userId);
    if (sid && uid) return String(sid) === String(uid);
    // very last resort fallback (name match) if ids are missing
    if (msg.firstName && user?.firstName) return msg.firstName === user.firstName;
    return false;
  };

  // --- Data loading ---------------------------------------------------------

  const fetchChat = async () => {
    const { data } = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });

    // set partner info for avatar/name fallback
    const partner =
      (data?.participants || []).find(
        (p) => String(p._id) === String(targetUserId)
      ) || null;
    setTargetUser(partner);

    const initial = (data?.messages || []).map((msg) => normalize(msg));
    initial.forEach((m) => m._id && seenIdsRef.current.add(m._id));
    setMessages(initial);
  };

  useEffect(() => {
    if (targetUserId) fetchChat();
  }, [targetUserId]);

  // --- Socket ---------------------------------------------------------------

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    const roomId = [String(userId), String(targetUserId)].sort().join("_");
    socket.emit("joinChat", { roomId, userId, targetUserId });

    const handleReceived = (payload) => {
      // de-dupe by server _id if present
      if (payload._id) {
        if (seenIdsRef.current.has(payload._id)) return;
        seenIdsRef.current.add(payload._id);
      }
      setMessages((prev) => [...prev, normalize(payload)]);
    };

    socket.off("messageReceived"); // avoid stacking listeners
    socket.on("messageReceived", handleReceived);

    return () => {
      socket.off("messageReceived", handleReceived);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  // --- Send (no optimistic add) --------------------------------------------

  const sendMessage = () => {
    const text = newMessage.trim();
    if (!text || !socketRef.current) return;

    const outgoing = {
      text,
      userId,         // author id
      targetUserId,
      firstName: user.firstName,
      photoUrl: user.photoUrl,
      createdAt: new Date().toISOString(),
    };

    socketRef.current.emit("sendMessage", outgoing);
    setNewMessage("");
  };

  // autoscroll to newest
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- UI -------------------------------------------------------------------

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-base-300">
      <header className="p-4 bg-base-100 border-b border-base-300 shadow-sm">
        <h1 className="text-xl font-bold">
          Chat with {targetUser?.firstName || "User"}
        </h1>
      </header>

      <main className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, i) => {
            const mine = isMine(msg);
            const side = mine ? "chat-end" : "chat-start"; // flip these if you want
            const name = mine
              ? user?.firstName || "Me"
              : msg.firstName || targetUser?.firstName || "User";
            const avatar = mine
              ? user?.photoUrl || DEFAULT_AVATAR
              : msg.photoUrl || targetUser?.photoUrl || DEFAULT_AVATAR;

            return (
              <div key={msg._id || i} className={`chat ${side}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt={`${name} avatar`} src={avatar} />
                  </div>
                </div>
                <div className="chat-header">
                  {name}
                  <time className="text-xs opacity-50 ml-2">
                    {msg.createdAt &&
                      new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </time>
                </div>
                <div className="chat-bubble bg-accent-content text-base-100">
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </main>

      <footer className="p-4 bg-base-200 border-t border-base-300">
        <div className="join w-full flex justify-center">
          <label className="input input-bordered join-item w-full md:w-96 lg:w-[40rem]">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              type="text"
              placeholder="Type here.."
              required
            />
          </label>
          <button onClick={sendMessage} className="btn btn-primary join-item">
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
