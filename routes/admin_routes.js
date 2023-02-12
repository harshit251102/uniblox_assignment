const express=require('express')
const AdminController=require('../http/controllers/AdminController')
const router=express.Router()

router.post('/generateDiscountCode',AdminController.generateDiscountCode);

module.exports=router