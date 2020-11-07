
-- 商品表
create table commodity (
	commodity_id varchar(255), -- 商品 id
	name varchar(20), -- 商品名
	describe varchar(255), -- 商品描述
	price varchar(10), -- 商品价格
	thumb varchar(255) -- 商品图片
);

-- 购物车表
create table cart (
    openid varchar(255), -- 该车所属用户
    cart varchar(255) -- 购物车id
);

-- 已购商品表
create table purchased (
    commodity_id varchar(255), -- 商品 id
    cart varchar(255) -- 购物车id
);

-- 订单表
create table order_list (
    order_id varchar(255), -- 订单id,标识商品列表
    openid varchar(255), -- 订单所属用户
    date varchar(20), -- 下单日期
    time varchar(20), -- 下单时间
    order_total varchar(20) -- 总价格

);

-- 订单商品列表表
create table order_commodity (
    order_id varchar(255), -- 订单id
    name varchar(50), -- 商品名
    amount int, -- 商品数量
    subtotal varchar(20), -- 小计价格
    total varchar(20) -- 总价格
);

-- 用户表
create table user (
    openid varchar(255), -- 用户 openid
    nickname varchar(50), -- 用户微信名
    avatar_url varchar(255), -- 用户头像
    qrcode varchar(255) -- 用户二维码
);