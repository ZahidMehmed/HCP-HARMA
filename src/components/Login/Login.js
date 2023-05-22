import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/Login.css';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledAlert,
} from 'reactstrap';
import { event } from 'jquery';

const LogIn = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [Err, setErr] = useState(false);
  const Navigate = useNavigate();

  const handleClick = async (e) => {
    console.log('Email: ', email, ' Password: ', password);
    setErr(false); // reset the error state
    const result = await fetch('https://hc-pharma-back-end.vercel.app/userLogin', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await result.json();

    if (result.status === 200) {
      localStorage.setItem('user', JSON.stringify(data));
      Navigate('/');
    } else if (result.status === 401) {
      setErr('danger');
      // console.log('Err:', Err);
      // alert('Invalid email or password');
      return false;
    } else {
      alert('An error occurred');
    }
  };
  const handleClick1 = async (e) => {

    console.log('Email: ', email, ' Password: ', password);
    setErr(false); // reset the error state
    const result = await fetch('https://hc-pharma-back-end.vercel.app/userLogin', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await result.json();
    if (result.status === 200) {
      localStorage.setItem('user', JSON.stringify(data));
      Navigate('/');
    } else if (result.status === 401) {
      setErr('danger');
      return false;
    } else {
      alert('An error occurred');
    }
  };


  return (
    <div className="container ">
      <Row className="justify-content-start mt-5 pt-5 ">
        <Col lg="2" md="3" sm="3"></Col>
        <Col md="6" sm="10">
          <Form onSubmit={(e) => {
            e.preventDefault()
            handleClick(event.preventDefault)
            handleClick1(event.preventDefault)
          }} className=" login p-5 form">
            <h2 className="text-center text-info display-4">Admin Login</h2>
            {Err && (
              <UncontrolledAlert color={Err}>
                {Err === 'danger' ? 'Invalid email or password!' : 'Login Successful!'}
              </UncontrolledAlert>
            )}
            <FormGroup>
              <Label for="exampleEmail">Username or email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="example@example.com"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </FormGroup>
            <Button color="primary">Login</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LogIn;
