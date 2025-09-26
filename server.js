const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Logging
if (process.env.NODE_ENV == "localhost") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Sessions
app.use(
  session({
    secret: "application-session",
    resave: false,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/api-docs", session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

app.get("/login", passport.authenticate("github"), (req, res) => {});

app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Web Server is listening at port ${port}`);
    });
  }
});
