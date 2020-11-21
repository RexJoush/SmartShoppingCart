let net = require("net");
let uuid = require("uuid");
let connection = require("./utils/sql/mysql");

// 创建 TCP 监听实例
net.createServer((socket) => {

    // 绑定连接事件
    socket.on('connection', (client) => {
        console.log(client + "已连接");
    });

    // 绑定数据事件
    socket.on('data', (data) => {

        console.log(data);
        socket.send("hello esp");
        // 用户码，生成购物车id
        // if (data.toString()[0] === 'u'){
        //     let cart_id = uuid.v4();
        //     let sql = "INSERT INTO cart (cart_id, user_id) VALUES (?,?)";
        //     connection.query(sql, [cart_id, data.toString()], (err, result) => {
        //         console.log(result);
        //     });
        //
        // }
        // // 商品码
        // else {
        //
        // }
    });

    // 绑定关闭事件
    socket.on('close', function(data) {});

}).listen(5001);
