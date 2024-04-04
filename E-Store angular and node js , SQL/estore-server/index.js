const express = require('express');
const productCategories = require('./routes/productCategories');
const products = require('./routes/products');
const users = require('./routes/users');
const orders = require('./routes/order');
const admin = require('./routes/admin');
const app =express();
const PORT = 5001;
const cors = require('cors');
const bodyparser =require('body-parser')


app.use(cors());
 // resolve the data recriced in the body of the request before it passes it to the relevent route
app.use(bodyparser.json());
app.use('/productCategories', productCategories)
app.use('/products', products);
//app.use('/users',users)
app.use('/users', users);
app.use('/orders', orders);
app.use('/admin', admin);

const server = app.listen(PORT , () => {
    console.log('app is running on teh port - 5001');
});


app.get('/',(req ,res)=> {
    // let proData = 
    // {
    //     pName: 'Jacket',
    //     price: 45,
    //     img: 'sho[-1.jpg',
    // };
    // res.status(200).res.send(proData);
})