import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

export default function RequestForm(props) {
  const user = props.user;
  const email = user.email;
  const name = user.name;

  const [category, setCategory] = useState(' ');
  const [comments, setComments] = useState(' ');

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/api/submit-request', {
        email,
        name,
        category,
        comments,
      });

      if (result.data.success) {
        console.log('Request submitted:', result.data);
      } else {
        console.error('Request submission failed:', result.data);
      }
    } catch (err) {
      alert("Error: Request not Submitted")
      console.error(err);
    }
  };

  return (
    <Container className = "mt-2">
      <Form className = "border border-2 p-2 rounded-1 w-50"  onSubmit={submitRequest}>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select required onChange={(e) => setCategory(e.target.value)}>
            <option>Select</option>
            <option>General Queries</option>
            <option>Product Features Queries</option>
            <option>Product Pricing Queries</option>
            <option>Product Feature Implementation Requests</option>
            <option>Others</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            required
            onChange={(e) => setComments(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-2" type="submit">
          Submit Request
        </Button>
      </Form>
    </Container>
  );
}
