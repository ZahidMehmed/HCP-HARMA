import React from 'react'
import { Container,Row } from 'reactstrap'
import '../assets/css/Login.css'

const Pgae404 = () => {
  return (
    <>
          <Container fluid>
            <Row className ="justify-content-center page404 align-items-center flex-column pt-5 mt-5" >
              <h2 className=''>404 Error Page </h2> <br/>
              <h5>This Page doesn't exist</h5>
              </Row>
          </Container>
    </>
   
  )
}

export default Pgae404