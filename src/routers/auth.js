var express = require('express')
var passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var router = express.Router()

if (process.env.API_BASE_NAME) {
  baseUrl = "https://" + process.env.API_BASE_NAME
} else {
  baseUrl = "http://localhost:3010";
}

var loginUrl = baseUrl + '/auth/login';

var db = require('../storage/db')

console.log("process env", process.env);
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

async function findOrCreate(userData, callback) {
  let user
  try {
      user = await db.getUserBySocialData(userData);
  } catch(err) {
    console.log(err);
  }

  if (user) {
    return user;
  }

  return await db.createUserBySocialData(userData);
}


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
var callbackUrl = baseUrl + "/auth/google/callback";


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: callbackUrl,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
    console.log(done);
    done(null, profile);
    // findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

router.get('/', (req, res) => {

  console.log(process.env)
  res.send("auth");
});

router.get('/login', (req, res) => {
  console.log(baseUrl);
    res.redirect('/auth/google')
    // res.send("<a href='" + baseUrl + "/auth/google'>Login google</a>");
})

router.get('/logout', (req, res) => {
    res.sendStatus(400);
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function(req, res) {

    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/google/logout', (req, res) => {
    req.logout();
    res.redirect(baseUrl + '/');
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});

function isAuthenticated(req, res, next) { 
    if (!req.user) {
        res.send(401, { 'url' : baseUrl + '/auth/login'})
        // res.redirect('/auth/login');
    } else {
        // console.log(req.user.isAuthenticated(), "is auth");
        next();
    }
    
}

function getJwtToken(service) {
  return "";
}

module.exports = {
    router : router,
    passport : passport,
    isAuthenticated : isAuthenticated,
    getJwtToken : getJwtToken
} 