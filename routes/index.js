const express = require("express");
const userRoute= require("./userRoute");
const categoryRoutes= require ("./categoryRoutes.js");
const productRoutes=require("./productRoutes")
const fileupload=require("./fileUpload")
const packageRotes=require("./packageRoutes")
const router = express.Router();

router.use('/user', userRoute);
router.use('/categories', categoryRoutes);
router.use('/product',productRoutes);
router.use('/uploads',fileupload)
router.use('/packages',packageRotes)
module.exports = router;
