
/*
    购物车相关方法
 */

let express = require("express");
let router = express.Router();
let mysql = require("../utils/sql/mysql");
let utils = require("../utils/function/util");

/*
    通过 openid 查询当前用户的购物车信息
 */
router.get("/getCart", (req, res) => {
    // 获取 openid
    let event = JSON.parse(req.query.event);
    let openid = event.userInfo.openId;

    let sql =   "SELECT " +
                    "co.* " +
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

router.get("/purchased", (req, res) => {

})


module.exports = router;