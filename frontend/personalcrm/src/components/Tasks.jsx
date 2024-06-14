import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Accordion, Card, Button } from "react-bootstrap";
import moment from "moment";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  // const [open, setOpen] = useState(false);
  console.log("1st Print");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:5000/tasks");
      console.log(response.data);
      setTasks(response.data);
    };
    fetchTasks();
  }, [setTasks]);

  function getStatusVariant(status) {
    switch (status) {
      case "Planned":
        return "primary";
      case "In Progress":
        return "warning";
      case "Completed":
        return "success";
      default:
        return "secondary";
    }
  }
  const handleAccordionToggle = (taskId) => {
    setActiveKey(activeKey === taskId ? null : taskId);
  };
  const formatReminder = (deadline) => {
    if (!deadline) return null; 

    const dateObject = new Date(deadline);
    // const date = dateObject.toLocaleDateString('en-GB', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric',
    // }).split('/').reverse().join('/');

    const formattedDate = moment(deadline).format("DD/MM/YYYY");
    // clg
    // const time = dateObject.toLocaleTimeString('en-US', {
    //   hour: '2-digit',
    //   minute: '2-digit',
    // });

    return `Date: ${formattedDate}`;
  };

  // const handleToggle = (eventKey) => {
  //   setActiveKey(eventKey === activeKey ? null : eventKey); // Toggle active panel
  // };

  return (
    <>
    <style type="text/css">
      {
        `
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
        
        `
      }
    </style>
      <div className="container">

        <div className="flex justify-around " >
          <h1>Already Exisiting Tasks</h1>
          <div className="flex justify-center items-center gap-[3vw]  pt-3 px-3">
            <div className="flex-col items-center justify-center text-center">
              <div className="bg-[#0B5ED7] w-6 h-6 mx-[1.7rem]" ></div>
              <p className="w-full  mx-2">Planned</p>
            </div>
            <div>
              <div className="bg-[#FFC107] w-6 h-6 mx-[1.3rem]" ></div>
              <p>Progress</p>
            </div>
            <div>
              <div className="bg-[#28A745] w-6 h-6 mx-[1.3rem]" ></div>
              <p>Completed</p>
            </div>
          </div>
        </div>
        
        <Accordion className="mt-5 border-0" activeKey={activeKey}>
        {tasks.map((task) => (
          <Accordion.Item key={task._id} eventKey={task._id}>
            <Accordion.Header
            as={Button}
            variant={getStatusVariant(task.status)}
              onClick={() => handleAccordionToggle(task._id)}
              className="w-100 mb-3"
            >
              {task.title}
            </Accordion.Header>
            <Accordion.Body>
              {task.details.map((taskDetail, idx) => (
                <p key={idx}>
                  <strong>{idx + 1}: {taskDetail}</strong>
                </p>
              ))}
              <p> <strong>Deadline: </strong> {formatReminder(task.deadline)}</p>
              <Link to={`/tasks/${task._id}`}>
                <Button className="ext-gray-700 hover:text-gray-500 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md shadow" variant="flat">View Details</Button>
              </Link>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Link to="/tasks/createOne" className="center sm:flex sm:justify-center sm:items-center"> 
          <Button className=" my-20" variant="flat">Create New Task</Button>
        </Link>


      </div>
    </>
  );
};

export default Tasks;
