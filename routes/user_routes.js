const express=require('express')
const UserController=require('../http/controllers/UserController')
const router=express.Router()

router.post('/createOrder',UserController.createOrder);



module.exports=router