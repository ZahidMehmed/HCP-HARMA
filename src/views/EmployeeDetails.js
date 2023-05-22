import EmoloyeesForm from 'components/Forms/MedcinesForm'
import React from 'react'
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import '../assets/css/Forms.css'
const EmployeeDetails = () => {
  return (
<>
<div  className="content EmpDetailForm">
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardHeader className=''>
                <Link  to="/tables" >  <FontAwesomeIcon style={{fontSize:"20px", marginRight:10}} icon={faArrowLeft}/></Link>  
                <CardTitle tag="h5" className='text-center'>Register New Medicine</CardTitle>
                <p className="card-category"> </p>        
                <hr className='bg-warning' style={{width:"100%"}}/>     
                 </CardHeader>
                <CardBody className="all-icons">
                {/* Form Component Import and used here */}
                <EmoloyeesForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
</>
  )
}

export default EmployeeDetails