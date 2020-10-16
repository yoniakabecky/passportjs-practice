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
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have the user
          done(null, currentUser);
        } else {
          // create user in our db
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
