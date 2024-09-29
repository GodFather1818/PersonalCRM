import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Alert } from 'react-bootstrap';
import moment from "moment";

// Hello


function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  console.log(taskId);
  
  const formatReminder = (deadline) => {
    if (!deadline) return null; 

    const dateObject = new Date(deadline);
   

    const formattedDate = moment(deadline).format("DD/MM/YYYY");
    

    return `${formattedDate}`;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/tasks");
      }, 3000);
    }catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`http://localhost:5000/tasks/${taskId}`);
      console.log(response.data);
      setTask(response.data);
    };
    fetchTasks();
  }, [setTask, taskId]);




  if (!task){ 
    return <p>Loading...</p>; 
  }
  
  
  return (
    <Container>
      <h1>{task.title}</h1>
      
      <p><strong>Details:</strong> {Array.isArray(task.details) ? task.details.map((taskDetail, index) => (
        <p key={index}><strong>{index + 1}: {taskDetail}</strong></p>
      )) : 'No details available'}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Deadline:</strong> {formatReminder(task.deadline)}</p>
      <p><strong>Assignee:</strong> {task.assignee}</p>
      <p><strong>Reminder:</strong> {new Date(task.reminder).toLocaleString()}</p>
      <Button variant="danger" onClick={handleDelete}>Delete Task</Button>
      {showPopup && (
          <Alert variant="success" className="mt-3">
            Task deleted successfully!
          </Alert>
        )}
    </Container>
  );
}


export default TaskDetail;

