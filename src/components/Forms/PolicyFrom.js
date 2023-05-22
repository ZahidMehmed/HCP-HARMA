import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const PolicyForm = () => {
  const [terms, setTerms] = useState([{ id: 1, value: '' }]);
  const [nextId, setNextId] = useState(2);

  const handleAddTermClick = () => {
    setTerms([...terms, { id: nextId, value: '' }]);
    setNextId(nextId + 1);
  };

  const handleRemoveTermClick = (id) => {
    const updatedTerms = terms.filter((term) => term.id !== id);
    setTerms(updatedTerms);
  };

  const handleTermInputChange = (id, value) => {
    const updatedTerms = terms.map((term) => {
      if (term.id === id) {
        return { ...term, value };
      }
      return term;
    });
    setTerms(updatedTerms);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission logic
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input type="text" name="policy" id="exampleEmail" placeholder="Add Policy Title" />
          </Col>
        </FormGroup>

        {terms.map((term) => (
          <FormGroup row key={term.id}>
            <Label for={`term-${term.id}`} sm={2}>
              Term {term.id}
            </Label>
            <Col sm={8}>
              <Input
                type="textarea"
                name={`term-${term.id}`}
                id={`term-${term.id}`}
                value={term.value}
                onChange={(e) => handleTermInputChange(term.id, e.target.value)}
              />
            </Col>
            <Col sm={2}>
              <Button color="danger" onClick={() => handleRemoveTermClick(term.id)}>
                Remove
              </Button>
            </Col>
          </FormGroup>
        ))}

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button color="primary" onClick={handleAddTermClick}>
              Add Term
            </Button>
            <Button type="submit" color="primary" className="ml-3">
              Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default PolicyForm;
