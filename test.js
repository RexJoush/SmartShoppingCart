let moment = require("moment");
let time = moment(Date.now()).format('YYYY.MM.DD HH:mm:ss'); // 时间
let mysql = require("./utils/sql/mysql");
let async = require("async");

let mysql2 = require("mysql");
let pool  = mysql2.createPool({
    connectionLimit : 10,
    host            : 'www.rexjoush.com',
    user            : 'root',
    password        : 'liyihang123',
    database        : 'smartCart'
});

let sql =   "SELECT " +
                "* " +   // 查询所有
            "FROM " +
                "order_list ol, order_commodity oc " +  // 订单表
            "WHERE " +
                "ol.order_id = oc.order_id " +
                "AND openid = ? "; // 通过 openid

let sql2 = "SELECT * FROM order_list where openid = ?";
let sql3 = "SELECT * FROM order_commodity where order_id = ?";

let openid = "oF7VY5G6Vjjmt9ueghKEfmj_r8XY";


let response = {
    data: [],
}
/*
    This
 */
mysql.connection.query(sql, [openid], (err, result) => {

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
        response.data.push(obj);
        arr = [];
        obj = {};
    }
    console.log(response);
});



// console.log(response,333);

/*pool.getConnection((err, conn) => {

    let query = conn.query(sql2,[openid]);

    query.on('error', (err) => {
        throw err;
    })
        .on('result', (r) => {

            conn.pause();

            let obj = {
                openid: r.openid,
                order_id: r.order_id,
                time: r.time,
                order_total: r.order_total,
                commodityList: [],
            };

            pool.getConnection((err, conn2) => {
                let arr = [];
                let query2 = conn2.query(sql3, [r.order_id], (err, result) => {

                    if (err) throw err;

                    for (let r of result) {
                        let o = {
                            name: r.name,
                            price: r.price,
                            amount: r.amount,
                            subtotal: r.subtotal,
                        }
                        arr.push(o);
                        o = {};
                    }
                });

                query2.on('error',(err) => {
                    throw err;
                })
                    .on('result', (r) => {

                        conn2.pause();

                        // for (let r of result) {
                        let o = {
                            name: r.name,
                            price: r.price,
                            amount: r.amount,
                            subtotal: r.subtotal,
                        }
                        arr.push(o);
                        o = {};
                        // }


                        response.data.push(obj);
                        conn2.resume();

                    })
                    .on('end', () => {
                        conn.resume();
                    });
            })
        })
        .on('end', ()=> {
            console.log("response");
            console.log(response);
        });
})*/



/*
mysql.connection.query(sql2, [openid], (err, result) => {

    console.log("222");
    if (err) throw err;
    console.log("333");
    async.filter(result, (r, callback) => {

        // console.log('r',r);
        console.log("444");
        let obj = {
            openid: r.openid,
            order_id: r.order_id,
            time: r.time,
            order_total: r.order_total,
            commodityList: [],
        };

        mysql.connection.query(sql3, [r.order_id], (err, result) => {
            console.log("555");
            // console.log('result',result);

            let arr = [];
            for (let commodity of result) {
                let o = {
                    name: commodity.name,
                    price: commodity.price,
                    amount: commodity.amount,
                    subtotal: commodity.subtotal,
                }
                arr.push(o);
                o = {};
            }
            // console.log(arr);
            obj.commodityList = arr;
            response.data.push(obj);
            // console.log("obj",response.data);
            obj = {};
            callback && callback(response.data);
        })
    }, (err, results) => {
        console.log("666");
        // console.log(response.data);
    });

});
*/



myQuery = function (sql, values) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    // 结束会话
                    connection.release();
                });
            }
        });
    });
};

// let list = await myQuery(sql2, openid);
// console.log(list);