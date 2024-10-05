/*
* Title: users database
* Description: for get / update user table  
* Author: Ashikur Rahman SA
* Date: Monday, 30 -September-2024 (12:45:40)
*
*/
/***************************************************************************************************** DEPENDENCIES */
const mysql = require('mysql2/promise');

/***************************************************************************************************** DATABASE SETUP */

const dbConfig={
    host:'localhost',
    user:'root',
    password:'Ashik@123',
    database:'task4'
}


/***************************************************************************************************** MODULE SCAFFOLDING */
const db = {}

/***************************************************************************************************** MAKE CONNECTION */
db.connect = async (query="",values=[],callback=(err,res)=>'') =>
{
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        if(Array.isArray(values)){
            const [rows, fields] = await connection.execute(query,values);
            return callback(false,rows);
        }
        else {
            const [rows, fields] = await connection.execute(query);
            return values(false,rows); // when give callback function as 2nd params
        }
    }
    catch (err) {
        return callback(err,[]);
    } 
    finally {
        if (connection) {
            await connection.end();
        }
    }
}

/***************************************************************************************************** GET USERS */
db.getUsers = (callback=(err,res)=>'')=>
{
    db.connect('SELECT * FROM users',callback);
}


/***************************************************************************************************** GET USER BY MAIL */

db.getUsersByEmail = (mail="", callback=(err,res)=>"") => 
{
    db.connect('SELECT * FROM users WHERE email = ?', [mail],callback);
}

/***************************************************************************************************** ADD NEW USER */    
db.addNewUser = (user={},callback=(err,res)=>"") =>
{
    
}



/***************************************************************************************************** EXPORT MODULE */
module.exports = db;