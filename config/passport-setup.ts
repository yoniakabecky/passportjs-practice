import passport from "passport";
import passportGoogle from "passport-google-oauth";
import { User } from "../models/user";
import { User as UserType } from "../types/user";
import keys from "./keys";

const GoogleStrategy = passportGoogle.OAuth2Strategy;

passport.serializeUser((user: UserType, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: String, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our db
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have the user
          console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          // create user in our db
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("new user created: " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
