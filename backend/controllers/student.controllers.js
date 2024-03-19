const Student  = require("../models/student.model");

async function createStudent(req, res) {

    try {
        const data = req.body;
        const student = await Student.create(data);
        if (data) {
            res.send(student);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating student");
    }
}

async function updateStudent(req, res) {
    const {name,email,courseBranch,twelfthMarks} = req.body;

    const studentId = req.body._id;
    const data = {
        name,email,courseBranch,twelfthMarks
    }
    try {
        const updatedData = await Student.findByIdAndUpdate(studentId, data);
        if (updatedData) {
            res.send(updatedData);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating student");
    }
}

async function deleteStudent(req, res) {
    console.log("hii")
    const {studentId} = req.body; // Assuming studentId is passed as a route parameter
    console.log(req.body)
    try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (deletedStudent) {
            res.send(deletedStudent);
        } else {
            res.status(404).send("Student not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting student");
    }
}

async function getStudents(req, res) {
    try {
        const students = await Student.find({});
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting students");
    }
}


module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    getStudents
};
