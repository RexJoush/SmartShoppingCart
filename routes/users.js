let express = require('express');
let router = express.Router();
let mysql = require("../utils/sql/mysql");
let utils = require("../utils/function/util");
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});




// 获取订单
router.get("/getOrder", (req, res) => {
    let event = JSON.parse(req.query.event);
    let openid = event.userInfo.openId;

    let sql =   "SELECT " +
                    "* " +   // 查询所有
                "FROM " +
                    "order " +  // 订单表
                "WHERE " +
                    "openid = ?"; // 通过 openid
    mysql.connection.query(sql, [openid], (err, result) => {
        utils.sendFunc(err, res, result);
    })


});


module.exports = router;
