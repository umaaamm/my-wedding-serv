const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'containers-us-west-161.railway.app',
    database: 'railway',
    user: 'root',
    password: 'zG8UrJqpu9j85OOOSXNa',
    port: '7328'
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('database connected!')
    }
});

module.exports= connection;
