let mysql = require("mysql");
let fs = require("fs");

// 读取配置信息
let data = fs.readFileSync(__dirname + "/mysql.json", "utf-8");

// 解析配置信息
let config = JSON.parse(data);

/// 创建连接
let connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});

connection.connect();

module.exports =  connection;


