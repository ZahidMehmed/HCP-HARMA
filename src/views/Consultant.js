import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Image } from 'antd';
import { FcViewDetails } from 'react-icons/fc';
import '../assets/css/EmpProfile.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Nav,
  Container,
  ModalHeader, UncontrolledAlert
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHistory, faTrash } from '@fortawesome/free-solid-svg-icons'
const Consultants = () => {

  const [Consultant, setConsultant] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedConsultant, setSelectedEmployee] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [AddPermission, setAddPermission] = useState(true)
  const [UpdatePermsission, setUpdatePermsission] = useState(true)
  const [DeletePermission, setDeletePermission] = useState(true)
  const Navigate = useNavigate();
  const handleOnGet = async () => {
    let result = await fetch(`http://localhost:350/ConAllget`)
    result = await result.json()
    console.log(result)
    setConsultant(result)
  }
  useEffect(() => {
    handleOnGet()
  }, [])

  const deleteData = async (id) => {
    setIsModalOpen(false);
    let result = await fetch(`http://localhost:350/DeleteConsultant/${id}`, {
      method: "delete"
    }
    )
    result = await result.json()
    if (result) {
      handleOnGet()
    }
  }
  const showModal = (id) => {
    setProductToDelete(id)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setProductToDelete(null); // reset the selected product to delete
    setIsModalOpen(false);
  };
  const showDetailsModal = (id) => {
    console.log(id)
    setSelectedEmployee(id);
    setIsDetailsModalOpen(true);
  };
  const handleCancelDetailsModal = () => {
    setSelectedEmployee(null);
    setIsDetailsModalOpen(false);
  };

  let value = localStorage.getItem('user')
  const authV = JSON.parse(value)
  let id = authV.user._id



  const getAPIbyID = async (item) => {
    let result = await fetch(`http://localhost:350/AdminPermisionsId/${id}`)
    result = await result.json()
    console.log(result)
    setAddPermission(result.Add)
    setUpdatePermsission(result.Update)
    setDeletePermission(result.Delete)
  }
 
  useEffect(() => {
    getAPIbyID()
  }, [])
  return (
    <>
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="12" sm="11">
            <Card
              className="text-center">
              <CardHeader>
                <div className="row d-flex align-itmes-center justify-content-between">
                  <Col lg="4" md="4" sm="8">
                    <CardTitle className="head-title" tag="h5">Consultant Detail</CardTitle>
                  </Col>
                  <Col lg="4" md="4" sm="8">
                    {AddPermission !== true ?
                      <UncontrolledAlert className=" " color="danger" >
                        Autherization Denied!
                      </UncontrolledAlert>

                      :
                      <Link
                        to="/ConsultantForm"
                        className=" m-2">
                        <Button className="btn-add">Add New</Button>
                      </Link>
                    }
                  </Col>
                </div>
              </CardHeader>
              <pre>
                <CardBody className="" >
                  <Table bordered responsive>
                    <thead className="text-primary ">
                      <tr>
                        <th>Sr.No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>More About Consultant</th>
                        <th>Qualifications</th>
                        <th></th>
                        <th>Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Array.isArray(Consultant) && Consultant.length > 0
                        &&
                        Consultant.map((item, index) => {

                          return (

                            <tr key={index + 1} scope="row" >
                              <td>{index + 1}</td>
                              <td>{item.ConName}</td>
                              <td>{item.email}</td>
                              <td><Link
                              
                              style={{ fontSize: "12px" }}
                              onClick={() => {
                                showDetailsModal(item);
                              }}
                              >
                           see More
                              
                              </Link></td>

                              <td>{item.SpecialList}</td>
                              <td>
                              
                              </td>
                              <td className="p-1 m-0">
                                {
                                  UpdatePermsission !== true ? <></> :
                                    <Link
                                      to={`/UpdateConsultant/${item._id}`}
                                    >
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                      />
                                    </Link>
                                }
                                {
                                  DeletePermission !== true ? <></> :
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      style={{ marginLeft: "15px", color: "red", cursor: "pointer" }}
                                      onClick={() => {
                                        showModal(item._id)
                                      }}
                                    />
                                }
                              </td>
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
        <Row>
          <Col lg="8" md="8" sm="8">
            <Modal title="Basic Modal" open={isModalOpen} onOk={() => {
              let deleted = deleteData(productToDelete)
              if (deleted) {
                Navigate('/Consultant')
              }
            }}
              onCancel={handleCancel}>
              <p>Are You sure Want to Delete</p>
            </Modal>
            <Modal open={isDetailsModalOpen} width={700}
              onCancel={handleCancelDetailsModal}>
              <ModalHeader
              >Consultant Details</ModalHeader>
              {selectedConsultant && (
                <div>
                  <Container className="mt-5 empProfile">
                    <div className="">
                      <Row>
                        <Col className="flex-column justify-content-center align-items-center" lg="8" md="6">
                          <Card className="d-flex align-items-center justify-content-center card-user">
                          {/* <Image width={500} /> */}
                            <Image alt="..." style={{width:"100%"}}  className="avatar border-gray" src={`http://localhost:350/uploads/${selectedConsultant.ConPhoto}`} />
                          </Card>
                          <Nav aria-label="breadcrumb" className="main-breadcrumb d-flex justify-content-center">
                            <h5 className="breadcrumb-item text-center mt-0" aria-current="page">
                              {selectedConsultant.ConName}'s Profile</h5>

                          </Nav>
                        </Col>
                      </Row>
                      <div className="row justify-content-center ">
                        <Col lg="12" md="12">
                          <Card className="card mb-3">
                            <div className="card-body">

                              <Row  className="mt-4">
                                <Col sm="3" className="mt-2">
                                  <h6 className="mb-0">Full Name</h6>
                                </Col>
                                <Col sm="8" className="text-info">
                                {selectedConsultant.ConName}
                                </Col>
                              </Row>
                          

                              <Row  className="mt-4">
                                <Col sm="3">
                                  <h6 className="mb-0">Email</h6>
                                </Col>
                                <Col sm="8" className="text-info">
                                  {selectedConsultant.email}
                                </Col>
                              </Row>
                          

                              <Row  className="mt-4">
                                <Col sm="3">
                                  <h6 className="mb-0">Contact</h6>
                                </Col>
                                <Col sm="8" className="text-info">
                                  {selectedConsultant.Discription}
                                </Col>
                              </Row>
                           

                              <Row  className="mt-4">
                                <Col sm="3">
                                  <h6 className="mb-0">Specialist For</h6>
                                </Col>
                                <Col sm="8" className="text-info">
                                  {selectedConsultant.SpecialLis}
                                </Col>
                              </Row>
                         

                              <Row className="mt-4">
                                <Col sm="3">
                                  <h6 className="mb-0">Qualifications</h6>
                                </Col>
                                <Col sm="8" className="text-info">
                                  {selectedConsultant.Qualification}
                                </Col>
                              </Row>
                      

                              <Row className="mt-4">
                                <Col sm="3">
                                  <h6 className="mb-0">Description</h6>
                                </Col>
                                <Col sm="8" className="text-info">
                                  {selectedConsultant.salary}
                                </Col>
                              </Row>
                         

                            
                           

                              <Row className="mt-4">
                                <Col sm="3">
                                  <h6 className="mb-0">Fees</h6>
                                </Col>
                                <Col sm="8" className="text-info">
                                  {selectedConsultant.lastDegree}
                                </Col>
                              </Row>
                        
                            </div>
                          </Card>
                        </Col>
                      </div>
                    </div>

                  </Container>
                </div>
              )}
            </Modal>

          </Col>
        </Row>
      </div>
    </>
  );
}

export default Consultants;