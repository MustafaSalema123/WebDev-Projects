const express = require('express');
const pool = require('../Shared/pool');
const admin = express.Router();

 const status = {
  Processing: "Processing",
  Pending: "Pending",
  Awaitingpayment: "Awaitingpayment",
  Shipped: "Shipped",
  Completed: "Completed",
  Confirmed: "Confirmed",
  all: "all"
};



admin.get('/orders', (req, res) => {
  try {
    //the request from angular do not allow passing the bodyparameteter in the get request , they are XHR i.e XMlHttpRequest
   // let userEmail = req.query.userEmail;
   var status = req.query.status;
    //var subCategoryId = req.query.subcategoryid;
          // if (statusType !== 'all') {
          //   query += ` WHERE orderstatus = '${statusType}'`;
          let query = 'select * from orders';

          if (status !== 'all') {
            query += ` WHERE orderstatus = '${status}'`;
            }else{
               query = 'select * from orders'
            }
                //     `select orderId, userName, total ,orderstatus from orders `,
            pool.query(
              query,
              (error, orders) => {
                if (error) {
                  res.status(500).send({
                    error: error.code,
                    message: error.message,
                  });
                } else {
                  const allOrders = [];
                  orders.forEach((order) => {
                    allOrders.push({
                      orderId: order.orderId,
                      userName: order.userName,
                      total: order.total,
                      orderDate: order.orderDate,
                      orderstatus: order.orderstatus
                    });
                  });
                  res.status(200).send(allOrders);
                }
              }
            );
  } catch (error) {
    res.status(400).send({
      error: error.code,
      message: error.message,
    });
  }
});


admin.get('/orders/Details/(:id)', (req, res) => {

//let id = req.params.id;
const orderId = req.params.id;
// // const sql = `
// // SELECT o.*, od.productId, od.qty, od.price, p.product_name, p.product_img
// // FROM orders o
// // JOIN orderdetails od ON o.orderId = od.orderId
// // JOIN products p ON od.productId = p.productId
// // WHERE o.orderId = ${id};
// // `;
// // const sql = `
// // SELECT o.*, od.productId, od.qty, od.price, p.product_name, p.product_img
// // FROM orders o
// // JOIN orderdetails od ON o.orderId = od.orderId
// // JOIN products p ON od.productId = p.id
// // WHERE o.orderId = ${id};
// // `;

// // const sql = `
// // SELECT o.*, od.productId, od.qty, od.price, p.product_name, p.product_img
// // FROM orders o
// // JOIN orderdetails od ON o.orderId = od.orderId
// // JOIN products p ON od.productId = p.id
// // WHERE o.orderId = ${id};
// // `;

// const sql = `
// SELECT od.*, p.product_name, p.product_img
// FROM orderdetails od
// JOIN products p ON od.productId = p.id
// WHERE od.orderId = ${id};
// `;

// //'select * from orders where orderId = ' + id

// pool.query(sql,  (error , orders) => {
//   if (error) {
//     res.status(500).send(error);
//   } else {
//     res.status(200).send(orders);
//   }
// })
const orderDetailsQuery = `
    SELECT od.*, p.product_name, p.product_img
    FROM orderdetails od
    JOIN products p ON od.productId = p.id
    WHERE od.orderId = ${orderId};
  `;
  const ordersQuery = `
    SELECT *
    FROM orders
    WHERE orderId = ${orderId};
  `;
  
  let responseData = {};

  // Execute both queries
  pool.query(orderDetailsQuery, (error, orderDetails) => {
    if (error) {
      res.status(500).send(error);
      return;
    }

    responseData.orderDetails = orderDetails;

    pool.query(ordersQuery, (error, orders) => {
      if (error) {
        res.status(500).send(error);
        return;
      }

      responseData.orders = orders;
      res.status(200).send(responseData);
    });
  });

});


admin.post('/orders/Details/(:id)', (req, res) => {

  //let orderId = req.body.orderId;
  let orderId = req.params.id;
    let orderDate = req.body.orderDate;
    let userName = req.body.userName;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let pin = req.body.pin;
    let total = req.body.total;
    let orderstatus = req.body.orderstatus;

    const formattedOrderDate = new Date(orderDate).toISOString().slice(0, 19).replace('T', ' ');
    const sql = `UPDATE orders 
    SET orderDate = '${formattedOrderDate}', 
        userName = '${userName}', 
        address = '${address}', 
        city = '${city}', 
        state = '${state}', 
        pin = '${pin}', 
        total = '${total}', 
        orderstatus = '${orderstatus}'
    WHERE orderId = '${orderId}'`
    
    
    ;


  pool.query(sql,  (error , orders) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(orders);
    }
  })
  
  
  });


admin.post('/addProduct', (req,res) => 
{
  const { id,product_name, product_description, price, ratings, category_id, product_img ,keywords} = req.body;


  const sql = 'INSERT INTO products (id,product_name, product_description, price, ratings, category_id, product_img ,keywords) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
 // const values = [product_name, product_description, price, ratings, category_id, product_img , keywords];
  const values = [id,product_name, product_description, price, ratings, category_id, product_img, keywords];


  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding product');
      return;
    }
    console.log('Product added successfully');
    res.status(200).send('Product added successfully');
  });

})

admin.post('/addCategory', (req, res) => {
  const { category, parent_category_id } = req.body;
  console.log(category , parent_category_id)

  const sql = 'INSERT INTO categories (category, parent_category_id) VALUES (?, ?)';
  const values = [category, parent_category_id];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding category');
      return;
    }
    console.log('Category added successfully');
    res.status(200).send('Category added successfully');
  });
});


  
  


module.exports = admin;