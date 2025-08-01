//export const BASE_URL= "/api/v1";  // for prod

//export const BASE_URL= "http://localhost:3000/api/v1"; // for local

export const BASE_URL = location.hostname == "localhost" ? "http://localhost:3000/api/v1"  :  "/api/v1";