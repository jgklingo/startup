# OpenQuestion: CS260 Startup Application

For course notes, see [notes.md](/notes/notes.md).

## Elevator Pitch

Student/professor interaction is critical to the success of university classes. Professors are meant to be a source of knowledge for their students, but oftentimes students are hesitant to ask questions in front of the class. On the flip side, some students ask irrelevant questions that waste valuable lecture time. OpenQuestion solves this providing a platform to ask questions semi-anonymously that are then vetted before they are presented to the class.

## Key Features

Professors open the app on their computers and create a class, and students are able to submit questions and upvote or downvote the questions posted by other students. Student names are only visible to the professor. The questions are all stored for the professor to view and address later, but if a question reaches a certain vote threshold, it appears on the professor's screen so they can respond to it during the lecture. Every student has a voice, but only the most relevant and common questions come before the class.

## Mockup

![OpenQuestion mock UI](notes/OpenQuestionUI.png)

## Technologies

 - **HTML** - Basic layout of pages. There will be two HTML pages: one to login and input a class code, and one with the main UI (shown in the mockup above).
 - **CSS** - Simple yet interesting colors and shapes will be used throughout the UI. A simple animation will show when a question is submitted.
 - **JavaScript** - Used for login, submitting and showing questions, voting, and calling endpoints.
 - **React** - The main app UI will be contained in a React page that changes based on user input (user questions and votes) and data received from the server (other users' questions and votes).
 - **Web Service** - Backend service with functions to log in and post a question. Will also call an external API to get anonymous names for users on login (https://metmuseum.github.io/).
 - **Authentication** - The user must log in before posting a question.
 - **Database** - Accounts and credentials are stored in a persistent database. Questions and their related data are stored as well.
 - **Websocket** - Votes are broadcast between users in real time.

## WebSocket Changelog

- Added function to update vote counts in the database (to allow votes to be persisted)
- Implemented generic WebSocket proxy in backend (peerProxy.js)
    - If the proxy receives a vote message, it updates the database accordingly then forwards the message to all connected clients
- Added voteNotifier.js to the frontend, which connects to the backend via WebSockets 
    - A message is sent when a vote is cast and a handler is triggered when votes are received from other clients
- Added WebSocket functionality to interface by registering a handler that updates the vote counts when vote notifications are received
    - Also, the interface calls the function that sends a WebSocket message any time the upvote or downvote buttons are pressed
- Implemented a VoteMessage data class with information about votes made by users
- Cleaned up code and tested to make sure that all components are working as intended

## Login Changelog

- Implemented code to establish a connection to the Mongo database using the mongodb library.
    - Uploaded credentials and added a check to ensure that the database connects successfully on service start.
- Created methods for adding, updating, and deleting application data within the database in database.js.
- Configured MongoDB to persist application data in an orderly fashion.
- Enabled new users to create accounts in the database by submitting an email and password.
    - User credentials are encrypted and stored securely in the database using bcrypt hashing.
- Added functionality to allow existing users to securely log in by providing their credentials and comparing hashes.
    - Login creates a cookie that authenticates the user in future interactions with the site.
- Provided the ability for users to log out of their accounts.
    - Logout deletes the cookie.
- Restricted access to specific parts of the application based on user authorization.
    - Implemented a secure router that checks for authorization before passing requests along to secure endpoints.
    - For example, calls to the API to list or add questions will be denied unless associated with the correct cookie.
- Persisted all application data in the database
    - Questions are their own collection and are divided into documents by class code. Each class has an array of question objects that is sent to the frontend upon request.

## Service Changelog

- Created a backend HTTP service and endpoint documentation for endpoints with the following functions (see service/index.js for syntax):
    - Register a new user
    - Login existing user
    - Logout a user
    - Get questions for a class
    - Add question to a class
- Converted the frontend to be served through Express
- Updated the frontend to access the service for data instead of storing the data locally. Data is synchronized between users and persisted (as long as the service stays running)
    - Note that users will (by design) only see the questions in the class that they logged into. If they want to switch classes, they should log out and log in with a different class code
- Added functionality to call the Met Museum API to generate random artist pseudonyms for users, anonymizing their questions
- Also, added functionality to call the cs260 quotes API to put a computer science quote on the front page of the application when logged in
- Fixed React routing so server error shouldn't ever appear
- Added boilerplate database code for future deliverable
- Added vite.config for testing
- Updated deploy script

## React Changelog

- Cleaned up CSS in many places
- App is now bundled using Vite
- App converted into SPA using React
    - Router controls the view of one page based on navigation
    - Header and footer displayed on the main app page, content in between is rendered dynamically
    - React State Hooks implemented to track the app state over all pages
        - State variables contain login/user information
- Added interactive login
    - Questions tab and page does not appear until the user is logged in
    - New page displays on the home tab when a user is logged out with an option to see questions and log out
    - Login page triggers a function that will later be used to make an HTTP request for actual login
        - Right now, only localstorage is being used to simulate a login
    - Session info in top right is hidden by default, but displays the user's info on all pages once they log in
 - Added interactive app interface
    - Questions are now rendered dynamically from an array of question data objects
        - Questions are sorted from most to least votes
        - This will eventually be changed to pull the questions from my web service
    - Questions can be added by entering a question into the box and clicking submit
        - New questions get a timestamp that allows the time since post to be displayed in their cards. This information is shown in a human-readable way by calculating the number of seconds, minutes, hours, days, months, or years since post
        - Questions have a unique UUID to allow them to be accessed later
    - Upvotes and downvotes change the number of votes on the question and also trigger the question list to update with the new order