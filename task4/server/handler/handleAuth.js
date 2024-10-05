/*
* Title: Authentication handler
* Description: handle user signup or login process using express 
* Author: Ashikur Rahman SA
* Date: Monday, 30 -September-2024 (12:04:19)
*
*/
/***************************************************************************************************** DEPENDENCIES */
const bcrypt = require('bcrypt');
const db = require('../database/database');

/***************************************************************************************************** Configuration */
const slot=10;

/***************************************************************************************************** HANDLE AUTH */
const handleAuth = (req,res)=>
{   
    const {umail,upass,unm,loginMode}=req.body;

    if(loginMode){
        db.getUsersByEmail(umail,(err,res)=>{
            
        })
    }
    else console.log('mode false')

    // const sql="insert into users (`name`,`email`,`password`,`status`) values (?)";
    // bcrypt.hash(req.body.upass + '', slot, (err, hash) => {
    //     if(err) return res.json({msg:'Error for hashing password'});
        
    //     const values=[req.body.unm, req.body.umail, hash, 'Active'];
        
    //     db.query(sql, [values], (err, result) => {
    //         console.log(err,result)
    //         if(err)return res.json({msg:'SQL register error'});
    //         return res.json({status:'Success',res:result});
    //     })
    // })
}

/***************************************************************************************************** EXPORT */
module.exports = {
    handleAuth
}