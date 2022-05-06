const express = require("express");
const { getKatas, getKataById, postKata, updateKata, deleteKata, updateKataexersice, } = require("../controllers/controllersKatas");
const { veryfyToken } = require("../middlewares/verifyToken")
const router = express.Router();




// GET all Tasks
router.get('/', getKatas);

// GET Tasks for id 
router.get('/:id', getKataById);

// ADD a new task
router.post('/', veryfyToken, postKata);

// UPDATE a new task
router.put('/:id', veryfyToken, updateKata);

//update exersiceResult
router.put("/exersice/:id", updateKataexersice)

//DELETE task
router.delete('/:id', veryfyToken, deleteKata);


module.exports = router;