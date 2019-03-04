const express = require('express');
const dbconnection = require('../modules/db');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const authModule = require('../modules/loginStrategy');
const bcrypt = require('bcrypt');

//Env Variables
const mode = process.env.MODE || "development"
const dbURL = (process.env.DATABASE_URL && mode == "production") || "postgres://postgres:root@localhost:5432/ACMMS-dev"
const secretKey = process.env.SECRET_KEY || 'lol';


var app = express.Router();


//Passport configurations

passport.use(authModule.Strategy);
passport.serializeUser(authModule.Serializer);
passport.deserializeUser(authModule.deSerializer);


//Public Routes
app.post('/login',passport.authenticate('local'),function(req,res){
    res.status(200).json({
        user:req.user
    });
});


app.get('/dashboard',function(req,res,next){
    passport.authenticate('bearer',function(err,user){
        if(user && user.type == 'owner'){
            //Authenticated owner
        }
        else if(user && user.type == 'admin'){
            //Authenticated admin
        }
        else{
            //Unauthenticated show menu data
        }
    })(req,res,next);
});



//Privileged Routes

app.post('/ownerRegistration', function(req, res, next) {
    passport.authenticate('bearer', function(err, user) {
      if (user){
        if (user.type === 'admin'){
          return res.status(200).json({userContent:'you are a premium user'});
        }else{
          return res.status(403).json({
            'message': 'Not a privileged user',
          });
        }
      }else{
        return res.status(401).json({
          'message': 'You are not authenticated.',
        });
      }
    })(req, res, next);
});


//Test route for user registration

app.post('/register',function(req,res,next){
    var missing = [];
    if(!req.body.username){
        missing.push('username');
    }
    if(!req.body.password){
        missing.push('password');
    }
    if(!req.body.type){
        missing.push('type');
    }
    if(!req.body.name){
        missing.push('name');
    }
    if(missing.length > 0){
        res.status(400).json({
            'message': missing.toString() + ' fields are missing'
        });
    }
    else{
        let db = new dbconnection(dbURL);
        let result = db.getUser(req.body.username);
        result.then(function(data){
            if(data.length > 0){
                return res.status(400).json({
                    'message':"User already exists"
                });
            }
        });
        bcrypt.hash(req.body.password,10,function(err,hash){
            if(err){
               next(err);
            }
            else{
                req.body.password = hash;
                let result = db.createUser(req.body);
                result.then(function(data){
                    db.conn.end();
                    return res.status(200).json({
                        'message':'Created new user!'
                    });
                },function(err){
                    next(err);
                });
            }
            
        });
        
    }
    
});

//Handle 404
app.use(function(req,res){
    return res.status(404).json({
        message:"Page not found"
    });
})

//Error handler for development mode.
if(mode == "development"){
    app.use(function(err,req,res,next){
        res.status(err.status || 500);
        res.render('error',{
            message:err.message,
            error:err
        });
    });
}

//Error handler in production mode.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: "Internal server Error",
        error: {}
    });
});

module.exports = app;