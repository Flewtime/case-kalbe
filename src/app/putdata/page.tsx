// DataForm.js
"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';

interface DataFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
    id:number;
    name: string;
    email: string;
    age: number;
    city: string;
}

const OnPutData = async (id: number, body: FormData) => {
  try {
    console.log(body)
    const response = await fetch("http://localhost:3000/api/" + id, 
    { method: "PUT", body: JSON.stringify(body) });
    if (!response.ok) {
      throw new Error(`Failed to put data. Status: ${response.status} ${response.statusText}`);
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error putting data:", error);
    throw error;
  }
};

const DataForm: React.FC<DataFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    id: 12, // Make sure to include id in the initial state
    name: 'jojo',
    email: 'jojo@gmail.com',
    age: 12,
    city: 'casdas',
});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Assuming you want to use formData.id as the id
    OnPutData(parseInt(formData.id), formData);
  };

return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formId">
        <Form.Label>Id</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter Id"
        name="id"
        value={formData.id}
        onChange={handleChange}
        />
    </Form.Group>

    <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
);
};

export default DataForm;
