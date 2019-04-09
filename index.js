//Node modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


//ENV variables
const PORT = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY || 'lol';

var app = express();
app.set('view engine','ejs');

//Routes
const api = require('./routes/api');

app.use(session({   //Express session
    secret: secretKey,
    saveUninitialized: true,
    resave: true
}));
// Middlewares
app.use(passport.initialize());
app.use(passport.session());

  
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());  
app.use("/public", express.static(path.join(__dirname, 'public')));

//Routes

app.use('/api',api);



//Static
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});




app.listen(PORT,function(){
    console.log("Server started at Port: " + PORT);
});
