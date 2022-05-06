const express = require("express");
const { PrivateGetKata } = require("../controllers/controllersKatas");
const { veryfyToken } = require("../middlewares/verifyToken");


const router = express.Router();

router.get("/", veryfyToken, PrivateGetKata);

module.exports = router