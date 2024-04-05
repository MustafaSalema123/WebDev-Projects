const jwt = require('jsonwebtoken')
require('dotenv').config();



function authenticateToken(req, res , next)
{
    const authHeader = req.headers['authorization'];
  //console.log('authHeader ' , authHeader); wuth Bearer and token
    const token = authHeader && authHeader.split(' ')[1];
     //console.log('token ' , token); // prnt a tokenbig
    if(token == null)
        return res.sendStatus(401);
   
    jwt.verify(token,process.env.ACCESS_TOKEN , (err ,response) => 
    {
        if(err)
            return res.sendStatus(403);

        res.locals = response;
        // console.log('res ' , response); //  email: 'admin@gmail.com',  iat: 1712120780, role and exp
        next()
    })    
}

module.exports = {authenticateToken : authenticateToken}