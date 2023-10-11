const express = require("express");
const noteRoute=require("./noteRoute");
const userRoute= require("./userRoute");
const categoryRoutes= require ("./categoryRoutes.js");

const router = express.Router();

router.use('/notes', noteRoute);
router.use('/api/user', userRoute);
router.use('/api/categories', categoryRoutes);

module.exports = router;
