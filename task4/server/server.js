// ===================================================================================================
//           USER MANAGEMENT TABLE 
// ===================================================================================================
// AUTHOR       : Ashikur Rahman
// DESCRIPTION  : Create a working and deployed Web application with registration and authentication.
//                Non-authenticated users should not have access to the user management (admin panel).
//                Only authenticated users should have access the user management table:
// Date         : Tuesday, 24 -September-2024 (10:54:19)
// ===================================================================================================

/***************************************************************************************************** DEPENDENCIES */
const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');

const {handleAuth} = require('./handler/handleAuth');

const db = require('./database/database');
const { verifyUser } = require('./middleware/auth');
/***************************************************************************************************** APP SETUP OR CONFIGURATION */
const app = express();

const corsOpt = {
    origin:["http://localhost:3000"],
    methods:["POST","GET"],
    credentials:true
}

/***************************************************************************************************** GLOBAL MIDDLEWARE */
app.use(express.json());
app.use(cors(corsOpt));
app.use(cookie());

app.options('*', cors(corsOpt)); // handle preflight request


/***************************************************************************************************** AUTHENTICATION */
app.post('/auth',handleAuth)

app.get('/',verifyUser,(req,res)=>{
    db.getUsersByEmail(req.mail,(err,res)=>{
        if(err) return res.json({status:'notFound'});
        if(res[0].status=='blocked') return res.json({status:'blk'});
        db.getUsers((err,res)=>{
            if(err) return res.json({status:'dataErr'});
            return res.json(res.map(o=>Object.values(o)));
        })
    })
})

/***************************************************************************************************** RUN THE SERVER */
app.listen(4000,()=>{
    console.log('mashaAllah')
    // db.getUsersByEmail('gub221902131@gmail.com',(err, res)=>{
    //     console.log(err,res);   
    // })
})
