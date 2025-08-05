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
   - pm2 start npm --name "DevTinder-Backend" -- start
   - pm2 logs
   - pm2 list, pm2 flush <name> 
   - sudo systemctl restart nginx
   - 


   FRONTEND => http://13.60.173.63/
   BACKEND  => http://13.60.173.63:3000

   Domain name = DevTinder.com => 13.60.173.63

   FRONTEND = DevTinder.com
   BACKEND =  DevTinder.com:3000 => DevTinder.com/api


# Nginx Config

   server name => 13.60.173.63

   location /api/ {
                        proxy_pass http://localhost:3000/;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                       }

# Adding a custom domain name
- Purchased domain name from GoDaddy
- signup on cloudflare
- changed the name servers on GoDaddy and point it to cloudflare
- wait for sometime till your nameservers are updated
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE- you can buy domain name from any registrar but the if the nameservers is of other entity then other entity will manage the domains
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- DNS Records A devconnect.org.in 13.60.173.63
- Enable SSL for website

# Sending Email via SES
- Create a IAM user 
- Give aces to AmazonSESFullaccess
- Amazon SES: create an identity
- verify your domain name
- verify an email address
- Install AWS SDK - v3
- Code Examples - https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- Setup sesClient 
- Access credentials should be created in IAM under securityCredentials tab
- add the credentials to the new env file
- write code for sesClient 
- write code for sendEmail
- make the email dynamic but i have not done that

# Scheduling cron jobs
- Istalled npm-cron module
- created a cronjob file in utils 
- called the file in app.js
- remember the meaning of the string in cro jobs (.schedule)
- date fns
- Amazon ses bulk emails

# Razorpay payment integration 
- Signup on razorpay and complete KYC
- Go through the steps (How it works?)
- Created a UI for premium page
- Created an API for create order in backend
- Initialized Razorpay in utils
- creating order on razorpay
- created a schema and model
- saved the order in payments collection
- make the api dynamic
- Setup razorpay webhook on your live API
- ref - https://github.com/razorpay/razorpay-node/blob/master/documents/webhook.md
- ref - https://razorpay.com/docs/webhooks/payloads/payments/
-