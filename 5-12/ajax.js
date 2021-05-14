const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.json())
var connection = mysql.createConnection({
    host     : 'localhost',         //数据库地址
    user     : 'root',              //数据库用户名
    password : '123456',            // 数据库密码
    database : 'api2009'              // 数据库名
});
class DB{
    constructor(){
        _this = this;
        this.connection = null;
    }
    handleDisconnect(){
        this.connection = mysql.createConnection(connection);
        //数据库连接
        this.connection.connect(function(err) {
            if(err) {
                //   console.log('error when connecting to db:', err);
                setTimeout(_this.handleDisconnect, 2000);
            }
        });
        this.connection.on('error', function(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                _this.handleDisconnect();
            } else {
                throw err;
            }
        });
        // 每个小时ping一次数据库，保持数据库连接状态
        clearInterval(pingInterval);
        pingInterval = setInterval(() => {
            _this.connection.ping((err) => {
                if (err) {
                    console.log('ping error: ' + JSON.stringify(err));
                }
            });
        }, 3600000*3);
        return this.connection;
    }
}

module.exports = DB;
    // exports.dbServer = dbServer


// connection.connect();

app.get('/',(reg,res)=>{
    let html = "<h2>Hello Vue</h2>"
    res.send(html)
})
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    // //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    // //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    next();
});

app.get('/test',(reg,res)=>{
    res.send("访问了/test接口")
})
//查询拼接口
app.get('/user/list', (req, res) => {
    req.method
    let sql = "select user_id,user_name,email from p_users  order by user_id desc limit 10"
//执行查询
//     setInterval(function () {
        connection.query(sql, function (error, results, fields) {
            res.send(results)
        });
    // },5000)
})

//添加用户
app.post('/user/add',(req,res)=>{
    let uid = req.body.user_id
    let uname = req.body.user_name
    let sql = `insert into p_users (user_id,user_name) values (${uid},"${uname}")`
    // console.log(sql)
    connection.query(sql, function (error, results, fields) {
            res.send("添加成功")
    });
})
//删除成功
app.delete('/user/del',(req,res)=>{
    let uid = req.query.uid
    let sql = `delete from p_users where user_id=${uid}`
    connection.query(sql,function (error,results,field) {
           res.send("删除成功")
    })
})
//修改
app.put('/user/update',(req,res)=>{
    let name = req.body.user_name
    let uid = req.body.user_id
    let sql = `update p_users set user_name='${name}' where  user_id='${uid}'`
    connection.query(sql,function (error,result,field) {
       res.send('修改成功')
    })
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})