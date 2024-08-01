import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

const CreateContact = () => {
   const [errors, setErrors] = useState({});
   const [serverError, setServerError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    group: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?91\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Indian phone number (e.g., +91 1234567890)";
    }

    if (!formData.group) {
      newErrors.group = "Group is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    console.log(errors);
    if (!validateForm()) {
      return;
    }
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:5000/contacts/createone", formData);
      console.log("Response from server:", response.data);
      setShowPopup(true);
      setFormData({
        name: "",
        email: "", 
        phone: "",
        group: "",
      });
      setTimeout(() => {
        setShowPopup(false);
        navigate("/contacts");
      }, 3000);
    } catch (error) {
      console.error("There was an error creating the contact!", error);
      if (error.response && error.response.data.message.includes("E11000")) {
        setServerError("This phone number already exists. Please use a different phone number.");
      } else {
        setServerError(error.response ? error.response.data.message : "An error occurred");
      }
    }
  };

  return (
    <>
      <style type="text/css">
        {`
    .background {
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(100px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .form-container {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 500px;
    }
    .btn-flat {
      background-color: black;
      color: white;
    }
    .btn-flat:hover {
      background-color: burlywood;
      color: black;
    }
    .btn-center: {
      display:flex;
      justify-content:center;
      align-items:center
    }
    .popup {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #4caf50;
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 1000;
    }

    `}
      </style>
      <div className="background w-full h-screen">
        
        <div className="form-container shadow">
        {showPopup && (
            <div className="popup">Contact created successfully!</div>
          )}
        {serverError && (
          <Alert variant="danger" onClose={() => setServerError(null)} dismissible>
            {serverError}
          </Alert>
        )}
          <h1 className="flex justify-center items-center font-Playwrite">
            Create New Contact
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="font-Playwrite ">Name</Form.Label>
              <Form.Control
              className="mb-4"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                isInvalid={!!errors.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-Playwrite">Email</Form.Label>
              <Form.Control
              className="mb-4"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter Your Email Address"
                onChange={handleChange}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-Playwrite">Phone</Form.Label>
              <Form.Control
              className="mb-4"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                placeholder="Enter The Phone Number (eg: +91 1234567890)"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-Playwrite">Group</Form.Label>
              <Form.Control
              className="mb-4"
                as="select"
                name="group"
                value={formData.group}
                onChange={handleChange}
                isInvalid={!!errors.group}
                required
              >
                <option value="" disabled>
                  Select Group
                </option>
                <option value="Family">Family</option>
                <option value="Team">Team</option>
                <option value="Project">Project</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.group}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="flex justify-center items-center w-full" >
              <Button type="submit" className="mt-3" variant="flat">
                Create Contact
              </Button>
            </div>
          </Form>

          
        </div>
      </div>
    </>
  );
};

export default CreateContact;
