var express = require('express')

var app = express()

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

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

app.use('/search', searchRouter)
app.use('/auth', auth.router)

app.use(auth.isAuthenticated)
app.use('/users', userRouter)
app.use('/analysis', analysisRouter)

app.listen(process.env.NODE_PORT || 3000)
