var express = require('express')

var app = express()
// app.use(cors())
app.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:8080', 'http://localhost:3010'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

var version = process.env.TOPTOUR_API_VERSION;
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(require('express-session')(
    { 
        secret: 'keyboard cat', 
        resave: false, 
        saveUninitialized: false,
        cookie  : {
          expires: false,
          // domain: process.env.COOKIE_DOMAIN,
          domain: "localhost"
        }
    })
);

var userRouter = require('./routers/user');
var searchRouter = require('./routers/search');
var analysisRouter = require('./routers/analysis');

// Setup authentication 
var auth = require('./routers/auth');
var passport = auth.passport;

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
    res.send({ 'message': 'Welcome to Toptour API' })
})

app.get('/health', function(req, res) {
    res.send("OK. Running version : " + version)
})

app.use('/search', searchRouter)
app.use('/auth', auth.router)

app.use(auth.isAuthenticated)
app.use('/users', userRouter)
// app.use('/analysis', analysisRouter)

app.listen(process.env.NODE_PORT || 3000)
