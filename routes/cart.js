
/*
    购物车相关方法
 */

let express = require("express");
let router = express.Router();
let mysql = require("../utils/sql/mysql");
let utils = require("../utils/function/util");
let uuid = require("uuid");
let moment = require("moment");

/*
    通过 openid 查询当前用户的购物车信息
 */
router.get("/getCart", (req, res) => {
    // 获取 openid
    let event = JSON.parse(req.query.event);
    let openid = event.userInfo.openId;
    console.log(openid);

    let sql =   "SELECT " +
                    "co.*, p.number " +
                "FROM " +
                    "cart c, purchased p, commodity co " +
                "WHERE " +
                    "c.cart = p.cart " +
                    "AND p.commodity_id = co.commodity_id " +
                    "AND openid = ?";

    mysql.connection.query(sql, [openid], (err, result) => {
        utils.sendFunc(err, res, result);
    });
})


// let obj = {
//     list: [
//         {
//             commodity_id: '12345678',
//             describe: '300ml',
//             name: '百事可乐',
//             number: 2,
//             price: '3.00',
//             thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604161600505&di=158e641cf1c2fede41ef3b84cc0dae7d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F81%2F99%2F8356e4183f27e64.jpg'
//         },
//         {
//             commodity_id: '21456892',
//             describe: '绿箭无糖',
//             name: '绿箭',
//             number: 5,
//             price: '3.00',
//             thumb: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1509541942,3203478360&fm=26&gp=0.jpg'
//         },
//         {
//             commodity_id: '92103572',
//             describe: '106g',
//             name: '卫龙大面筋',
//             number: 2,
//             price: '3.00',
//             thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604761556493&di=83dd0ec03e69f776ac2a4fae3ce274e2&imgtype=0&src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2019%2F03%2F25%2FFnVCMtGvZUDC96poh7ugebLQfbEv.gif%3FimageView2%2F2%2Fw%2F580%2Fh%2F580%2Fq%2F75%2Fformat%2Fgif'
//         },
//         {
//             commodity_id: '36108792',
//             describe: '20泡装',
//             name: '立顿红茶',
//             number: 5,
//             price: '36.00',
//             thumb: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3006004860,2169310909&fm=26&gp=0.jpg'
//         },
//         {
//             commodity_id: '48120378',
//             describe: '300ml',
//             name: '可口可乐',
//             number: 2,
//             price: '3.00',
//             thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604761298558&di=8065c55bb2c40bca5b51961a448dd114&imgtype=0&src=http%3A%2F%2Fimage3.suning.cn%2Fb2c%2Fcatentries%2F000000000104041561_3_400x400.jpg'
//         }
//     ],
//     totalPrice: 21300,
//     url: '/cart/commit',
//     userInfo: {
//         appId: 'wx956802241cc56466',
//         openId: 'oF7VY5G6Vjjmt9ueghKEfmj_r8XY'
//     }
// };
/*
    结账
 */
router.get("/commit", (req, res) => {
    let event = JSON.parse(req.query.event);
    // console.log(event);
    let openid = event.userInfo.openId;
    let list = event.list;
    let order_id = uuid.v4(); // 创建订单 id
    let time = moment(Date.now()).format('YYYY.MM.DD HH:mm:ss'); // 下单时间
    let order_total = event.totalPrice; // 订单总价
    console.log("aaa");
    /*
        将订单添加到 order_list 表
        商品列表添加到 order_commodity 表
     */

    let sqlOrder = "insert into order_list (order_id, openid, time, order_total) values (?,?,?,?)";
    let sqlCommodity = "insert into order_commodity (order_id, name, price, amount, subtotal) values (?,?,?,?,?)";
    
    // 添加商品
    for (let commodity of list) {
        mysql.connection.query(sqlCommodity, [order_id, commodity.name, commodity.price, commodity.number, commodity.price * commodity.number], (err, result) => {

        });
    }
    // 添加订单
    mysql.connection.query(sqlOrder, [order_id, openid, time, order_total], (err, result) => {

    });

    // 删除购物车
    let sqlDel0 = "select * from cart where openid = ?";
    let sqlDel1 = "delete from purchased where cart = ?";
    let sqlDel2 = "delete from cart where openid = ?";

    // 查询出来购物车id
    mysql.connection.query(sqlDel0, [openid], (err, result) => {
        // 根据查出来的 cart 删除 purchased 表中的数据 result[0].cart
        mysql.connection.query(sqlDel1, [result[0].cart], (err, result) => {
            // 删除购物车表中的数据
            mysql.connection.query(sqlDel2, [openid], (err, result) => {
                utils.returnFunc(err, res);
            });
        })
    });


})


module.exports = router;