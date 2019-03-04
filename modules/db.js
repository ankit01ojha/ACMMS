const pg = require('pg');


function Database(connectionURI){
    this.connectionURI = connectionURI;
}

Database.prototype.connect = async function(){
    var self = this;
    if(!self.conn){
        try{
            self.conn = new pg.Client(self.connectionURI);
            await self.conn.connect();
            
        }catch(err){
            throw Error (err);
        }
    }
}

//Define DB functions.

Database.prototype.getAllCaters = async function(){
    var self = this;
    try{
        self.connect();
        var query = "SELECT * from carters";
        var result = await self.conn.query(query);
        return result.rows;
    }catch(err){
        throw Error (err)
    }
}

Database.prototype.getAllUsers = async function(){
    var self = this;
    try{
        self.connect();
        var query = "SELECT * from users";
        var result = await self.conn.query(query);
        return result.rows;
    }catch(err){
        throw Error (err)
    }
}


Database.prototype.getUser = async function(username){
    var self = this;
    try{
        self.connect();
        var query = `SELECT * from users WHERE user_id = '${username}'`
        var result = await self.conn.query(query);
        return result.rows;
    }
    catch(err){
        throw Error(err)
    }
}

Database.prototype.createUser = async function(options){
    var self = this;
    try{
        self.connect();
        var query = `INSERT INTO users (user_id,user_type,user_name,password) VALUES ('${options.username}','${options.type}','${options.name}','${options.password}');`
        var result = await self.conn.query(query);
        return result;
    }
    catch(err){
        
        throw new Error(err);
    }
}









module.exports = Database;
