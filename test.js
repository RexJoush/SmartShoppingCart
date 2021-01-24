let moment = require("moment");
let time = moment(Date.now()).format('YYYY.MM.DD HH:mm:ss'); // 时间
let mysql = require("./utils/sql/mysql");
let async = require("async");


let data = "W0.56=c12345678";
let s = data.toString().split("=");
let weight = s[0];
let id = s[1];


let w = s[0].substring(1,s[0].length) * 1;
let commodity_id = id.substring(1, id.length).trim();

mysql.connection.query("select cart from cart where openid = 'oF7VY5IGuEFW5yD-U4tiXFC8po5A'",[],(err, result) => {

    console.log(result[0].cart);

    // let sql = "INSERT INTO purchased (commodity_id, cart, 1) VALUES (?,?)";
    //
    // mysql.connection.query(sql, [commodity_id,result[0]], (err, result) =>{
    //     cons
    // })
});

console.log(w, commodity_id);