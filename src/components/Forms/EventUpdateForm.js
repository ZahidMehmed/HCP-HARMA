
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, Image } from 'antd';
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle, Row, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackward } from "@fortawesome/free-solid-svg-icons";
const EventUpdateForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');;
    const [posterImage, setPosterImage] = useState(null);
    const params = useParams()
    const Navigate = useNavigate()

    const getApibyID = async (id) => {

        let response = await fetch(`http://localhost:350/eventsUpdate/${params.id}`)
        response = await response.json()
        console.log(response.eventStartTime)
        setTitle(response.title)
        setDescription(response.description)
        setLocation(response.location)
        setEventStartDate(response.eventStartDate)
        setEventStartTime(response.eventStartTime)
        setEventEndDate(response.eventEndDate)
        setEventEndTime(response.eventEndTime)
        // setPosterImage(response.posterImage)
        console.log(eventStartTime)

    }

    const handleOnUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('eventStartDate', eventStartDate);
        formData.append('eventStartTime', eventStartTime);
        formData.append('eventEndDate', eventEndDate);
        formData.append('eventEndTime', eventEndTime);
        formData.append('posterImage', posterImage);

        let response = await fetch(`http://localhost:350/eventsUpdate/${params.id}`, {
            method: 'put',
            body: formData,
        })
        response = await response.json()
        console.log(response)

        if (response) {
            Navigate('/events')
        }
    }

    useEffect(() => {

        getApibyID()
    }, [])
    const handleImageChange = (event) => {
        setPosterImage(event.target.files[0]);
    };
    return (
        <div className='content'>
            <Row>
                <Col className="ml-auto mr-auto" md="12" sm="9">
                    <Card>
                        <CardHeader>
                            <Link to=   {"/events"}>
                             
                                <FontAwesomeIcon
                                    style={{ fontSize: "20px", marginRight: 10 }}
                                    icon={faArrowLeft} />
                            </Link>
                            <div className="d-flex align-itmes-center justify-content-between">
                                <CardTitle tag="h4">Update Details</CardTitle>

                            </div>
                            <p className="text start m-0 p-0 pt-0 text-secondary">
                                Company Event Details will Update here
                            </p>
                        </CardHeader>
                        <CardBody>
                            <CardBody>

                                <Form
                                    onSubmit={handleOnUpdate}
                                >
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Event Title</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="policy" id="exampleEvent" placeholder="Event Title"
                                                value={title} onChange={(e) => { setTitle(e.target.value) }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleText" sm={2}>Event Description</Label>
                                        <Col sm={10}>
                                            <Input type="textarea" name="text" id="exampleText"
                                                value={description}
                                                 onChange={(e) => { setDescription(e.target.value) }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleLocation" sm={2}>Event Location</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="policy" id="exampleLocation" placeholder="Location"
                                                value={location} onChange={(e) => { setLocation(e.target.value) }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>

                                        <Label for="exampleEmail" sm={2}>Event Poster</Label>
                                        <Col sm={10}>
                                            <input type="file" name="posterImage" className="form-control"
                                                onChange={handleImageChange}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Event Start Date</Label>
                                        <Col sm={10}>
                                            <Input type="date" name="policy" id="exampleEmail"
                                                value={eventStartDate}
                                                 onChange={(e) => { setEventStartDate(e.target.value) }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Event Start Time</Label>
                                        <Col sm={10}>
                                            <Input type="time" name="policy" id="exampleEmail"
                                                value={eventStartTime}
                                                 onChange={(e) => { setEventStartTime(e.target.value) }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Event End Date</Label>
                                        <Col sm={10}>
                                            <Input type="date" name="policy" id="exampleEmail"

                                                value={eventEndDate} onChange={(e) => { setEventEndDate(e.target.value) }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Event End Time</Label>
                                        <Col sm={10}>
                                            <Input type="time" name="policy" id="exampleEmail"
                                                value={eventEndTime} onChange={(e) => { setEventEndTime(e.target.value) }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                            <Button type='submit' color='primary'>Update</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                                {/* <EventdetailsForm /> */}

                            </CardBody>
                        </CardBody>
                    </Card>

                </Col>
            </Row>
        </div>
    )
}

export default EventUpdateForm