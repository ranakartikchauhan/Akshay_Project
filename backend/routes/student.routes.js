const express = require('express')
const {updateStudent,deleteStudent,createStudent,getStudents} = require("../controllers/student.controllers")

const router = express.Router();

router.get("/getStudents", getStudents);
router.post("/createStudent", createStudent);
router.post("/updateStudent",updateStudent );
router.post("/deleteStudent",deleteStudent);

module.exports = router;