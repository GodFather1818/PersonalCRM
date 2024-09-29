import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const JournalDetail = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVariant, setPopupVariant] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntry();
  }, []);

  const fetchEntry = async () => {
    const response = await axios.get(`http://localhost:5000/entries/${id}`);
    setEntry(response.data);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/entries/${id}`);
      setPopupMessage("Journal deleted successfully!");
      setPopupVariant("success");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/entries"); 
      }, 3000);
    } catch (error) {
      console.error("Error deleting journal:", error);
      setPopupMessage("Failed to delete the journal.");
      setPopupVariant("danger");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (!entry) return <div>Loading...</div>;

  return (
    <>
      <style type="text/css">
        {`
         
        .btn-flat {
          background-color: black;
          color: white;
        }
        .btn-flat:hover {
          background-color: #ccc;
          color: black;
        }
        .btn-center: {
          display:flex;
          justify-content:center;
          align-items:center
        }
        
        `}
      </style>
      <Container className="mt-4">
        <Card>
          <div className="z-50">
            {showPopup && (
              <Alert variant={popupVariant} className="mt-3">
                {popupMessage}
              </Alert>
            )}
          </div>
          <Card.Body className="flex flex-col gap-7">
            <Card.Title className="flex justify-center mt-3">
              {entry.title}
            </Card.Title>
            <Card.Text className="text-justify m-3">{entry.content}</Card.Text>
            <Card.Text className="text-justify m-3">
              <small className="text-muted">{formatDate(entry.date)}</small>
            </Card.Text>
            <Card.Text className="text-justify m-3">
              <small className="text-muted">
                {entry.isPrivate ? "Private" : "Public"}
              </small>
            </Card.Text>
            <Card.Text>
              <small className="text-muted">
                {entry.isPrivate ? "Private" : "Public"}
              </small>
            </Card.Text>
            <div className="flex justify-center items-center">
              <Button variant="danger" onClick={handleDelete}>
                Delete Entry
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default JournalDetail;
