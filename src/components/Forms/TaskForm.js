import { event } from 'jquery';
import React from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const TaskForm = () => {
    const handleOnSubmit = (event)=>{
        event.preventDefault()
    }
  return (
   <>


    <FormGroup row>
      <Label for="exampleEmail" sm={2}>Employe FUll Name</Label>
      <Col sm={10}>
        <Input type="text" name="policy" id="exampleEmail" placeholder="Add Policy Title" />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="exampleText" sm={2}>Event Description</Label>
      <Col sm={10}>
        <Input type="textarea" name="text" id="exampleText" />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="exampleEmail" sm={2}>Event Poster</Label>
      <Col sm={10}>
        <Input type="file" name="policy" id="exampleEmail" />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="exampleEmail" sm={2}>Event Start Date</Label>
      <Col sm={10}>
        <Input type="date" name="policy" id="exampleEmail" />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="exampleEmail" sm={2}>Event Start Time</Label>
      <Col sm={10}>
        <Input type="time" name="policy" id="exampleEmail" />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="exampleEmail" sm={2}>Event End Date</Label>
      <Col sm={10}>
        <Input type="date" name="policy" id="exampleEmail" />
      </Col>
    </FormGroup>

    <FormGroup row>
      <Label for="exampleEmail" sm={2}>Event End Time</Label>
      <Col sm={10}>
        <Input type="time" name="policy" id="exampleEmail" />
      </Col>
    </FormGroup>
      <FormGroup check row>
      <Col sm={{ size: 10, offset: 2 }}>
        <Button color='primary'>Submit</Button>
      </Col>
    </FormGroup>
   </>
  )
}

export default TaskForm