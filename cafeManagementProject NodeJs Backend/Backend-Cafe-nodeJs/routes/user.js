const express = require('express');
const connection = require('../DBconnection')

const router = express.Router();
const jwt = require('jsonwebtoken')
require('dotenv').config();

const nodemailer = require('nodemailer')


var auth = require('../services/authentication')
var checkRole = require('../services/checkRole')

// require('crypto').randomBytes(64).toString('hex')
// '351e4261449f5685e68434aaf0c47edba5e4c3c8b707179863dd6a5d1e7eeacbd26272abd3bf577daa4f8f7e22b133d75570bd3238f07067eeb2c5da48c64c65'

//In postman down
// {
//     "name": "btech day",
//     "contactNumber": "9990909090",
//     "email": "btechdays@gmail.con",
//     "password": "user123"
// }

router.post('/signup', (req , res) => 
{
    let user = req.body;
    //console.log('testing data jo data user ne input kiya hai ' , user);
    query = 'select email,password ,role ,status from user where email=?'
    //console.log('query data ' , query);
    connection.query(query , [user.email] , (err,results)=>
    {
        console.log( ' result data ', results)
        if(!err){
        if(results.length <= 0) { 
            //agra user enmauil data nhi milaga to new sdata create karo
        query = "insert into user(name, contactNumber,email ,password ,status ,role) values (?, ? ,? , ? , 'false' , 'user' );"
        connection.query(query, [user.name, user.contactNumber,user.email ,user.password], (err,results)=> {
            if(!err)
            {
                return res.status(200).json({message: "Successfully Registered"})
            }else
            {
                return res.status(500).json(err);
            }
        })

        }else{

            return res.status(400).json({message: "Email is alredy Exits."})
                }

        }else
        {
            return res.status(500).json(err);
        }
})

});

// logi post man 
// {
//     "email": "admin@hmail.com",
//     "password": "admin123"
// }


router.post('/login',(req,res)=>
{
    const user = req.body;
    query = 'select email,password ,role ,status from user where email=?'
    connection.query(query , [user.email] , (err,results)=> {
        
        if(!err)
        {
            if(results <= 0 || results[0].password != user.password)
            {
               
                //agar reslut nhi mila or pass word incorre t aya by query selectore
                return res.status(401).json({message: 'Incorrect Username or password'});
            }else if(results[0].status === 'false')
            {
                return res.status(401).json({message: 'wait for admin approval'});
            }else if(results[0].password == user.password)
            {   
                //console.log(results , " aadf")
                const response = {email: results[0].email , role: results[0].role}
                const accessToken = jwt.sign(response , process.env.ACCESS_TOKEN , {expiresIn: '8h'})


                return res.status(200).json({token: accessToken});
            }else
            {
                return res.status(400).json({message: 'Something went Wrong , please try again later'});
            }


        }else
        {
            return res.status(500).json(err);
        }
    })
})

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth:
    {
        user: process.env.EMAIL,
        password: process.env.PASSWORD
    }
})

router.post('/forgetPassword',(req, res)=> 
{
    const user = req.body;
    query = 'select email,password ,role ,status from user where email=?'
})


router.get('/get' , auth.authenticateToken,(req, res)=>
{

    var query  ="select id,name,email,contactNumber,status from user where role='user' ";
    connection.query(query,(err,results)=>
    {
        if(!err)
        {
            return res.status(200).json(results);

        }else
        {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken,(req, res)=>
{
    let user = req.body;
    var query  ="update user set status=? where id=? ";
    connection.query(query ,[user.status,user.id],(err,results)=>
    {
        if(!err)
        {
            if(results.affectedRows == 0)
            {
                return res.status(404).json({message:'User id does not exist'});
            }
            return res.status(200).json({message:"User update successfully"});

        }else
        {
            return res.status(500).json(err);
        }
    })
})

router.patch('/checkToken', auth.authenticateToken,(req, res)=>
{

  return res.status(200).json({message:'true'});
        
})


router.post('/changePassword', (req, res) => {
    const user = req.body;
    const email = res.locals.email;
    console.log('emailchnag pass ' , email)
    var query = "select *from user where email=? and password=?";
    connection.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({ message: "Incorrect Old Password" });
            }
            else if (results[0].password == user.oldPassword) {
                query = "update user set password=? where email=?";
                connection.query(query, [user.newPassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({message: "Password Updated Successfully."});
            }
            else {
                return res.status(500).json(err);
            }
        })
    }
    else {
    return res.status(400).json({ message: "Something went wrong. Please try again later" });
        }
    }
    else {
        return res.status(500).json(err);
    }
    })
})




module.exports = router;


//'1', 'Admin', '9999888822', 'admin@hmail.com', 'admin123', 'true', 'admin'
