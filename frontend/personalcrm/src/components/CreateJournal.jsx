import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const CreateJournal = () => {
  const [newEntry, setNewEntry] = useState({ title: '', content: '', isPrivate: true });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEntry({ ...newEntry, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/entries', newEntry);
    setNewEntry({ title: '', content: '', isPrivate: true });
    window.location.href = '/entries';
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
    <Container className="mt-4 w-1/2 h-screen shadow flex flex-col ">
      <h1 className='w-full flex justify-center m-8 mt-8'>Create Journal Entry</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={newEntry.title}
            onChange={handleInputChange}
            placeholder="Enter title"
            required
          />
        </Form.Group>
        <Form.Group controlId="formContent" className="mt-4">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={newEntry.content}
            onChange={handleInputChange}
            placeholder="Enter content"
            rows={8}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPrivate" className="mt-2">
          <Form.Check
            type="checkbox"
            label="Private"
            name="isPrivate"
            checked={newEntry.isPrivate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="w-full flex justify-center mt-5" >
        <Button variant="flat" type="submit" className="mt-2">
          Add Entry
        </Button>
        </div>
        
      </Form>
    </Container>
    </>
  );
};

export default CreateJournal;
