# Referee Management and Evulation System (REFMES)
You can reach the website via this link => [`REFMES`](https://www.refmes.org/)
## :beginner: Description of the project
### What is REFMES?
The unfairness in the assignments of referees is argued by fans all the time because the performance of the referees is a topic of discussion after almost every match.
With our website, **REFMES**, we aim to make a significant contribution to the solution of assignment problems in referee management,especially since we will collect
comments and evaluations from football fans, who are the biggest complainers about these issues.
### Why is REFMES?
**REFMES** has many unique and useful features such as informative club pages, referees, fans, and TFF officials. Also, thanks to its user-friendly design and simple 
structured interface,all users can find everything they want and more on a single web app.

### USERS
- [x] REFMES has a register system which enable users to create an account. https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/22 https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/26
- [x] REFMES has a login system so users can enter the website. https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/23 https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/24
- [x] REFMES users can view their profiles and edit their information, logout from the website or delete their accounts if they want.
https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/25 https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/32 https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/29 https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/27
- [x] REFMES users can see error page if they are trying to reach the pages without permission https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/28
- [x] REFMES users can see the referrees and reach the information related to them https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/59 https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/33
- [x] REFMES users can reach the information about each club in their spesific page https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/58 https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/57
- [x] REFMES users can give votes to the referees both before and after match and comment about them after the matches. https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/56 https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/55 https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/54
### OBSERVERS
- [x] Observers can login the system with the credentials they are given by admin.
- [x] Observers can vote the referees seperately which contributes the referee assignment algorithm.
### ADMIN
- [x] REFMES Admin can login the Admin Control panel with special password where he/she can make necessary changes. https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/41
- [x] REFMES Admin can add referees to the system. https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/42
- [x] REFMES Admin can select the referee list each week who are going to rule a match. https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/62
- [x] REFMES Admin can enter the results of the matches that are finished. https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/64
- [x] REFMES Admin can add the observers to the system so that they can vote seperately. https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/63

## User Documentation

### How to install the software?

Currently the users cannot install our app since we have no app version in App Store or Google Play Store but in the future we are planning to publish app version too. So,this part will be updated when the app is published

### How to run the software?

Users can click https://www.refmes.org/ and enter the website.

Users can register by creating an account so that they can use a great deal of features of our website:
* They can vote the referees both before they appointed to the matches and their performances related to the matches.
* Their votes will be accounted for referee assignment algorithm therefore, they can contribute to fairness problem.  
* They can see average points of referees, standings, fixtures, match importance algorithm and referee assignment algorithms. 

### How to report a bug?
If you find a bug, you can follow these steps...
1. First, specify the location where it took place.
2. You should write about what is the problem and what may cause this problem.
3. Describe your path around the app until you see the error because we need to reproduce the error.
4. You can include a screenshot or video recording that explains visually to make it easier to understand.
5. Write down when it occurred and what the expected behavior should be.
6. Write down the hardware and web versions you are using.
7. If you have a suggestion, you can add your suggestion to the end.
8. Finally you can send us an email with your documentation. Here is our email: refmes.org@gmail.com

***If you want to get more detailed information, you can view a sample bug report*** [here](https://github.com/SU-CS308-22FA/Team-1-REFMES/issues/73).

### Known bugs?
Currently we do not have any particular bugs. However, we are not completely sure that there are no bugs since we do not complete all the tests.
We are still applying tests to check whether our software works without bugs or not. 

## Developer Documentation
The REFMES project is made using MERN stack:
- [Mongo DB](https://www.mongodb.com/)
- [Express JS](https://expressjs.com/)
- [React JS](https://reactjs.org/)
- [Node JS](https://nodejs.org/)

### :electric_plug: How to obtain the source code?
All frontend files are located in the client folder and backend folders can be found as other files such as routes and server.js. Therefore, the project has both
the backend and front in the same repository.So, acting according to the instructions below will provide access to the source code of the project.

If you want to obtain the source from GitHub manually: 
- Click the code button on the right upper side of the repository
- Download Zip 
- Extract zip file
- Open Code IDE with extracted Zip file

If you created a folder on code IDE then use this command to clone the repository with all source codes:
```sh
$ git clone https://github.com/SU-CS308-22FA/Team-1-REFMES.git
```
### :file_folder:The layout of project folder/file structure
```
├── client
│   ├── public
│   ├── src
|   |   ├── components
│   │   ├── logos
│   │   ├── pages
│   │   ├── store
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── config
├── models
├── server.js
├── package.json
├── .gitignore
└── README.md
```

#### **Frontend side**
##### `client`- //This folder is for the frontend side of the application.
- ##### `public` - This holds all of our static files.
- ##### `src`- This holds all of the frontend react and javascript code files.
    - ##### `components` - This folder contains common design codes used in the application.
    - ##### `logos` - This folder holds the logos of clubs 
    - ##### `pages` - This folder contains individual subfolders of code for all pages used in the application.
    - ##### `store` - This folder contains the code that checks and handles if the user is logged into the app.
    - ##### `App.js` - This is what renders all of our browser routes and different views
    - ##### `index.js` - This is what renders the react app by rendering App.js
- ##### `package.json` - Defines npm behaviors and dependencies with packages for the frontend
#### **Backend side**
- ##### `config` - This holds our configuration files, like mongoDB configuration
- ##### `models` - This contains all of our data models for MongoDB
- ##### `routes` - This holds all of our HTTP to URL path associations for each unique url
- ##### `server.js` -This folder starts the backend application and provides a database connection.
- ##### `package.json` - Defines npm behaviors and dependencies with packages for the backend.Also includes first scripts to run the app
- ##### `.gitignore` - Tells git which files to ignore in Git
#### `README` - Informative documentation file of app

### How to build and deploy the software?
#### :hammer: If you want to build on your local machine
1. [Follow this instructions](#how-to-obtain-the-source-code) to get source code
2. Install NPM packages both for frontend and the backend
   ```sh
   $ npm install && cd client && npm install
   ```
3. Setting the env variables
   - `MONGO_URI` = the uri string for your database
   - `REACT_APP_URL` = backend url that axios requests are sent to
4. To start the application
   ```sh
   $ npm run dev
   ```
#### :rocket: If you want to deploy
Our web application includes the Heroku postscript to be deployed to Heroku. For Heroku deployment:
- Select your GitHub repository
- Link to Heroku account
- Set environment variables on Heroku (as described above)
- Press the deploy button
