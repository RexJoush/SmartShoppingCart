let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});




// 获取订单
router.get("/getOrder", (req, res) => {

});


module.exports = router;
