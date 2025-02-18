const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser, forgetPassword, resetPassword, getLoggedInUser } = require('../controllers/userController'); //{}
const checkToken = require('../middleware/checkToken');
const router = express.Router();
const path = require('path')
const userCollection = require('../models/UserModel')
// const fs = require('fs')

router.post('/register',registerUser);
router.post('/login',loginUser);
router.put('/update',checkToken,updateUser);
router.delete('/delete',checkToken,deleteUser);
router.post('/forgetPassword',forgetPassword)

router.get('/passwordToken/:token',async(req,res)=>{
    // let file = '../password.html'
    let token = req.params.token
    let user = await userCollection.findOne({passwordResetToken:token})
    if(user){

        res.render('newPassword',{token})
    }
    else{
        res.send("token expired or not valid!")
    }
})

router.post('/passwordToken/:token', resetPassword)

router.get('/loggedInUser',checkToken ,getLoggedInUser)



module.exports = router