const express = require('express');
const dbconnection = require('../modules/db');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const authModule = require('../modules/loginStrategy');
const bcrypt = require('bcrypt');

//Env Variables
const mode = process.env.MODE || "development"
const dbURL = (process.env.DATABASE_URL) || "postgres://postgres:root@localhost:5432/ACMMS-dev"
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


//Verification routes

app.get('/checkAuthenticated',[ensureAuthenticated],function(req,res,next){
    res.status(200).json({
        user:req.user
    });
});

app.get('/checkOwner',[ensureAuthenticated,isOwner],function(req,res,next){
    res.status(200).json({
        message:"Authorized"
    });
});

app.get('/checkAdmin',[ensureAuthenticated,isAdmin],function(req,res,next){
    res.status(200).json({
        message:"Authorized"
    });
});



//Privileged Routes

app.get('/logout',[ensureAuthenticated],function(req,res,next){
    req.logout();
    return res.status(200).json({
        message:"Logged out!"
    });
});

app.get('/items',[ensureAuthenticated,isOwner],function(req,res,next){
    let user = req.user;
    let db  = new dbconnection(dbURL);
    let result = db.getOwner(req.user.id);
    result.then(function(data){
        let cater_id = data[0].carter_id;
        let result2 = db.getItems(cater_id);
        result2.then(function(data2){
            return res.status(200).json({
                data:data2
            });
        },function(err){
            next(err);
        });
    },function(err){
        next(err);
    });
});

app.post('/createitem',[ensureAuthenticated,isOwner,findMissing(["name","type"])],function(req,res,next){
    let user = req.user;
    let db  = new dbconnection(dbURL);
    let result = db.getOwner(req.user.id);
    result.then(function(data){
        req.body.carter_id = data[0].carter_id;
        req.body.ID = req.body.carter_id + "_" + req.body.name.toLowerCase().split(' ').join("_");
        let result2 = db.createItem(req.body);
        result2.then(function(){
            return res.status(200).json({
                message:"Item created!"
            });
        },function(err){
            next(err);
        })
    },function(err){
        next(err);
    });
});

app.post('/ownerRegistration',[ensureAuthenticated,isAdmin,findMissing(["username","password","carter_id","name"])],function(req, res, next) {
    let user = req.user;
    let db = new dbconnection(dbURL);
    let result = db.getUser(req.body.username);
    result.then(function(data){
        if(data.length > 0){
            return res.status(400).json({
                'message':"User already exists"
            });
        }
    },function(err){
        next(err);
    });
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err){
            next(err);
        }
        else{
            req.body.password = hash;
            req.body.type = 'owner';
            let result = db.createUser(req.body);
            result.then(function(data){
                return res.status(200).json({
                    'message':'Created new owner!'
                });
            },function(err){
                next(err);
            });
        }
        
    });
});




//Test route for user registration
if(mode == 'development'){
    app.post('/register',findMissing(["username","password","type","name"]),function(req,res,next){
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
    });    
}

/*

    Error Handlers

*/

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



/*

Middleware functions

*/

function findMissing(fields){
    return function(req,res,next){
        var missing = [];
        fields.forEach(function(field){
            if(!(field in req.body)){
                missing.push(field);
            }
        });

        if(missing.length > 0){
            res.status(400).json({
                'message': missing.toString() + ' fields are missing'
            });
        }

        next();
    }
}

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){ return next();}
    
    return res.status(401).json({
        message:"You are not authenticated!"
    }); 
}

function isOwner(req,res,next){
    if(req.user.type == 'owner'){ return next();}

    return res.status(403).json({
        message: "You are unauthorized!"
    });
}

function isAdmin(req,res,next){
    if(req.user.type == 'admin'){ return next(); }

    return res.status(403).json({
        message: "You are unauthorized!"
    });
}




module.exports = app;