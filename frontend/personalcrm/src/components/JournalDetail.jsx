import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const JournalDetail = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    fetchEntry();
  }, []);

  const fetchEntry = async () => {
    const response = await axios.get(`http://localhost:5000/entries/${id}`);
    setEntry(response.data);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
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
        <Card.Body className="flex flex-col gap-7" >
          <Card.Title className="flex justify-center mt-3">{entry.title}</Card.Title>
          <Card.Text className="text-justify m-3">{entry.content}</Card.Text>
          <Card.Text className="text-justify m-3">
            <small className="text-muted">
             {formatDate(entry.date)}
            </small>
          </Card.Text>
          <Card.Text className="text-justify m-3">
            <small className="text-muted">
              {entry.isPrivate ? 'Private' : 'Public'}
            </small>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};

export default JournalDetail;
