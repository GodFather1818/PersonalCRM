import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState([{ taskTitle: "", description: "" }]);
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [reminder, setReminder] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const handleAddDetail = () => {
    setDetails([...details, { taskTitle: "", description: "" }]);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log("Hello");
    const newTask = {
      email: email,
      title: title,
      details: details.map((detail) => detail.description),
      priority: priority,
      deadline: deadline,
      assignee: assignee,
      status: status,
      reminder: reminder,
    };
    try {
      await axios.post("http://localhost:5000/tasks/createone", newTask);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/tasks");
      }, 3000);
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <>
    <style type="text/css">
        {`
         
        .btn-flat {
          background-color: black;
          color: white;
        }
        .btn-flat:hover {
          background-color: gray;
          color: black;
        }
        .btn-center: {
          display:flex;
          justify-content:center;
          align-items:center
        }
        
        `}
      </style>
    <Container>
      <h1>Create New Task</h1>
      <Form onSubmit={handleCreateTask}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            name="title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          {details.map((detail, index) => (
            <div key={index} className="mb-3">
              <Form.Control
                type="text"
                placeholder="Task Title"
                value={detail.taskTitle}
                onChange={(e) =>
                  handleDetailChange(index, "taskTitle", e.target.value)
                }
                required
                className="mb-2"
              />
              <Form.Control
                type="text"
                placeholder="Description"
                value={detail.description}
                onChange={(e) =>
                  handleDetailChange(index, "description", e.target.value)
                }
                required
                name="details"
              />
            </div>
          ))}
          <Button variant="secondary" onClick={handleAddDetail}>
            + Add Detail
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter priority(eg:1, 2, ....)"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required

          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assignee</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required

          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Reminder</Form.Label>
          <Form.Control
            type="datetime-local"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            required

          />
        </Form.Group>

        <Button
          variant="flat"
          onClick={(e) => {
            handleCreateTask(e);
          }}
        >
          Create Task
        </Button>
      </Form>

      {showPopup && (
        <Alert variant="success" className="mt-3">
          Task created successfully!
        </Alert>
      )}
    </Container>
    </>
  );
}

export default CreateTask;
