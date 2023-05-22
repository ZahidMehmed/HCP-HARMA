import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link, } from 'react-router-dom';
import '../../assets/css/Forms.css'
import { Form, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, FormFeedback, Button, Row, Col } from 'reactstrap';
import MedicineComp from 'components/FormComponents/MediCom';
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackward } from '@fortawesome/free-solid-svg-icons'
import CheckedInput from 'components/FormComponents/CheckedInput';

const ConsultantForm = () => {
    const [ConPhoto, setConPhoto] = useState(null); // State for the tablet photo
    const [email, setEmail] = useState(''); // State for the brand name
    const [ConName, setConName] = useState(''); // State for the strength
    const [Password, setPassword] = useState(''); // State for the ingredients
    const [Discription, setDiscription] = useState(''); // State for the description
    const [SpecialList, setSpecialist] = useState(''); // State for the dosage form
    const [StartTme, setStartTime] = useState(''); // State for the discount
    const [EndTime, setEndTime] = useState(''); // State for the price
    const [Contact, setContact] = useState('')
    const [Qualifications, setQualifications] = useState('')
    const [Fee, setFee] = useState('')
    const [Mon, setMon] = useState(false)
    const [Tue, setTue] = useState(false)
    const [Wed, setWed] = useState(false)
    const [Thu, setThu] = useState(false)
    const [Fri, setFri] = useState(false)
    const [Sat, setSat] = useState(false)
    const [Sun, setSun] = useState(false)
    const [Err, setErr] = useState(false)
    const Navigate = useNavigate()
    const params = useParams();
    const validateForm = () => {
        const errors = {};

        //   if (!ConPhoto) {
        //     errors.ConPhoto = "Profile name is required";
        //   }

        //   if (!email) {
        //     errors.email = "email is required";
        //   }

        //   if (!ConName) {
        //     errors.ConName = "Full Name is required";
        //   }

        //   if (!Password) {
        //     errors.Password = "Password is required";
        //   }

        //   if (!Discription) {
        //     errors.Discription = "Discription is required";
        //   }

        //   if (!SpecialList) {
        //     errors.SpecialList = "Specialist feild is required";
        //   }

        //   if (!StartTme) {
        //     errors.StartTme = "Start Time is required";
        //   }

        //   if (!EndTime) {
        //     errors.EndTime = "End Time is required";
        //   }

        return Object.keys(errors).length === 0 ? null : errors;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        //   const errors = validateForm();
        //   if (errors) {
        //     setErr(errors);
        //     return;
        //   }

        const formData = new FormData();
        formData.append('ConPhoto', ConPhoto);
        formData.append('email', email);
        formData.append('ConName', ConName);
        formData.append('Password', Password);
        formData.append('Discription', Discription);
        formData.append('SpecialList', SpecialList);
        formData.append('StartTme', StartTme);
        formData.append('EndTime', EndTime);
        formData.append('Fee', Fee);
        formData.append('Discription', Discription);
        formData.append('Qualifications', Qualifications);
        formData.append('Mon', Mon);
        formData.append('Tue', Tue);
        formData.append('Wed', Wed);
        formData.append('Thu', Thu);
        formData.append('Fri', Fri);
        formData.append('Sat', Sat);
        formData.append('Sun', Sun);

        const response = await fetch('http://localhost:350/addConsultant', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            Navigate("/Consultant");
            console.log(data);
        } else {
            console.log('Error:', response.status);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setConPhoto(file);
    };
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="demo-icons">
                            <CardHeader className=''>
                                <Link to="/Consultant" >
                                    <FontAwesomeIcon
                                        style={{ fontSize: "20px", marginRight: 10 }}
                                        icon={faArrowLeft} /></Link>
                                <CardTitle tag="h5" className='text-start Con mt-4'>Consultant Registration</CardTitle>
                                <p className="card-category"> </p>
                            </CardHeader>
                            <CardBody className="all-icons">
                                {/* Form Component Import and used here */}
                                <Form onSubmit={handleSubmit} className='EmpForm'>
                                    <Row className='ms-3 mt-4'>
                                        <Col sm={5}>
                                            <FormGroup >
                                                <Label for="exampleEmail" >Consultant Profile</Label>
                                                <Input type="file" name="ConPhoto" className="form-control" onChange={handleFileChange}
                                                    invalid={Err
                                                        && Err.ConPhoto ? true : false}
                                                />
                                                {Err && Err.ConPhoto && (<FormFeedback>{Err.ConPhoto}</FormFeedback>)}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className='ms-3 mt-4'>
                                        <Col sm={4}>
                                            <MedicineComp
                                                type={`text`}
                                                placeholder={`Cnsultant Full Name`}
                                                label={'Consultant Name'}
                                                value={ConName}
                                                onChangeEvent={(e) => {
                                                    setConName(e.target.value);
                                                    if (Err && Err.ConName) {
                                                        setErr({ ...Err, ConName: null });
                                                    }
                                                }}
                                                invalid={Err && Err.ConName ? true : false}
                                                errorMessage={Err && Err.ConName ? Err.ConName : null}
                                            />
                                        </Col>
                                        <Col sm={4}>
                                            <MedicineComp
                                                type={`text`}
                                                placeholder={`jhon@gmail.com etc.`}
                                                label={'Email'}
                                                value={email}
                                                onChangeEvent={(e) => {
                                                    setEmail(e.target.value);
                                                    if (Err && Err.email) {
                                                        setErr({ ...Err, email: null });
                                                    }
                                                }}
                                                invalid={Err && Err.email ? true : false}
                                                errorMessage={Err && Err.email ? Err.email : null}
                                            />
                                        </Col>
                                    </Row>


                                    <Row className='ms-3 mt-4'>
                                        <Col sm={8}>
                                            <MedicineComp
                                                type={`textarea`}
                                                placeholder={`Discription`}
                                                label={'Consultant Discription'}
                                                value={Discription}
                                                onChangeEvent={(e) => {
                                                    setDiscription(e.target.value);
                                                    if (Err && Err.Discription) {
                                                        setErr({ ...Err, Discription: null });
                                                    }
                                                }}
                                                invalid={Err && Err.Discription ? true : false}
                                                errorMessage={Err && Err.Discription ? Err.Discription : null}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='ms-3 mt-4'>

                                        <Col sm={4}>
                                            <MedicineComp
                                                type={`text`}
                                                placeholder={`Child Specialist, Skin Specialist etc.`}
                                                label={'Consultant Specialt For'}
                                                value={SpecialList}
                                                onChangeEvent={(e) => {
                                                    setSpecialist(e.target.value);
                                                    if (Err && Err.SpecialList) {
                                                        setErr({ ...Err, SpecialList: null });
                                                    }
                                                }}
                                                invalid={Err && Err.SpecialList ? true : false}
                                                errorMessage={Err && Err.SpecialList ? Err.SpecialList : null}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <MedicineComp
                                                type={`time`}
                                                placeholder={``}
                                                label={'Available from'}
                                                value={StartTme}
                                                onChangeEvent={(e) => {
                                                    setStartTime(e.target.value);
                                                    if (Err && Err.StartTme) {
                                                        setErr({ ...Err, StartTme: null });
                                                    }
                                                }}
                                                invalid={Err && Err.StartTme ? true : false}
                                                errorMessage={Err && Err.StartTme ? Err.StartTme : null}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <MedicineComp
                                                type={`time`}
                                                placeholder={``}
                                                label={'Available To'}
                                                value={EndTime}
                                                onChangeEvent={(e) => {
                                                    setEndTime(e.target.value);
                                                    if (Err && Err.EndTime) {
                                                        setErr({ ...Err, EndTime: null });
                                                    }
                                                }}
                                                invalid={Err && Err.EndTime ? true : false}
                                                errorMessage={Err && Err.EndTime ? Err.EndTime : null}
                                            />
                                        </Col>

                                    </Row>

                                        <Row className='ms-3 mt-4'>

                                        <Col sm={5}>
                                            <MedicineComp
                                                type={`text`}
                                                placeholder={``}
                                                label={'Qualification of'}
                                                value={Qualifications}
                                                onChangeEvent={(e) => {
                                                    setQualifications(e.target.value);
                                                    if (Err && Err.Qualifications) {
                                                        setErr({ ...Err, Qualifications: null });
                                                    }
                                                }}
                                                invalid={Err && Err.Qualifications ? true : false}
                                                errorMessage={Err && Err.Qualifications ? Err.Qualifications : null}
                                            />
                                        </Col>
                                       
                                        <Col sm={3}>
                                            <MedicineComp
                                                type={`text`}
                                                placeholder={`300PKr`}
                                                label={'Consultancy Fee'}
                                                value={Fee}
                                                onChangeEvent={(e) => {
                                                    setFee(e.target.value);
                                                    if (Err && Err.Fee) {
                                                        setErr({ ...Err, Fee: null });
                                                    }
                                                }}
                                                invalid={Err && Err.Fee ? true : false}
                                                errorMessage={Err && Err.Fee ? Err.Fee : null}
                                            />
                                        </Col>

                                    </Row>

                                    <Row className='ms-3 mt-4' style={{ marginLeft: "10px" }}>
                                        <Col className="CheckInput" sm={1}>
                                            <CheckedInput
                                                label={'Mon'}
                                                onChangeEvent={(e) => { setMon(e.target.checked) }}
                                                state={Mon}
                                            />
                                        </Col>
                                        <Col className="CheckInput" sm={1}>
                                            <CheckedInput
                                                label={'Tue'}
                                                onChangeEvent={(e) => { setTue(e.target.checked) }}
                                                state={Tue}
                                            />
                                        </Col>
                                        <Col className="CheckInput" sm={1}>
                                            <CheckedInput
                                                label={'Wed'}
                                                onChangeEvent={(e) => { setWed(e.target.checked) }}
                                                state={Wed}
                                            />
                                        </Col>
                                        <Col className="CheckInput" sm={1}>
                                            <CheckedInput
                                                label={'Thu'}
                                                onChangeEvent={(e) => { setThu(e.target.checked) }}
                                                state={Thu}
                                            />
                                        </Col>
                                        <Col className="CheckInput" sm={1}>
                                            <CheckedInput
                                                label={'Fri'}
                                                onChangeEvent={(e) => { setFri(e.target.checked) }}
                                                state={Fri}
                                            />
                                        </Col>
                                        <Col className="CheckInput" sm={1}>
                                            <CheckedInput
                                                label={'Sat'}
                                                onChangeEvent={(e) => { setSat(e.target.checked) }}
                                                state={Sat}
                                            />
                                        </Col>
                                        <Col className="CheckInput" sm={1}>
                                            <CheckedInput
                                                label={'Sun'}
                                                onChangeEvent={(e) => { setSun(e.target.checked) }}
                                                state={Sun}
                                            />
                                        </Col>

                                    </Row>
                                    <Row className='ms-2 mt-4' >
                                        <Col sm={4}>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Button type='submit' color='primary'>Submit</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default ConsultantForm