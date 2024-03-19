import React, { useState } from 'react';

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseBranch: '',
    twelfthMarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any necessary validation here before submitting the form
    console.log('Form submitted with data:', formData);
    const res = fetch('/api/students/createStudent',{
      method : "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(formData)
    })
    window.location.reload();
    if(res.ok){
      window.location.reload();
    }
    // Here you can send the form data to your backend for further processing
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

      <label htmlFor="courseBranch">Course/Branch:</label>
      <input type="text" id="courseBranch" name="courseBranch" value={formData.courseBranch} onChange={handleChange} />

      <label htmlFor="twelfthMarks">12th Marks:</label>
      <input type="text" id="twelfthMarks" name="twelfthMarks" value={formData.twelfthMarks} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateStudent;
