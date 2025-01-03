const passport = require("passport");
const AuthModel = require("../model/googleAuth");
const AdminModel = require("../model/AdminModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/v1/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await AuthModel.findOne({ googleId: profile.id });
        if (!user) {
          user = await AuthModel.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          // create admin ======================
          let user2 = await new AdminModel({
            user: user._id,
            AdminName: user.displayName,
            AdminEmail: user.email,
            AdminImage: user.image,
          });
          await user2.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await AuthModel.findById(id);
  done(null, user);
});
