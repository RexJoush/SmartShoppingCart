// 返回不携带数据
exports.returnFunc = function (err, res) {
    if (err) {
        res.status(200)
            .send({result: 0, msg: "fail"});
        throw err;
    } else {
        res.status(200)
            .send({result: 1, msg: "success"});
    }
};
let response = {
    data: []
}
// 返回携带数据
exports.sendFunc = function (err, res, result) {
    if (err) throw err
    else {
        // 赋值
        response.data = result;
        // 返回
        res.status(200)
            .send(JSON.stringify(response));
        // 置空
        response.data = [];
    }
}