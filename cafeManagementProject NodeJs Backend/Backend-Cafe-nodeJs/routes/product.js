const express = require('express');
const connection = require('../DBconnection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


// {
//     "name": "Test",
//     "categeoryId": 1,
//     "description": "Test description",
//     "price": 123
// }
router.post('/add', auth.authenticateToken , checkRole.checkRole, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    query = "insert into Product(name,categeoryId,description,price,status) values (?,?,?,?,'true')";
    connection.query(query, [product.name , product.categeoryId ,  product.description, product.price], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Product Added Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})



router.get('/get', auth.authenticateToken, (req, res, next) => {

    var query = "SELECT  p.id, p.name, p.description, p.price, p.status, c.id as categeoryId,c.name as categoryName from Product as p INNER JOIN category as c where p.categeoryId = c.id ";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);

        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getByCategory/:id', auth.authenticateToken, (req, res, next) => {

    let id = req.params.id;
    var query = "SELECT  id, name from Product  where categeoryId= ? and status='true'";
    connection.query(query,[id] ,(err, results) => {
        if (!err) {
            return res.status(200).json(results);

        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getById/:id', auth.authenticateToken, (req, res, next) => {

    let id = req.params.id;
    var query = "SELECT  id, name,description,price from Product  where id=?";
    connection.query(query,[id] ,(err, results) => {
        if (!err) {
            return res.status(200).json(results);

        } else {
            return res.status(500).json(err);
        }
    })
})



router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    var query = "update Product set name=?, categeoryId=? ,description=?,price=? where id=?";
    connection.query(query, [product.name, product.categeoryId,product.description,product.price,product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" });
            }
            return res.status(200).json({ message: "Product Updated Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
 })


 router.delete('/delete/:id', auth.authenticateToken,checkRole.checkRole ,(req, res, next) => {

    let id = req.params.id;
    var query = "delete from Product  where id=?";
    connection.query(query,[id] ,(err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" });
            }
            return res.status(200).json({ message: "Product Deleted Successfully" });

        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let user = req.body;
    var query = "update Product set status=? where id=?";
    connection.query(query, [user.status,user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" });
            }
            return res.status(200).json({ message: "Product status Updated Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
 })



 module.exports =router;