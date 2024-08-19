import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const securityQuestionsList = [
    "What is your favourite Sport?",
    "What is your Mother's maiden name?",
    "What was the name of your first School?",
    "What is yout favourite food?",
    "What is the name of your love?"
];
const CreatePassword = () => {
    const [website, setWebsite] = useState('');
    const [password, setPassword] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState([
        { question: '', answer: '' },
        { question: '', answer: '' }
    ]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupVariant, setPopupVariant] = useState('success');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/password-manager/new', {
                website,
                password,
                securityQuestions
            });
            setPopupMessage('Password saved successfully!');
            setPopupVariant('success');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate('/password-manager');
            }, 3000);
        } catch (error) {
            console.error('Error saving password:', error);
            setPopupMessage('Failed to save the password.');
            setPopupVariant('danger');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    };

    const handleSecurityQuestionChange = (index, field, value) => {
        const newQuestions = [...securityQuestions];
        newQuestions[index][field] = value;
        setSecurityQuestions(newQuestions);
    };

    return (
        <Container className="mt-4">
            <h1>Create New Password Entry</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formWebsite">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter website name"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                {securityQuestions.map((sq, index) => (
                    <div key={index}>
                        <Form.Group controlId={`formSecurityQuestion${index}`} className="mt-2">
                            <Form.Label>Security Question {index + 1}</Form.Label>
                            <Form.Control
                                as="select"
                                value={sq.question}
                                onChange={(e) => handleSecurityQuestionChange(index, 'question', e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a question</option>
                                {securityQuestionsList.map((question, i) => (
                                    <option key={i} value={question}>{question}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId={`formSecurityAnswer${index}`} className="mt-2">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter answer"
                                value={sq.answer}
                                onChange={(e) => handleSecurityQuestionChange(index, 'answer', e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>
                ))}
                <Button variant="primary" type="submit" className="mt-2">
                    Save Password
                </Button>
            </Form>
            {showPopup && (
                <Alert variant={popupVariant} className="mt-3">
                    {popupMessage}
                </Alert>
            )}
        </Container>
    );
};

export default CreatePassword;



