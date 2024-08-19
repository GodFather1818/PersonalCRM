import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import moment from "moment";
import { useNavigate } from 'react-router-dom';


const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [securityAnswers, setSecurityAnswers] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    fetchPasswords();
  }, [setPasswords]);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/password-manager"
      );
      // Sort the passwords in descending order by date
    const sortedPasswords = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setPasswords(sortedPasswords);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  const handleViewPassword = (password) => {
    setSelectedPassword(password);
    console.log(selectedPassword);
    setSecurityAnswers(
      password.securityQuestions.map((q) => ({
        question: q.question,
        answer: "",
      }))
    );
    setShowModal(true);
  };

  const handleSecurityAnswerChange = (index, value) => {
    const newAnswers = [...securityAnswers];
    newAnswers[index].answer = value;
    setSecurityAnswers(newAnswers);
  };

  const handleVerifyAnswers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/password-manager/verify",
        {
          id: selectedPassword._id,
          answers: securityAnswers,
        }
      );
      alert(`Password: ${response.data.password}`);
      setShowModal(false);
    } catch (error) {
      setError("Incorrect answers. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/password-manager/${id}`
      );
      setPasswords(passwords.filter((password) => password._id !== id));
    } catch (error) {
      console.error("Error Deleting the Password!");
    }
  };

  const formattedDate = (date) => {
    const formattedDate = moment(date).format("DD/MM/YYYY");

    return `${formattedDate}`;
  };


  const handleOnClick = () => {
    navigate('/password-manager/new');

  }

  return (
    <>
    <style type="text/css">
    {`
          .btn-flat {
            background-color: black;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 25px;
          }
          .btn-flat:hover {
            background-color: #C1C3C4;
            color: black;
          }
    `}
    </style>
      <Container className="mt-4 w-full h-screen">
        <div className="page-title w-full m-5 flex justify-center items-center">
          <h1>Saved Passwords</h1>
        </div>

        {passwords.map((password) => (
          <Card key={password._id} className="mb-3">
            <Card.Body className="w-full">
              <div className="w-full flex justify-between">
                <Card.Title className="">{password.website}</Card.Title>
                <div>
                  <i>Password Created On: </i> {formattedDate(password.date)}
                </div>
                <FaTrash
                  className=" delete-icon mt-[8px] hover:cursor-pointer"
                  onClick={() => handleDelete(password._id)}
                />
              </div>

              <Card.Text>Password stored securely.</Card.Text>
              <Button
                variant="flat"
                onClick={() => handleViewPassword(password)}
              >
                View Password
              </Button>
            </Card.Body>
          </Card>
        ))}

        {selectedPassword && (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Security Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {securityAnswers.map((sq, index) => (
                <Form.Group
                  key={index}
                  controlId={`formSecurityAnswer${index}`}
                >
                  <Form.Label>{sq.question}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter answer"
                    value={sq.answer}
                    onChange={(e) =>
                      handleSecurityAnswerChange(index, e.target.value)
                    }
                    required
                  />
                </Form.Group>
              ))}
              {error && (
                <Alert variant="danger" className="mt-2">
                  {error}
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleVerifyAnswers}>
                Submit Answers
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        <div className="w-full flex justify-center items-center">
            <Button variant="flat" className="mt-5 text-auPlywrite" onClick={handleOnClick}>
                Create New Password
            </Button>
        </div>
      </Container>
    </>
  );
};

export default PasswordManager;
