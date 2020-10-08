import passport from "passport";
import passportGoogle from "passport-google-oauth";
import keys from "./keys";

const GoogleStrategy = passportGoogle.OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    () => {
      // passport callback function
    }
  )
);
