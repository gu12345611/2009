var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user :'root',
    password:'123456',
    database:'edu2008'
})
connection.connect();
let sql = "select * from p_course limit 10"
connection.query(sql,function (error,results,fields) {
     console.log(error)
     console.log(results)
});
connection.end()