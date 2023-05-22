import EventdetailsForm from "components/Forms/EventdetailsForm";
import '../assets/css/Event.css'
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal, Image } from 'antd';
import { Col, Button, Form, FormGroup, Label, Input, Container, UncontrolledAlert, Nav } from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle, Row, Table, FormFeedback, ModalBody, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEdit, faHistory, faTrash } from '@fortawesome/free-solid-svg-icons'
import Calendar from "react-calendar";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
function Events() {

  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [eventStartDate, setEventStartDate] = useState(new Date().toISOString().substr(0, 10));
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndDate, setEventEndDate] = useState(new Date().toISOString().substr(0, 10));
  const [eventEndTime, setEventEndTime] = useState('');;
  const [posterImage, setPosterImage] = useState([]);
  const [Err, setErr] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [SelectedEvent, setSelectedEvent] = useState(null);
  const [event, setEvent] = useState([])
  const [AddPermission, setAddPermission] = useState(true)
  const [UpdatePermsission, setUpdatePermsission] = useState(true)
  const [DeletePermission, setDeletePermission] = useState(true)

  const [Autherized, setAutherized] = useState("")
  const Navigate = useParams()

  const validateForm = () => {
    const errors = {};

    if (!title) {
      errors.title = "Title is required";
    }

    if (!description) {
      errors.description = "Descripton is required";
    }

    if (!location) {
      errors.location = "Location is required";
    }

    if (!eventStartDate) {
      errors.eventStartDate = "Event start date is required";
    }

    if (!eventStartTime) {
      errors.eventStartTime = "Event start time is required";
    }

    if (!eventEndDate) {
      errors.eventEndDate = "Ecent end date is required";
    }

    if (!eventEndTime) {
      errors.eventEndTime = "Events end time is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  useEffect(() => {
    getAPI()

  }, [])
  const handleOnSubmit = async (event) => {

    const errors = validateForm();
    if (errors) {
      setErr(errors);
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('eventStartDate', eventStartDate);
    formData.append('eventStartTime', eventStartTime);
    formData.append('eventEndDate', eventEndDate);
    formData.append('eventEndTime', eventEndTime);
    formData.append('posterImage', posterImage);
    try {
      let response = await fetch(`http://localhost:350/addEvents`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json();

        if (data) {
          getAPI();
          setIsFormDisplayed(false); // Close the form after submission
        }
      }

      setTitle(event.target.reset())
      setDescription(event.target.reset())
      setLocation(event.target.reset())
      setEventStartDate(event.target.reset())
      setEventStartTime(event.target.reset())
      setEventEndDate(event.target.reset())
      setEventEndTime(event.target.reset())
      setPosterImage(event.target.reset())

      getAPI()

      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  const handleAddNewClick = () => setIsFormDisplayed(true);
  const handleImageChange = (event) => {
    setPosterImage(event.target.files[0]);
    if (Err && Err.posterImage) {
      setErr({ ...Err, posterImage: null });
    }
  };
  const [eventCalStartDate, setCalEventStartDate] = useState(new Date());
  const [eventCalEndDate, setCalEventEndDate] = useState(new Date());
  const getAPI = async () => {
    let response = await fetch(`http://localhost:350/eventsDetails`)
    response = await response.json()

    setEvent(response)
    setCalEventStartDate(new Date(response.eventStartDate));
    setCalEventEndDate(new Date(response.eventEndDate));

  }
  const onClickhandleCancel = (event) => {
    setIsFormDisplayed(false);
  }
  const showModal = (id) => {
    setProductToDelete(id)
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setProductToDelete(null); // reset the selected product to delete
    setIsModalOpen(false);
  };

  //delete APi
  const handleOnDelete = async (id) => {
    setIsModalOpen(false);

    let result = await fetch(`http://localhost:350/eventsDelete/${id}`, {
      method: "delete"
    }
    )
    result = await result.json()
    if (result) {

      getAPI()
    }
  }
  //submitong form control
  const onsubmitControl = (e) => {
    e.preventDefault()
    const errors = validateForm();
    if (errors) {
      setErr(errors);
      return;
    }
    handleOnSubmit(event.preventDefault)
    onClickhandleCancel(event.preventDefault)
    getAPI()
  }

  const showDetailsModal = (event) => {

    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
    setCalEventStartDate(new Date(event.eventStartDate));
    setCalEventEndDate(new Date(event.eventEndDate));
  };
  const handleCancelDetailsModal = () => {
    setSelectedEvent(null);
    setIsDetailsModalOpen(false);
  };

  let value = localStorage.getItem('user')
  const authV = JSON.parse(value)
  let id = authV.user._id

  const getAdminRequest = async () => {
    let result = await fetch(`http://localhost:350/AdminPermisionsId/${id}`)
    result = await result.json()
    console.log(result)
    setAddPermission(result.Add)
    setUpdatePermsission(result.Update)
    setDeletePermission(result.Delete)
  }

  const getSuperAdminRequest = async () => {
    try {
      let response = await fetch(`http://localhost:350/userGetId/${id}`);
      response = await response.json();
      setAutherized(response.status)

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
          <Col className="ml-auto mr-auto" md="12" sm="11">
            <Card className="card-upgrade text-center">

              <CardBody>
                <Card className="card-plain">
                  <CardHeader>

                    <div className="row d-flex align-itmes-center justify-content-between">
                      <Col lg="4" md="4" sm="8">
                        <CardTitle tag="h4">Event Details</CardTitle>
                      </Col>
                      <Col lg="4" md="4" sm="8">
                        {
                          AddPermission !== true ?
                            <></>
                            :
                            <Button style={{ marginRight: "20px" }} color="primary" onClick={handleAddNewClick}>
                              Add New
                            </Button>
                        }
                      </Col>
                    </div>

                  </CardHeader>
                  <pre>
                    <CardBody>
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Sr.No</th>
                            <th>Event Title</th>
                            <th>More Details</th>
                            <th>Event Start Date</th>
                            <th>Event Start Time</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(event) && event.length > 0
                            && event.map((item, index) => {
                              return (

                                <tr key={item._id}>
                                  <td>{index + 1}</td>
                                  <td>{item.title}</td>
                                  <td><Link
                                    onClick={() => {
                                      showDetailsModal(item);
                                    }}
                                  //  to={`/EventDetail/${item._id}`} 
                                  >See Detail</Link></td>
                                  <td>{item.eventStartDate}</td>
                                  <td>{item.eventStartTime}</td>
                                  <td>
                                    {
                                      UpdatePermsission !== true ? <></> :
                                        <Link
                                          to={`/updateEvent/${item._id}`} > <FontAwesomeIcon
                                            icon={faEdit} /></Link>
                                    }

                                    {
                                      DeletePermission !== true ? <></> :
                                        <FontAwesomeIcon
                                          icon={faTrash}

                                          style={{
                                            marginLeft: "15px",
                                            color: "red", cursor: "pointer"
                                          }}
                                          onClick={() => {
                                            showModal(item._id)

                                          }}
                                        />
                                    }

                                  </td>
                                  {productToDelete && (
                                    <Modal title="Basic Modal"
                                      open={isModalOpen} onOk={() => {
                                        let deleted = handleOnDelete(productToDelete)
                                        if (deleted) {
                                          Navigate('/events')
                                        }
                                      }}
                                      onCancel={handleCancel}>
                                      <p>Are You sure Want to Delete</p>
                                    </Modal>
                                  )}

                                </tr>
                              )
                            })}

                        </tbody>
                      </Table>
                    </CardBody>
                  </pre>
                </Card>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className="ml-auto mr-auto" md="12" sm="9">
            {isFormDisplayed && (<Card>
              <CardHeader>
                <CardTitle></CardTitle>
              </CardHeader>
              <CardBody>
                <CardBody>

                  <Form onSubmit={onsubmitControl}>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>Event Title</Label>
                      <Col sm={10}>
                        <Input type="text" name="policy" id="exampleEvent" placeholder="Event Title" value={title}
                          onChange={(e) => {
                            setTitle(e.target.value)
                            if (Err && Err.title) {
                              setErr({ ...Err, title: null });
                            }
                          }}
                          invalid={Err && Err.title ? true : false}
                        />
                        {Err && Err.title && (<FormFeedback> {Err.title}</FormFeedback>)}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleText" sm={2}>Event Description</Label>
                      <Col sm={10}>
                        <Input type="textarea" name="text" id="exampleText" value={description} onChange={(e) => {
                          setDescription(e.target.value)
                          if (Err && Err.description) {
                            setErr({ ...Err, description: null });
                          }
                        }}
                          invalid={Err && Err.description ? true : false}
                        />
                        {Err && Err.description && (<FormFeedback> {Err.description} </FormFeedback>)}
                      </Col>
                    </FormGroup>

                     <FormGroup row>
                      <Label for="exampleLocation" sm={2}>Event Location</Label>
                      <Col sm={10}>
                        <Input type="text" name="policy" id="exampleLocation" placeholder="Location" value={location}
                          onChange={(e) => {
                            setLocation(e.target.value)
                            if (Err && Err.location) {
                              setErr({ ...Err, location: null });
                            }
                          }}
                          invalid={Err && Err.location ? true : false}
                        />
                        {Err && Err.location && (<FormFeedback>{Err.location}</FormFeedback>)}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>Event Poster</Label>
                      <Col sm={10}>
                        <input type="file" name="posterImage" className="form-control" onChange={handleImageChange} invalid={Err
                          && Err.posterImage ? true : false} />
                        {Err && Err.posterImage && (<FormFeedback>{Err.posterImage}</FormFeedback>)}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>Event Start Date</Label>
                      <Col sm={10}>
                        <Input type="date" name="policy" id="exampleEmail" value={eventStartDate} onChange={(e) => {
                          setEventStartDate(e.target.value)
                          if (Err && Err.eventStartDate) {
                            setErr({ ...Err, eventStartDate: null });
                          }
                        }}
                          invalid={Err && Err.eventStartDate ? true : false}
                        />
                        {Err && Err.eventStartDate && (<FormFeedback>{Err.eventStartDate}</FormFeedback>)}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>Event Start Time</Label>
                      <Col sm={10}>
                        <Input type="time" name="policy" id="exampleEmail" value={eventEndTime} onChange={(e) => {
                          setEventEndTime(e.target.value)
                          if (Err && Err.eventStartTime) {
                            setErr({ ...Err, eventStartTime: null });
                          }
                        }}
                          invalid={Err && Err.eventStartTime ? true : false}
                        />
                        {Err && Err.eventStartTime && (<FormFeedback> {Err.eventStartTime} </FormFeedback>)}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>Event End Date</Label>
                      <Col sm={10}>
                        <Input type="date" name="policy" id="exampleEmail" value={eventEndDate} onChange={(e) => {
                          setEventEndDate(e.target.value)
                          if (Err && Err.eventEndDate) {
                            setErr({ ...Err, eventEndDate: null });
                          }
                        }}
                          invalid={Err && Err.eventEndDate ? true : false}
                        />
                        {Err && Err.eventEndDate && (
                          <FormFeedback>
                            {Err.eventEndDate}
                          </FormFeedback>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>Event End Time</Label>
                      <Col sm={10}>
                        <Input type="time" name="policy" id="exampleEmail" value={eventStartTime} onChange={(e) => {
                          setEventStartTime(e.target.value)
                          if (Err && Err.eventStartTime) {
                            setErr({ ...Err, eventStartTime: null });
                          }
                        }}
                          invalid={Err && Err.eventStartTime ? true : false}
                        />
                        {Err && Err.eventStartTime && (<FormFeedback> {Err.eventStartTime} </FormFeedback>)}
                      </Col>
                    </FormGroup>

                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 2 }}>
                        <Button type='submit' color='primary'>
                          Submit</Button>
                      </Col>
                    </FormGroup>
                  </Form>
                  {/*
            <EventdetailsForm /> */}

                </CardBody>
              </CardBody>
            </Card>
            )}
          </Col>
        </Row>

        <Row className="justify-content-end">
          <div className="model-container">
            <Modal open={isDetailsModalOpen} width={700} className="custom-modal" style={{ marginRight: "10%" }}
              onCancel={handleCancelDetailsModal}>
              <ModalHeader>Event Details</ModalHeader>
              <div>
                <Container className="mt-5 empProfile">
                  <div className="">
                    <div className="row justify-content-center ">
                      <Col lg="12" md="12">
                        {SelectedEvent && (<ModalBody>
                          <Card className="card mb-3">
                            <CardHeader>
                              {/*
                        <Link to="/events">
                        {" "}
                        <FontAwesomeIcon style={{ fontSize: "20px", marginRight: 10 }} icon={faArrowLeft} />
                        </Link> */}
                              <CardTitle className="cardHeading" tag="h5">
                                <span style={{ fontWeight: 200 }}>Title:
                                </span>
                                <span style={{
                                  textDecoration: "underline",
                                  // marginRight: "10px"
                                }}>
                                  {SelectedEvent.title}
                                </span>
                              </CardTitle>
                              <hr />
                              <div className=" row d-flex align-items-center ">
                                <Col lg="5" md="5" sm="10">
                                  <CardTitle>
                                    <span style={{
                                      fontWeight: "bold",
                                      marginRight: "10px"
                                    }}>
                                      Event Start Date:
                                    </span>
                                    {SelectedEvent.eventStartDate}

                                  </CardTitle>
                                </Col>
                                <CardTitle>
                                  <span style={{
                                    fontWeight: "bold",
                                    marginLeft: 15,
                                    marginRight: "10px"
                                  }}>
                                    Event Start Time:
                                  </span>
                                  {SelectedEvent.eventStartTime}
                                </CardTitle>
                              </div>
                              <hr />
                              <div className=" row d-flex align-items-center ">
                                <Col lg="5" md="5" sm="10">
                                  <CardTitle>
                                    <span style={{
                                      fontWeight: "bold",

                                      marginRight: "10px"
                                    }}>
                                      Event End Date:
                                    </span>
                                    {SelectedEvent.eventEndDate}
                                  </CardTitle>
                                </Col>
                                <CardTitle>
                                  <span style={{
                                    fontWeight: "bold",
                                    marginLeft: 15,
                                    marginRight: "10px"
                                  }}>
                                    Event End Time:
                                  </span>
                                  {SelectedEvent.eventEndTime}
                                </CardTitle>
                              </div>
                              <hr />
                              <div className="row d-flex align-items-center ">
                                <Col lg="5" md="5" sm="10">
                                  <CardTitle>
                                    <span style={{
                                      fontWeight: "bold",
                                      marginRight: "10px"
                                    }}>
                                      Location:
                                    </span>
                                    {SelectedEvent.location}
                                  </CardTitle>
                                </Col>
                              </div>
                              <hr />
                            </CardHeader>
                            <CardBody className="all-icons">
                              <span className="align-items-center">
                                <h5 className="p-0 ms-2">
                                  Event Description
                                </h5>
                                <p>{SelectedEvent.description}</p>
                                <div className="d-flex align-items-center mb-5 pb-5
                                     justify-content-around">
                                  <div style={{ width: "40%" }}>
                                    {SelectedEvent.posterImage ? (
                                      <Image src={`http://localhost:350/uploads/${SelectedEvent.posterImage}`}
                                        style={{ width: "100%" }} />) : (<></>)}
                                  </div>
                          
                                </div>
                              </span>{" "}

                            </CardBody>

                          </Card>
                        </ModalBody>)}
                      </Col>
                    </div>
                  </div>
                </Container>
              </div>
            </Modal>
          </div>
        </Row>
      </div>
    </>
  );
}

export default Events;