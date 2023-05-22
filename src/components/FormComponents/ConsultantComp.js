import React from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardHeader, FormFeedback, CardBody, CardTitle, Row, Table } from "reactstrap";
const ConsultantComp = (props) => {
  // console.log(props.value)
  return (
 
    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label
            htmlFor="exampleEmail"
            className="mr-sm-2">{props.label}</Label>
        <Input
            bsSize="sm"
            type={props.type}
            // name="email"
            id="exampleName"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChangeEvent}
            invalid={props.invalid}
        />
       {props.errorMessage && <FormFeedback>{props.errorMessage}</FormFeedback>}  
    </FormGroup>
  )
}

export default ConsultantComp