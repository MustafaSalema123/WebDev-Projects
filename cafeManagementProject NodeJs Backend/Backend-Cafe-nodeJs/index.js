const express = require('express');
var cors = require('cors');
const connection = require('./DBconnection')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/catgeory')
const productRoute = require('./routes/product')
const billRoute = require('./routes/bill')
const dashBoardRoute = require('./routes/Dashboard')
const app = express();
app.use(cors())
app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use('/user',userRoute)
app.use('/category',categoryRoute)
app.use('/product', productRoute)
app.use('/bill', billRoute)
app.use('/dashboard', dashBoardRoute)

module.exports = app;