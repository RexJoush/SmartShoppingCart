let net = require("net");
let uuid = require("uuid");
let mysql = require("./utils/sql/mysql");

// 创建 TCP 监听实例
net.createServer((socket) => {

    // 绑定连接事件
    socket.on('connection', (client) => {
        console.log(client + "已连接");
    });

    // 绑定数据事件
    socket.on('data', (data) => {

        console.log(data);
        // socket.send("hello esp");

        // 用户码，生成购物车id
        if (data.toString()[0] === 'u'){
            let cart_id = uuid.v4();
            let openid = data.toString();
            let sql = "INSERT INTO cart (openid, cart) VALUES (?,?)";
            mysql.connection.query(sql, [cart_id, data.toString()], (err, result) => {
                socket.write("=g"); // 返回绑定成功，绿灯
            });

        }
        // 商品码
        else {
            let commodity_id = data.toString();
            let cart_id = uuid.v4();
            let sql = "INSERT INTO purchased (commodity_id, cart) VALUES (?,?)";

            mysql.connection.query(sql, [commodity_id,cart_id], (err, result) =>{
                socket.write("=y"); // 返回黄灯，表示加入购物车成功
            })
        }
    });

    // 绑定关闭事件
    socket.on('close', function(data) {});

}).listen(5001);
