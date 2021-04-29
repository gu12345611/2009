// 1. 引入express
const express = require('express');

// 2.创建对象
const app = express();

// 3.创建路由规则  里面的形参 request与response   (自己可以随便定义名字的)
//  建议写成  request与response  因为可以见名思意，方便自己看
// request  对请求报文的封装
// responst 对响应报文的封装

app.get('/', (request, response)=>{
    // 设置响应
    response.send('HELLO EXPRESS express');

});

// 4. 监听端口启动服务
// 这里listen(8000)后面添加了一个回调，用来提示，告诉自己是否监听成功
app.listen(8000, ()=>{
    console.log("服务已经启动，8000端口监听中......");
});
