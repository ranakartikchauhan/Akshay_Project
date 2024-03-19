import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const StudentList = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/students/getStudents');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
   
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/students/deleteStudent', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId: id })
      });
      if (res.ok) {
        console.log("Data deleted successfully");
        // Optionally, you can update your data after deletion
        // For example, refetch data
        window.location.reload();
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    handleShow();
  };

  const handleSaveChanges = async () => {
    try {
      // Assuming you have a function to update student data on the server
      const res = await fetch('/api/students/updateStudent', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedStudent)
      });
      if (res.ok) {
        console.log("Data updated successfully");
        handleClose();
        // Optionally, you can update your data after updating
        // For example, refetch data
        window.location.reload();
        fetchData();
      }
    } catch (error) {
      console.error('Error updating data: ', error);
    }
  };

  const handleInputChange = (e) => {
    setSelectedStudent({
      ...selectedStudent,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6">
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={selectedStudent?.name || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={selectedStudent?.email || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formBranch">
              <Form.Label>Branch</Form.Label>
              <Form.Control type="text" name="courseBranch" value={selectedStudent?.courseBranch || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formTwelfthMarks">
              <Form.Label>12th %</Form.Label>
              <Form.Control type="text" name="twelfthMarks" value={selectedStudent?.twelfthMarks || ''} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      <h2 className="text-2xl font-bold mb-4">Student Data Table</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Branch</th>
            <th className="border border-gray-300 px-4 py-2">12th %</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">{item.courseBranch}</td>
              <td className="border border-gray-300 px-4 py-2">{item.twelfthMarks}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
