let express = require('express');
let path = require('path');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let cartRouter = require('./routes/cart');

let app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);



app.listen(5000);
