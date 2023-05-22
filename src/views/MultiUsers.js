import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Image } from 'antd';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  ModalHeader,
} from "reactstrap";
import MultiuserForm from "components/MultiUsers/MultiuserForm";

const MultiUsers = () => {

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [Id, setId] = useState("")
  const [Admin, setAdmin] = useState("")
  const [Add, setAdd] = useState(false)
  const [Update, setUpdate] = useState(false)
  const [Delete, setDelete] = useState(false)
  const [EmpList, setEmpList] = useState(false)
  const [EmpLeaves, setEmpLeaves] = useState(false)
  const [Events, setEvents] = useState(false)
  const [Policy, setPolicy] = useState(false)

  const [leaveReject, setleaveReject] = useState(false)
  const [leaveApprrove, setleaveApprrove] = useState(false)


  const AdmineOnGet = async () => {
    let result = await fetch(`http://localhost:350/AdminDetail`)
    result = await result.json()
    setAdmin(result)

  }

  const getAPIbyID = async (item) => {
    setId(item._id)
    let result = await fetch(`http://localhost:350/AdminPermisionsId/${item._id}`)
    result = await result.json()
    console.log(result)
    setAdd(result.Add)
    setUpdate(result.Update)
    setDelete(result.Delete)
    setleaveApprrove(result.leaveApprrove)
  }

  const putPermissions = async (e) => {
    e.preventDefault();

    let respone = await fetch(`http://localhost:350/AdminPermisions/${Id}`, {
      method: 'put',
      headers: {
        'Content-Type': "Application/Json"
      },
      body: JSON.stringify({ Add, Update, Delete, leaveApprrove, EmpList, EmpLeaves, Events, Policy }),

    })
    respone = await respone.json()
    console.log(respone)
    setIsDetailsModalOpen(false);
  }

  const showDetailsModal = (id) => {
    setSelectedEmployee(id);
    setIsDetailsModalOpen(true);
  };
  const handleCancelDetailsModal = () => {
    setSelectedEmployee(null);
    setIsDetailsModalOpen(false);
  };

  useEffect(() => {
    AdmineOnGet()
  }, [])

  return (
    <>
      <div className="content">
        <Row>
          <Col
            md="12">
            <Card
              className="text-center">
              <CardHeader
                className="d-flex align-items-center justify-content-between">
                <CardTitle tag="h4">Admin Details</CardTitle>
                <Link
                  to="/AdminsReg"
                  className=" m-2">
                  <Button>Add New</Button>
                </Link>
              </CardHeader>
              <pre>
                <CardBody className="" >

                  <Table bordered responsive>
                    <thead className="text-primary ">
                      <tr>
                        <th>Sr.No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Permissions</th>
                        <th>Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Array.isArray(Admin) && Admin.length > 0
                        &&
                        Admin.map((item, index) => {
                          return (
                            <tr key={index + 1}>
                              <td>{index + 1}</td>
                              <td>{item.fullName}</td>
                              <td>{item.email}</td>
                              <td>{item.password}</td>
                              <td><Link
                                style={{ fontSize: "12px" }}
                                onClick={() => {
                                  showDetailsModal(item);
                                  getAPIbyID(item)
                                }}
                              >
                             Add Permissions
                              </Link></td>
                              <td>1234</td>
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
          <Col>
            <Modal open={isDetailsModalOpen}
              onCancel={handleCancelDetailsModal}
              onOk={putPermissions}
            >
              <ModalHeader
              > Admin Permissions
              </ModalHeader>
              <div className='container pt-5 pb-5 ps-5'>
                <div className="row justify-content-center">
                  <div className="col-6">
                
                    <form onSubmit={putPermissions}> 
                    <div className='row justify-content-start'>
                    <h5 >Page Access</h5>
                    </div>
                      <MultiuserForm 
                      label ={'Employe List'}
                      onChangeEvent ={(e) => {setEmpList(e.target.checked) }}
                      state = {EmpList}
                      />
                        <MultiuserForm 
                      label ={'Leaves'}
                      onChangeEvent ={(e) => {setEmpLeaves(e.target.checked) }}
                      state = {EmpLeaves}
                      />
                         <MultiuserForm 
                      label ={'Events'}
                      onChangeEvent ={(e) => {setEvents(e.target.checked) }}
                      state = {Events}
                      />
                     <MultiuserForm 
                      label ={'Policy'}
                      onChangeEvent ={(e) => {setPolicy(e.target.checked) }}
                      state = {Policy}
                      />
                    <hr/>
                    <div className='row justify-content-start'> <h5 >Operation Access</h5></div>
                    <MultiuserForm 
                      label ={'Add'}
                      onChangeEvent ={(e) => {setAdd(e.target.checked) }}
                      state = {Add}
                      />
                      <MultiuserForm 
                      label ={'Delete'}
                      onChangeEvent ={(e) => {setDelete(e.target.checked) }}
                      state = {Delete}
                      />
                     <MultiuserForm 
                      label ={'Update'}
                      onChangeEvent ={(e) => {setUpdate(e.target.checked) }}
                      state = {Update}
                      />
                      <MultiuserForm 
                      label ={'Leave Approve'}
                      onChangeEvent ={(e) => {setleaveApprrove(e.target.checked) }}
                      state = {leaveApprrove}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </Modal>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MultiUsers;
