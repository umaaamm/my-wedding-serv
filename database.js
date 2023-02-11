const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    database: 'db_my_wedding',
    user: 'root',
    password: ''
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('database connected!')
    }
});

module.exports= connection;