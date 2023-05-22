
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody, ModalFooter, UncontrolledAlert
} from "reactstrap";

const EmployeeLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [SelectedLeave, setSelectedLeave] = useState(null)
  const [AddPermission, setAddPermission] = useState(true)
  const [UpdatePermsission, setUpdatePermsission] = useState(true)
  const [DeletePermission, setDeletePermission] = useState(true)
  const [LeaveAprove, setLeaveAprove] = useState(true)
  useEffect((id) => {
    // Fetch all leave requests from the server
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('http://localhost:350/Leave');
        const data = await response.json();
        setLeaveRequests(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    const getLeaveRequest = async (id) => {
      try {
        const response = await fetch(`http://localhost:350/leave/${id}`);
        const data = await response.json();
        console.log(data);
        // Handle the response data here
      } catch (error) {
        console.error(error);
        // Handle the error here
      }
    }
    fetchLeaveRequests();
    getLeaveRequest()
  }, []);
  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:350/leave/${id}/${status}`, { method: 'PUT' });
      const data = await response.json();
      setLeaveRequests(prevState => {
        const index = prevState.findIndex(request => request._id === id);
        if (index !== -1) {
          const updatedRequest = { ...prevState[index], status };
          return [...prevState.slice(0, index), updatedRequest, ...prevState.slice(index + 1)];
        } else {
          return prevState;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };


  const handleDelete = async (id) => {
    let result = fetch(`http://localhost:350/leaveDelete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setLeaveRequests(prevState => prevState.filter(request => request._id !== id));
      })
      .catch(error => console.error(error));
  };

  const showDetailsModal = (id) => {
    setSelectedLeave(id);
    setIsDetailsModalOpen(true);
  };
  console.log(SelectedLeave)
  const handleCancelDetailsModal = () => {
    setSelectedLeave(null);
    setIsDetailsModalOpen(false);
  };

  let value = localStorage.getItem('user')
  const authV = JSON.parse(value)
  let id = authV.user._id

  const getAdminRequest = async () => {
    let result = await fetch(`http://localhost:350/AdminPermisionsId/${id}`)
    result = await result.json()
    console.log(result)
    setDeletePermission(result.Delete)
    setLeaveAprove(result.leaveApprrove)
  }
  const getSuperAdminRequest = async () => {
    try {
      let response = await fetch(`http://localhost:350/userGetId/${id}`);
      response = await response.json();


    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAdminRequest()
    getSuperAdminRequest()
  }, [])

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="text-center">
              <CardHeader className="d-flex align-items-center">
                <CardTitle tag="h4">Emplyees Leaves Requests</CardTitle>
              </CardHeader>
              <pre>
                <CardBody >
                  {loading ? <p>Loading leave requests...</p> : (
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>sr.No</th>
                          <th>Email</th>
                          <th>Leave For</th>
                          <th>Leave Details</th>
                          <th>Status</th>
                          <th>Approve/Reject</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveRequests.map((request, index) => (
                          <tr key={request._id}>
                            <td>{index + 1}</td>
                            <td></td>
                            <td>{request.leaveFor}</td>
                            <td><FontAwesomeIcon icon={faInfoCircle}
                              style={{ fontSize: "24px", color: "lightblue", marginLeft: 10, cursor: "pointer" }}
                              onClick={(item) => {
                                showDetailsModal(request);
                              }}
                            />
                            </td>
                            <td>{request.status}</td>
                            <td>
                              {LeaveAprove !== true ? <></>
                                :
                                <div>
                                  <FontAwesomeIcon icon={faCheck}
                                    style={{ fontSize: "24px", color: "greenyellow", cursor: "pointer" }}
                                    onClick={() => handleStatusUpdate(request._id, 'Approved',)} />
                                  <FontAwesomeIcon icon={faXmark}
                                    style={{ fontSize: "24px", color: "red", marginLeft: 10, cursor: "pointer" }}
                                    onClick={() => {
                                      handleStatusUpdate(request._id, 'Rejected')

                                    }} />
                                </div>
                              }
                            </td>
                            <td>
                              {
                                   DeletePermission !== true ? <>  </> :
                                   <FontAwesomeIcon
                                    onClick={() => handleDelete(request._id)}
                                    style={{ fontSize: 25, color: "darkred", cursor: "pointer" }}
                                    icon={faTrashCan} />
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </pre>
            </Card>
          </Col>
        </Row>
        <Row>
          <Modal isOpen={isDetailsModalOpen}
            onCancel={handleCancelDetailsModal}>
            <ModalHeader toggle={handleCancelDetailsModal}
            >Employee Details</ModalHeader>
            {SelectedLeave && (<ModalBody>
              <Container>
                <Row>
                  <Col xs={12} sm={12}>
                    <Card className="card mb-3">
                      <div className="card-body">
                        <Row >
                          <Col sm="5">
                            <h6 className="mb-0">Full Name</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.fullName}
                          </Col>
                        </Row>
                        <hr />
                        <Row >
                          <Col sm="5">
                            <h6 className="mb-0">Email</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.email}
                          </Col>
                        </Row>
                        <hr />

                        <Row >
                          <Col sm="5">
                            <h6 className="mb-0">Duration</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.duration}
                          </Col>
                        </Row>
                        <hr />

                        <Row >
                          <Col sm="5">
                            <h6 className="mb-0">Applied Date</h6>
                          </Col>
                          {SelectedLeave.applyDate && (
                            <>
                              {SelectedLeave.applyDate.substring(0, 10)}
                            </>
                          )}
                        </Row>
                        <hr />

                        <Row className="row">
                          <Col sm="5">
                            <h6 className="mb-0">Leave Date</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.date && (
                              <>
                                {SelectedLeave.date.substring(0, 10)}
                              </>
                            )}
                          </Col>
                        </Row >
                        <hr />
                        <Row className="row">
                          <Col sm="5">
                            <h6 className="mb-0">From</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.fromDate && (
                              <>
                                {SelectedLeave.fromDate.substring(0, 10)}
                              </>
                            )}
                          </Col>
                        </Row >
                        <hr />
                        <Row className="row">
                          <Col sm="5">
                            <h6 className="mb-0">To</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.toDate && (
                              <>
                                {SelectedLeave.toDate.substring(0, 10)}
                              </>
                            )}
                          </Col>
                        </Row >
                        <hr />
                        <Row className="row">
                          <Col sm="5">
                            <h6 className="mb-0">Status</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.status}
                          </Col>
                        </Row >
                        <hr />

                      </div>
                    </Card>
                  </Col>

                </Row>
              </Container>
            </ModalBody>)}
          </Modal>

        </Row>
      </div>
    </>
  )
}

export default EmployeeLeaves