const express = require("express");
const noteRoute=require("./noteRoute");
const userRoute= require("./userRoute");
const categoryRoutes= require ("./categoryRoutes.js");
const productRoutes=require("./productRoutes")

const router = express.Router();

router.use('/notes', noteRoute);
router.use('/user', userRoute);
router.use('/categories', categoryRoutes);
router.use('/product',productRoutes);

module.exports = router;
