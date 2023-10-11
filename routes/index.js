const express = require("express");
const noteRoute=require("./noteRoute");
const userRoute= require("./userRoute");
const categoryRoutes= require ("./categoryRoutes.js");

const router = express.Router();

router.use('/notes', noteRoute);
router.use('/user', userRoute);
router.use('/categories', categoryRoutes);

module.exports = router;
