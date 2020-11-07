let express = require('express');
let router = express.Router();
let mysql = require("../utils/sql/mysql");
let utils = require("../utils/function/util");

// 获取二维码
router.get('/getQrcode', (req,res)=>{

    // 获取 openid
    let openid = req.query.openid;

    let sql =   "SELECT " +
                    "qrcode " + // 查询二维码
                "FROM " +
                    "user " +   // user表
                "WHERE " +
                    "openid = ?";  // 通过 openid查询

    mysql.connection.query(sql, [openid], (err, result) => {
        utils.sendFunc(err, res, result);
    });
})

module.exports = router;
