CAPP-API

Description :

This is a REST API for a chat web application. This api allows new users to register and registered users to login, users can then edit their profile by changing their firstname,lastname,status, or by uploading a new profile picture. The user can then search for other registered users ,once they get the other users they have the option to view that user's profile and/or follow them. A user has to follow back a follower to be able to chat with them, once the users have followed each other the chanel for chatting is then established. Realtime messaging takes place between mutual followers. Users can log out of the app at any time they like.

Technologies :

  - Express.js framework for the backend server-side.
  - mongoose was used for database schemas creation and connecting the nodejs code to the mongodb database .
  - jsonwebtoken was used to achieve token generation and verification. Used for both access and refresh tokens.
  - Bcrypt was used to achieve password hashing. In the rear case that someone gets access to the database.
  - cors and corsOptions are used to allow certain sites from the browser access to the api.
  - cookiesParser to achieve token security.
  - dotenv used to access .env environmetal variables from the nodejs code.
  - multer is used for image upload during profile picture update.
  - socket.io used to achieve realtime messaging.
  - moongodb was the database choice for this project.

Structure of the project:

  - app.js is where the server is established to listen to requests. This is the same file where the nodejs code connects to the mongodb database and establish a realtime connection between the server and the client.
  - models section is for establishing the schema of the user,chat, and message entities.
  - routes section is used to state the resources that requests has e.g POST,GET,e.t.c .Including what function would be invoked by a certain request with a particular URL.
  - middleware section is for the autorization of requests, whether the access tokens or request headers are valid.
  - helpers section has asynchronous functions were the logic behind the requests happen, status codes and messages are returned here. mongodb functoins are called and also return results here.
  - an environmental variables file is included to store sensitive informations such as database passwords to name a few.
