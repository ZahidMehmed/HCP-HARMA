import React from 'react'
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackward } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';
import EmoloyeesUpdateForm from 'components/Forms/EmployeUpdateForm';
const UpdateEmployeeDetails = () => {
  return (
<>
<div className="content">
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardHeader className=''>
                <Link  to="/tables" >  <FontAwesomeIcon style={{fontSize:"20px", marginRight:10}} icon={faArrowLeft}/></Link>  
                <CardTitle tag="h5" className='text-center'>Update Employee</CardTitle>
                <p className="card-category"> </p>             
                 </CardHeader>
               <CardBody className="all-icons">
                {/* Form Component Import and used here */}
                <EmoloyeesUpdateForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

</>
  )
}

export default UpdateEmployeeDetails