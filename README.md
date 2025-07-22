# DevTinder
- Created a Vite + react project
- Removed unnecessary files
- Install tailkwind (older version, new version sucks!!)
- Install DaisyUi
- Add navbar component to App.jsx
- Install react-router-dom
- Create browser router > Routes > Route=/Body > Route children
- Create a outlet in a body component
- Create Footer
- Create a Login Page
- Install axios
- Install cors in backend => add middleware top width configurations: origin , credentials: true
- Whenever you are making an API call so pass axios => {withCredentials : true}
- Install react Redux + @reduxjs/toolkit => consfigure store => add reducer to user - official site
- configureStore => Provider => createSlice => adduser to store
- Login and see if data of user is obtained
- NavBar should update as user logs in
- create a constants file + ccomponents folder
- should not acces other routes withoutn login
- log out feature
- get the feed and add the feed in the store
- build the user card on the feed
- Edit profile feature
- show toat message on save profile
- See all my connections
- See all my connection requests
- Accept reject the conection request
- Feature to interest/ignore the other users


# Deployment
- SignUp on AWS
- Launch instances
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-13-61-176-230.eu-north-1.compute.amazonaws.com
- Install correct version of code
- Git clone of both frontend and backend

- Frontend
   - npm install => install dependencies
   - npm run build
   - sudo apt update
   - sudo apt install nginx
   - sudo systemctl start nginx
   - sudo systemctl enable nginx
   - copy folder from dist(build files) to /var/www/html/
   - sudo scp -r dist/* /var/www/html/
   - enable port :80 of your instance

- Backend
   - allowed ip on mingodb
   - npm install pm2 --g
   - 
   - 