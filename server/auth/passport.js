// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const { User } = require('../database/models'); // Assuming you have a User model

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback'
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if the user already exists in the database
//         let user = await User.findOne({ where: { googleId: profile.id } });

//         if (!user) {
//           // Create a new user if it doesn't exist
//           user = await User.create({
//             googleId: profile.id,
//             name: profile.displayName
//           });
//         }

//         // Call the `done` callback to indicate successful authentication
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   // Serialize the user object and store it in the session
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   // Retrieve the user object from the session based on the serialized ID
//   try {
//     const user = await User.findByPk(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });
