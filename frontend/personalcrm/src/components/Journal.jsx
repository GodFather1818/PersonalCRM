import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Journal = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const response = await axios.get('http://localhost:5000/entries');
    setEntries(response.data);
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
    <Container className="mt-4 w-full h-screen">
      <h1>Journal Entries</h1>
      <Row>
        {entries.map((entry) => (
          <Col md={4} key={entry._id} className="mb-4">
            <Card>
              <Card.Body className="min-h-[30vh] flex flex-col gap-4 bg-slate-50" >
                <Card.Title className="flex justify-center" >{entry.title}</Card.Title>
                <Card.Text className="text-justify">
                  {entry.content.length > 100 ? `${entry.content.substring(0, 100)}...` : entry.content}
                </Card.Text>
                <Link to={`/entries/${entry._id}`}>Read More</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="w-full flex justify-center items-center mt-40" >
        <Button variant="flat" as={Link} to="/entries/createone">Create New Entry</Button>
      </div>
    </Container>
    </>
  );
};

export default Journal;
