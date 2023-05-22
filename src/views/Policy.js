
import React from "react";
import PolicyForm from "components/Forms/PolicyFrom";
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, col } from "reactstrap";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function Policy() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12" sm="10">
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle tag="h5">Emplyee Policy</CardTitle>
                <p className="card-category">
                  Policy Related Employee

                </p>
              </CardHeader>
              <CardBody className="all-icons">

                {/* Form Component Import and used here */}
                <PolicyForm />

              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className=" justify-content-center ">
          <Col md="5" sm="8" >
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle tag="h5">Title</CardTitle>
                <p className="card-category">
                  Empolye Policy Card
                </p>
              </CardHeader>
              <CardBody className="all-icons">
                <span className="align-items-center">
                  <h5 className="p-0 m-0">Term: 1</h5>
                  <p>In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual form of a document or a typeface
                    without relying on meaningful content.
                    Lorem ipsum may be used as a placeholder before final copy is available</p>
                </span>
                <Button  color="warning">Edit</Button>
                <Button  color="danger">Delete</Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="5" sm="8">
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle tag="h5">Title</CardTitle>
                <p className="card-category">
                  Empolye Policy Card
                </p>
              </CardHeader>
              <CardBody className="all-icons">

                <span className="align-items-center">
                  <h5 className="p-0 m-0">Term: 1</h5>
                  <p>In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual form of a document or a typeface
                    without relying on meaningful content.
                    Lorem ipsum may be used as a placeholder before final copy is available</p>
                </span>
                <Button  color="warning">Edit</Button>
                <Button  color="danger">Delete</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default Policy;
