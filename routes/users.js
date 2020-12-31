let express = require('express');
let router = express.Router();
let mysql = require("../utils/sql/mysql");
let utils = require("../utils/function/util");
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// 获取订单
router.get('/getOrder', (req, res) => {
    let event = JSON.parse(req.query.event);
    let openid = event.userInfo.openId;

    let sql =   "SELECT " +
                    "* " +   // 查询所有
                "FROM " +
                    "order_list ol, order_commodity oc " +  // 订单表
                "WHERE " +
                    "ol.order_id = oc.order_id " +
                "AND openid = ? "; // 通过 openid

    let resArr = [];

    mysql.connection.query(sql, [openid], (err, result) => {

        if (err) throw err;

        // 先将结果封装为 map 集合
        let map = new Map();

        for (let r of result){

            // 如果当前订单列表已经有了
            if (map.has(r.order_id)){
                let arr = map.get(r.order_id);
                arr.push(r);
                map.set(r.order_id, arr);
            } else {
                map.set(r.order_id, [r]);
            }
        }
        // 在进行数组封装

        for (let m of map){
            let arr = [];
            for (let i = 0; i < m[1].length; i++){
                let o = {
                    name: m[1][i].name,
                    price: m[1][i].price,
                    amount: m[1][i].amount,
                    subtotal: m[1][i].subtotal,
                }
                arr.push(o);
                o = {};
            }

            let obj = {
                openid: m[1][0].openid,
                order_id: m[1][0].order_id,
                time: m[1][0].time,
                order_total: m[1][0].order_total,
                commodityList: arr,
            };
            resArr.push(obj);
            arr = [];
            obj = {};
        }
        utils.sendFunc(err, res, resArr);
    });
});




// 获取订单
/*router.get("/getOrder", (req, res) => {
    let event = JSON.parse(req.query.event);
    let openid = event.userInfo.openId;

    let sql =   "SELECT " +
                    "* " +   // 查询所有
                "FROM " +
                    "order_list ol, order_commodity oc " +  // 订单表
                "WHERE " +
                    "oc.order_id = ol.order_id " +
                    "AND openid = ?"; // 通过 openid
    mysql.connection.query(sql, [openid], (err, result) => {

        let list = [];
        let data = {};
        for (let commodity of result){
            data.name = commodity.name;
            data.price = commodity.price;
            data.amount = commodity.amount;
            data.subtotal = commodity.subtotal;
            list.push(data);
            data = {};
        }


        let response = {
            order_id: result[0].order_id,
            openid: result[0].openid,
            time: result[0].time,
            totalPrice: result[0].order_total,
            commodityList: list,
        }


        utils.sendFunc(err, res, response);

    })


});*/


module.exports = router;
