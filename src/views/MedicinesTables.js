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
const MedicinesTable = () => {

  const [Employee, setcategory] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [AddPermission, setAddPermission] = useState(true)
  const [UpdatePermsission, setUpdatePermsission] = useState(true)
  const [DeletePermission, setDeletePermission] = useState(true)
  const Navigate = useNavigate();
  const handleOnGet = async () => {
    let result = await fetch(`http://localhost:350/EmployeeList_Get`)
    result = await result.json()
    console.log(result)
    setcategory(result)
  }
  useEffect(() => {
    handleOnGet()
  }, [])

  const deleteData = async (id) => {
    setIsModalOpen(false);
    let result = await fetch(`http://localhost:350/EmployeeList_Delete/${id}`, {
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
    setSelectedMedicines(id);
    setIsDetailsModalOpen(true);
  };
  const handleCancelDetailsModal = () => {
    setSelectedMedicines(null);
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
                    <CardTitle className="head-title" tag="h5">Medicines Detail</CardTitle>
                  </Col>
                  <Col lg="4" md="4" sm="8">
                    {AddPermission !== true ?
                      <UncontrolledAlert className=" " color="danger" >
                        Autherization Denied!
                      </UncontrolledAlert>
                      :
                      <Link
                        to="/employeeForm"
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
                        <th>Brand Name</th>
                        <th>Strength</th>
                        <th>Ingredients</th>
                        <th>More</th>
                        <th>Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Array.isArray(Employee) && Employee.length > 0
                        &&
                        Employee.map((item, index) => {

                          return (
                            <tr key={index + 1} scope="row" >
                              <td>{index + 1}</td>
                              <td>{item.brandName}</td>
                              <td>{item.Strength}</td>
                              <td>{item.DosageForm}</td>
                              <td><Link 
                                style={{ fontSize: "12px" }}
                                onClick={() => {
                                  showDetailsModal(item);
                                }}
                              >
                                see More Details
                              </Link></td>
                              <td className="p-1 m-0">
                                {
                                  UpdatePermsission !== true ? <></> :
                                    <Link
                                      to={`/UpdateEmployee/${item._id}`}
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
                          ) })}
                    </tbody>
                  </Table>
                </CardBody>
              </pre>
            </Card>

          </Col>
        </Row>
        <Row>
          <Col lg="10" md="10" sm="10">
            <Modal title="Basic Modal" open={isModalOpen} onOk={() => {
              let deleted = deleteData(productToDelete)
              if (deleted) {
                Navigate('/tables')
              }
            }}
              onCancel={handleCancel}>
              <p>Are You sure Want to Delete</p>
            </Modal>

            <Modal open={isDetailsModalOpen} width={800}
              onCancel={handleCancelDetailsModal}>
              <ModalHeader
              >Employee Details
              </ModalHeader>
              {selectedMedicines && (
                <div>
                  <Container className="mt-5 empProfile">
                   <Row className="d-flex align-items-center">
                    <Col className="d-flex" sm={6} >
                    <Image width={500} src={`http://localhost:350/uploads/${selectedMedicines.TabPhoto}`}/>
                    </Col>
                    <Col sm={6}>                  
                      <h5>{selectedMedicines.brandName}<span style={{marginLeft:"4px"}}>{selectedMedicines.Strength}</span></h5> 
                      <h6>{selectedMedicines.Ingredients}</h6>
                      <h6>{selectedMedicines.DosageForm}</h6>
                      <p>{selectedMedicines.Description}</p>
                      <h6>{selectedMedicines.Discount}</h6>
                      <h6>{selectedMedicines.Price}</h6>
                    </Col>
                   </Row>
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

export default MedicinesTable;