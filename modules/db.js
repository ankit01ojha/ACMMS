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

Database.prototype.deleteItem = async function(id){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = `DELETE from items where id = '${id}'`;
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

Database.prototype.editItem = async function(id,name){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = `UPDATE items SET name = '${name}' WHERE id = '${id}'`;
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

Database.prototype.getItem = async function(options){
    
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        if(options.item_id){
            var query = `SELECT * from items where id = '${options.item_id}'`;
        }
        else{
            var query = `SELECT * from items where carter_id = '${options.carter_id}' AND name='${options.item_name}'`;      
        }
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        self.conn.end();
        return result.rows;
    }catch(err){
        await self.conn.query("ROLLBACK");
        throw Error (err)
    }
}

Database.prototype.createMenu = async function(options){
    
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        
        for(var i=0;i<options.items.length;i++){
            let item = options.items[i];
            var query = `INSERT INTO menu (date,item_id,type) VALUES (DATE(NOW()),'${item.id}','${item.type}');`
            var result = await self.conn.query(query);
        };
        await self.conn.query("COMMIT");
        self.conn.end();
        return result.rows;
    }catch(err){
        await self.conn.query("ROLLBACK");
        throw Error (err)
    }
}

Database.prototype.getMenu = async function(carter_id){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = `SELECT menu_id,id,name,price,menu.type from items inner join menu on items.id = menu.item_id where items.carter_id = '${carter_id}' AND menu.date = DATE(NOW());`;
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        self.conn.end();
        return result.rows;
    }catch(err){
        await self.conn.query("ROLLBACK");
        throw Error (err)
    }
}

Database.prototype.deleteItemMenu = async function(id){
    var self = this;
    try{
        self.connect();
        await self.conn.query("BEGIN");
        var query = `DELETE from menu where menu_id = '${id}'`;
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        self.conn.end();
        return result.rows;
    }catch(err){
        await self.conn.query("ROLLBACK");
        throw Error (err)
    }
}



module.exports = Database;
