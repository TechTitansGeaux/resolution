# Resolution

Are you fighting with a friend? Clashing with a coworker? Battling with your bro?

Welcome to Resolution! This innovative app will change the way you resolve interpersonal conflict. Resolution offers multiple features for all of your conflict resolution needs. This app is a medium for you to express your emotions, communicate with others in a low pressure environment, and make decisions about how to move forward. Utilizing all that resolution has to offer will improve your relationships with others and your quality of life overall.

Within Resolution, there are three primary approaches to handling interpersonal conflict:

**Scream Into The Void** – Do you need to vent? Often, this might be the first constructive way to deal with your conflict. Put words to your emotions, say your piece and get everything off your chest. The intro to our site is a live feed of user’s screams. These screams are anonymous. This feature of resolution helps users process their emotions, without any worry of judgment or consequence. User’s can find commiseration with other anonymous screams, or post screams of their own.

**Meme Style Communications** – Do you have something you need to say, but just can’t find the right way to say it? We offer a convenient and expressive meme generator to help communicate your feelings to others in a light-hearted way. It might be tough to say what needs to be said; why not break the ice with a meme. 

**Decision Maker** – Are you ready to move forward with your conflict, but need an unbiased way to decide how? Our decision maker feature offers a fair, neutral answer. Through a game of rock, paper, scissors, you and your opponent will be able to come to a concrete decision. 

Finally, earn points and trophies as you become a master conflict resolver! Our top 10 Resolution users will be featured on the Wall of Fame.


# Developers

**DOT ENV FILE**  
Create a dot env file and with the following variables:  
```
NODE_ENV=development  
HOST=http://127.0.0.1:4000  
GOOGLE_CLIENT_ID=(your own client ID)  
GOOGLE_CLIENT_SECRET=(your own client secret)  
```
Tip-- Some may need to add quotes to their variable definitions; ex: ```NODE_ENV="development"```
For deployment, HOST will be the instance address and not 127.0.0.1

**STARTUP**  
* Must use Node version 18.16.1  
* Create the dot env file  
* Install dependencies: ```npm i```  
* Start a mySQL server: ```mysql.server start (mac)```  ```sudo service mysql start (WSL)```
* Connect to mySQL shell: ```mysql -u root (mac, WSL)```  
* Build the webpack: ```npm run build:dev```  
* Start the server: ```npm start```  
* Seed the database: ```npm run seed```  

**KNOWN BUGS**  
* An axios patch error logs to the console on point/trophy updates -- does not affect points and trophies rendered on pages or saved to DB.  
* The Wall of Fame first loads gold trophies for every user and shows these briefly before updating to the correct trophies. This is exacerbated when deploying and testing the app with many users at once.
* If a user enters a room in rock, paper, scissors, and then navigates to another page before finishing a game, the user is still in that room until the user refreshes the page or logs out.
* In Meme Messenger, if a user types either top or bottom text and the API/page doesn't update before clicking send, the other images will not display.
* If a user deletes his/her profile, the user is redirected back to the login page. To login again, the server must be restarted.


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
- API: https://apimeme.com/

# Contributors
Thanks to all the following people for contributing to this project:
[@EdwardCooper](https://github.com/cooptothe)
[@BernieJanuary](https://github.com/janvierjr)
[@BenjaminKlein](https://github.com/Benjaminklein99)
[@SamsonThai](https://github.com/skanda108)
[@JackieWisdom](https://github.com/wisdomjackie)


# Contact Info
If you have questions about the app and/or would like to get in touch. Feel free to contact any of the above contributors.
