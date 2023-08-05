# Resolution

Are you fighting with a friend? Clashing with a coworker? Battling with your bro?

Welcome to Resolution! This innovative app will change the way you resolve interpersonal conflict. Resolution offers multiple features for all of your conflict resolution needs. This app is a medium for you to express your emotions, communicate with others in a low pressure environment, and make decisions about how to move forward. Utilizing all that resolution has to offer will improve your relationships with others and your quality of life overall. 

Within Resolution, there are three primary approaches to handling interpersonal conflict: 

Scream Into The Void – Do you need to vent? Often, this might be the first constructive way to deal with your conflict. Put words to your emotions, say your piece and get everything off your chest. The intro to our site is a live feed of user’s screams. These screams are anonymous. This feature of resolution helps users process their emotions, without any worry of judgment or consequence. User’s can find commiseration with other anonymous screams, or post screams of their own.

Meme Style Communications – Do you have something you need to say, but just can’t find the right way to say it? We offer a convenient and expressive meme generator to help communicate your feelings to others in a light-hearted way. It might be tough to say what needs to be said; why not break the ice with a meme. 

Decision Maker – Are you ready to move forward with your conflict, but need an unbiased way to decide how? Our decision maker feature offers a fair, neutral answer. Through a game of rock, paper, scissors, you and your opponent will be able to come to a concrete decision. 

Finally, earn points and trophies as you become a master conflict resolver! Our top 10 Resolution users will be featured on the Wall of Fame. 


# Developers

**DOT ENV FILE**
Create a dot env file and with the following variables:
NODE_ENV=development
HOST=http://127.0.0.1:4000
GOOGLE_CLIENT_ID=(your own client ID)
GOOGLE_CLIENT_SECRET=(your own client secret)
Tip-- Some may need to add quotes to their variable definitions; ex: NODE_ENV="development"

**STARTUP**
Create the dot env file
Install dependencies: npm i
Start a mySQL server: mysql.server start (mac)
Connect to mySQL shell: mysql -u root (mac)
Build the webpack: npm run build:dev
Start the server: npm start
Seed the database: npm run seed

**KNOWN BUGS**
An axios patch error logs to the console on point/trophy updates -- does not affect points and trophies rendered on pages or saved to DB.
The Wall of Fame first loads gold trophies for every user and shows these briefly before updating to the correct trophies. This is exacerbated when deploying and testing the app with many users at once.


# Tech Stack

- React
- React-router
- MySQL
- Sequelize
- Express
- Axios
- AWS EC2
- Bootstrap
- Socket.io
- eslint
- Webpack
- DayJS
