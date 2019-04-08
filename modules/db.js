const pg = require('pg');


function Database(connectionURI){
    this.connectionURI = connectionURI;
}

Database.prototype.connect = async function(){
    var self = this;
    
    try{
        self.conn = new pg.Client(self.connectionURI);
        await self.conn.connect();
        
    }catch(err){
        throw Error(err);
    }

}

//Define DB functions.

Database.prototype.getAllCaters = async function(){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = "SELECT * from carters";
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        self.conn.end();
        return result.rows;
    }catch(err){
        await self.conn.query("ROLLBACK");
        throw Error (err)
    }
}

Database.prototype.getAllUsers = async function(){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = "SELECT * from users";
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        self.conn.end();
        return result.rows;
    }catch(err){
        await self.conn.query("ROLLBACK");
        throw Error (err)
    }
}

Database.prototype.getItems = async function(carter_id){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = `SELECT * from items where carter_id = '${carter_id}'`;
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        self.conn.end();
        return result.rows;
    }catch(err){
        await self.conn.query("ROLLBACK");
        throw Error (err)
    }
}

Database.prototype.getUser = async function(username){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = `SELECT * from users WHERE user_id = '${username}'`
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        self.conn.end();
        return result.rows;
    }
    catch(err){
        await self.conn.query("ROLLBACK");
        throw Error(err)
    }
}

Database.prototype.getOwner = async function(username){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = `SELECT * from owners WHERE user_id = '${username}'`
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        self.conn.end();
        return result.rows;
    }
    catch(err){
        await self.conn.query("ROLLBACK");
        throw Error(err)
    }
}


Database.prototype.createUser = async function(options){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = `INSERT INTO users (user_id,user_type,user_name,password) VALUES ('${options.username}','${options.type}','${options.name}','${options.password}');`
        var result = await self.conn.query(query);
        if(options.type == "owner"){
            if(options.carter_id == undefined){
                throw Error("CarterID not present");
            }
            var query = `INSERT INTO owners (user_id,carter_id) VALUES ('${options.username}','${options.carter_id}');`
            var result = await self.conn.query(query);   
        }
        await self.conn.query("COMMIT");
        self.conn.end();
        return result;
    }
    catch(err){
        await self.conn.query("ROLLBACK");
        throw new Error(err);
    }
}

Database.prototype.createItem = async function(options){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        if(options.price != undefined){
            var query = `INSERT INTO items (id,name,price,carter_id,default_type) VALUES ('${options.ID}','${options.name}','${options.price}','${options.carter_id}','${options.type}');`
        }
        else{
            var query = `INSERT INTO items (id,name,carter_id,default_type) VALUES ('${options.ID}','${options.name}','${options.carter_id}','${options.type}');`
        }
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        self.conn.end();
        return result;
    }
    catch(err){
        await self.conn.query("ROLLBACK");
        throw new Error(err);
    }


}


/* 

Todo

4. Create Menu


*/
module.exports = Database;
