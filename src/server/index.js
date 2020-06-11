//index.js 后端入口文件，启动后端服务
const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据是需要
const express = require('express');
const app = express();

app.use(bodyParser.json());

// 后端api路由
app.use('/api', routerApi);

//监听端口
app.listen(3000, function () {
  console.log('success listen at port:3000......')
})