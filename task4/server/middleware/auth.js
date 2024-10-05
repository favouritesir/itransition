/***************************************************************************************************** DEPENDENCIES */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key="usertable-secrect-key"

/***************************************************************************************************** VERIFY USER */
const verifyUser = (req,res,next) =>
{
    const token = req.cookies.token;
    if(!token) return res.json({status:'auth',msg:"Not Authorized"})
    jwt.verify(token,key,(err,decoded) =>{
        if(err)return res.json({status:'auth',msg:"Invalid Token"})
        req.mail=decoded.mail();
        next();
    })
}

/***************************************************************************************************** VERIFY USER OBJ*/
const verifyUserObj =

/***************************************************************************************************** EXPORT MIDDLEWARES */
module.exports = {
    verifyUser,
    
}