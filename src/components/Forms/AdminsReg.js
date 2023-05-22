import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../../assets/css/Forms.css'
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardHeader, FormFeedback, CardBody, CardTitle, Row, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackward } from "@fortawesome/free-solid-svg-icons";
import AdmRegComp from 'components/FormComponents/AdmRegComp';

const AdminRegFrom = () => {

    // const [proPhoto, setproPhoto] = useState("")
    const [fullName, setfullName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [contact, setcontact] = useState("")
    const [Err, setErr] = useState(false)
    const Navigate = useNavigate()
    const params = useParams();

    const validateForm = () => {
        const errors = {};

        if (!fullName) {
            errors.fullName = "Full name is required";
        }

        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!contact) {
            errors.contact = "Contact is required";
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (errors) {
            setErr(errors);
            return;
        }
        let result = await fetch(`http://localhost:350/AdminSignUp`, {
            method: 'post',
            headers: {
                'Content-Type': "Application/Json"
            },
            body: JSON.stringify({ fullName, email, password, contact }),
        })

        result = await result.json()
        if (result) {
            Navigate("/MultiUsers")
        }
    }
    return (
        <>
            <div className='content'>
                <Row>
                    <Col className="ml-auto mr-auto"
                        md="12"
                        sm="9">
                        <Card>
                            <CardHeader>
                                <Link to={"/events"}>
                                    <FontAwesomeIcon
                                        style={{ fontSize: "20px", marginRight: 10 }}
                                        icon={faArrowLeft} />
                                </Link>
                                <div className="d-flex align-itmes-center justify-content-between">
                                    <CardTitle tag="h4">Admins Details</CardTitle>

                                </div>
                                <p className="text start m-0 p-0 pt-0 text-secondary">
                                    Admins Details will Add here
                                </p>
                            </CardHeader>
                            <CardBody>
                                <CardBody>
                                    <Form onSubmit={handleOnSubmit} className='EmpForm'>
                                        <Row className='mt-3 justify-content-around' >
                                            <AdmRegComp
                                                label={'Full Name'}
                                                value={fullName}
                                                onChangeEvent={(e) => {
                                                    setfullName(e.target.value);
                                                    if (Err && Err.fullName) {
                                                        setErr({ ...Err, fullName: null });
                                                    }
                                                }}
                                                invalid={Err && Err.fullName ? true : false}
                                                errorMessage={Err && Err.fullName ? Err.fullName : null}
                                            />
                                            <AdmRegComp
                                                label={'Email'}
                                                value={email}
                                                onChangeEvent={(e) => {
                                                    setemail(e.target.value);
                                                    if (Err && Err.email) {
                                                        setErr({ ...Err, email: null });
                                                    }
                                                }}
                                                invalid={Err && Err.email ? true : false}
                                                errorMessage={Err && Err.email ? Err.email : null}
                                            />
                                        </Row>
                                        <Row className='mt-3 justify-content-around' >
                                            <AdmRegComp
                                                label={'Password'}
                                                value={password}
                                                onChangeEvent={(e) => {
                                                    setpassword(e.target.value);
                                                    if (Err && Err.password) {
                                                        setErr({ ...Err, password: null });
                                                    }
                                                }}
                                                invalid={Err && Err.password ? true : false}
                                                errorMessage={Err && Err.password ? Err.password : null}

                                            />
                                            <AdmRegComp
                                                label={'Contact'}
                                                value={contact}
                                                onChangeEvent={(e) => {
                                                    setcontact(e.target.value);
                                                    if (Err && Err.contact) {
                                                        setErr({ ...Err, contact: null });
                                                    }
                                                }}
                                                invalid={Err && Err.contact ? true : false}
                                                errorMessage={Err && Err.contact ? Err.contact : null}
                                            />

                                        </Row>
                                        <Row style={{ marginLeft: "8%" }}
                                            className='justify-content-start mt-3 mb-3'>
                                            <Col lg="4" md="4" sm="8">
                                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                    <Button type='submit' color='primary'>Submit</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AdminRegFrom