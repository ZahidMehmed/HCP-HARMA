import React from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardHeader, FormFeedback, CardBody, CardTitle, Row, Table } from "reactstrap";
const AdmRegComp = (props) => {
    return (
        <>

            <Col lg="4" md="4" sm="8">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label
                        htmlFor="exampleEmail"
                        className="mr-sm-2">{props.label}</Label>
                    <Input
                        bsSize="sm"
                        type="text"
                        name="email"
                        id="exampleName"
                        placeholder="kane Wiliamson etc"
                        value={props.value}
                        onChange={props.onChangeEvent}
                        invalid={props.invalid}
                    />
                    
                   {props.errorMessage && <FormFeedback>{props.errorMessage}</FormFeedback>}
                   
                </FormGroup>
            </Col>
        </>
    )
}

export default AdmRegComp