import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../assets/css/Event.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Label, Form, Input, FormGroup
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'

const EmpAtendHistory = () => {
  const [Attendance, setAttendance] = useState([])
  const [showSearchInput, setShowSearchInput] = useState(false);
  const params = useParams();
  console.log("ID: " + params.id)
  const getAPIby = async () => {
    let response = await fetch(`http://localhost:350/atten_history`)
    response = await response.json()
    const filteredData = response.filter(item => item.employeeId === params.id)
    console.log(response)
    setAttendance(filteredData)
  }
  useEffect(() => {
    getAPIby()
  }, [])

  const searchHandel = async (event) => {

    let key = event.target.value
    console.log(key)
    if (key) {
      let response = await fetch(`http://localhost:350/Search/${key}`)
      response = await response.json()
      const filteredData = response.filter(item => item.employeeId === params.id)
      if (filteredData) {
        setAttendance(filteredData)
      }
    }
    else {
      getAPIby()
    }
  }

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
  }
  return (
    <>

      <div className="content">
        <Row>
        <Col className="ml-auto mr-auto" md="12" sm="11">
            <Card className="text-center">
          
              <CardHeader className=''>
              <div className="row d-flex align-itmes-center justify-content-start mx-3">
              <Link to="/tables" >  <FontAwesomeIcon style={{ fontSize: "20px", marginRight: 10 }} icon={faArrowLeft} /></Link>
              </div>
              <div className="row d-flex align-itmes-center justify-content-between">
              <Col lg ="5" md="4" sm="8">
             
                 
              
             
                  <CardTitle tag="h4" className='text-start'>Employee Attendance History</CardTitle>
                  </Col>
                  <Col lg ="4" md="4" sm="8">
                    <Form> 
                      <FormGroup className='d-flex align-items-center' row>
                         <Col className='d-flex align-items-center justify-content-end search-input' sm={10}>
                        {showSearchInput && (
                          <Input className='' type="date" name="policy" placeholder='search' id="exampleSeach"
                            onChange={searchHandel} />
                            )}
                            
                              <FontAwesomeIcon onClick={handleSearchClick} className='search-icon' icon={faSearch} />
                        </Col>
                        
                      </FormGroup>
                       
                    </Form>
                    </Col>
                </div>
             
              </CardHeader>
              <pre>
                <CardBody >

                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>sr. No</th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Check in</th>
                        <th>Check Out</th>
                        <th>Attendance</th>
                        {/* <th>ID</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Array.isArray(Attendance) && Attendance.length > 0 && Attendance.map((item, index) => {
                          return (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>{item.currentDate}</td>
                              <td>{item.email}</td>
                              <td>{item.fullName}</td>
                              <td>{item.checkInTime}</td>
                              <td>{item.checkOutTime}</td>
                              <td>{item.attendance}</td>
                              {/* <td>{item.employeeId}</td> */}

                            </tr>
                          )
                        })
                      }

                    </tbody>
                  </Table>
                </CardBody>
              </pre>
            </Card>

          </Col>
        </Row>
      </div>

    </>
  )
}
export default EmpAtendHistory