const express = require('express');
const connection = require('../DBconnection');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');

//var check wherr to use and when use and exmpale see on chat gpt
var fs = require('fs');
var uuid = require('uuid');
var auth = require('../services/authentication');




router.post('/generatedReport', auth.authenticateToken, (req, res) => {
    const generatedUuid = uuid.v1();
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productDetails);

    query = "insert into bill (name, uuid ,email,contactNumber,paymentMethod,total,productDetails,createdBy) values (?,?,?,?,?,?,?,?)";
    connection.query(query, [orderDetails.name, generatedUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email], (err, results) => {
        if (!err) {
            ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
                productDetails: productDetailsReport,
                name: orderDetails.name,
                email: orderDetails.email,
                contactNumber: orderDetails.contactNumber,
                paymentMethod: orderDetails.paymentMethod,
                totalAmount: orderDetails.totalAmount
            }, (err, html) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error rendering report");
                } else {
                    pdf.create(html).toFile('./generated_pdf/' + generatedUuid + '.pdf', function (err, data) {
                        if (err) {
                            console.log(err);
                            return res.status(500).send("Error creating PDF");
                        } else {
                            return res.status(200).json({ uuid: generatedUuid });
                        }
                    })
                }
            })
        } else {
            console.log(err);
            return res.status(500).send("Error inserting into database");
        }
    })
})

router.post('/getPdf', auth.authenticateToken, (req, res) => {
    const orderDetails = req.body;
    const pdfPath = './generated_pdf'+orderDetails.uuid+'.pdf';
    if(fs.existsSync(pdfPath))
    {
        res.contentType('application/pdf');
        fs.createReadStream(pdfPath).pipe(res);
    }else{
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount
        }, (err, html) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error rendering report");
            } else {
                pdf.create(html).toFile('./generated_pdf/' + orderDetails.uuid + '.pdf', function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Error creating PDF");
                    } else {
                        res.contentType('application/pdf');
                        fs.createReadStream(pdfPath).pipe(res);
                    }
                })
            }
        })
    }
})


router.get('/getBills', auth.authenticateToken, (req, res, next) => {

    var query = "SELECT  * from bill order by id DESC";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);

        } else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', auth.authenticateToken ,(req, res, next) => {

    let id = req.params.id;
    var query = "delete from bill  where id=?";
    connection.query(query,[id] ,(err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Bill id does not found" });
            }
            return res.status(200).json({ message: "Bill Deleted Successfully" });

        } else {
            return res.status(500).json(err);
        }
    })
})

 module.exports =router;