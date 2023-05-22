// import { event } from 'jquery';
// import React, { useState } from 'react'
// import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// const EventdetailsForm = () => {
//   const [isFormDisplayed, setIsFormDisplayed] = useState(true);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [eventStartDate, setEventStartDate] = useState('');
//   const [eventStartTime, setEventStartTime] = useState('');
//   const [eventEndDate, setEventEndDate] = useState('');
//   const [eventEndTime, setEventEndTime] = useState('');
//   const [lastDegree, setLastDegree] = useState('');
//   const [address, setAddress] = useState('');
//   const [joiningDate, setJoiningDate] = useState('');
//   const [posterImage, setPosterImage] = useState([]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('location', location);
//     formData.append('eventStartDate', eventStartDate);
//     formData.append('EventStartTime', eventStartTime);
//     formData.append('eventEndDate', eventEndDate);
//     formData.append('eventEndTime', eventEndTime);
//     formData.append('joiningDate', joiningDate);
//     formData.append('posterImage', posterImage);
//     try {
//       let response = await fetch(`http://localhost:350/addEvents`, {
//         method: 'POST',
//         body: formData,
//       })
//       response = await response.json()
//       console.log(response)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     // TODO: Handle form submission logic
//     setIsFormDisplayed(false);
//   };

//   const handleSubmiting =()=>{
//   handleFormSubmit("")
//   handleSubmit("")
//   }
//   return (
//     <>

//       <Form onSubmit={handleFormSubmit}>
//         <FormGroup onSubmit={handleSubmit} row>
//           <Label for="exampleEmail" sm={2}>Event Title</Label>
//           <Col sm={10}>
//             <Input type="text" name="policy" id="exampleEvent" placeholder="Event Title"
//               value={title} onChange={(e) => { setTitle(e.target.value) }}
//             />
//           </Col>
//         </FormGroup>

//         <FormGroup row>
//           <Label for="exampleText" sm={2}>Event Description</Label>
//           <Col sm={10}>
//             <Input type="textarea" name="text" id="exampleText"
//               value={description} onChange={(e) => { setDescription(e.target.value) }}
//             />
//           </Col>
//         </FormGroup>
//         <FormGroup row>
//           <Label for="exampleLocation" sm={2}>Event Location</Label>
//           <Col sm={10}>
//             <Input type="text" name="policy" id="exampleLocation" placeholder="Location"
//               value={location} onChange={(e) => { setLocation(e.target.value) }}
//             />
//           </Col>
//         </FormGroup>
//         <FormGroup row>
//           <Label for="exampleEmail" sm={2}>Event Poster</Label>
//           <Col sm={10}>
//             <Input type="file" name="image" id="exampleEmail"
//               value={posterImage} onChange={(e) => { setPosterImage(e.target.files[0]) }}
//             />
//           </Col>
//         </FormGroup>
//         <FormGroup row>
//           <Label for="exampleEmail" sm={2}>Event Start Date</Label>
//           <Col sm={10}>
//             <Input type="date" name="policy" id="exampleEmail"
//               value={eventStartDate} onChange={(e) => { setEventStartDate(e.target.value) }}
//             />
//           </Col>
//         </FormGroup>
//         <FormGroup row>
//           <Label for="exampleEmail" sm={2}>Event Start Time</Label>
//           <Col sm={10}>
//             <Input type="time" name="policy" id="exampleEmail"
//               value={eventStartTime} onChange={(e) => { setEventStartTime(e.target.value) }}
//             />
//           </Col>
//         </FormGroup>
//         <FormGroup row>
//           <Label for="exampleEmail" sm={2}>Event End Date</Label>
//           <Col sm={10}>
//             <Input type="date" name="policy" id="exampleEmail"

//               value={eventEndDate} onChange={(e) => { setEventEndDate(e.target.value) }}
//             />
//           </Col>
//         </FormGroup>

//         <FormGroup row>
//           <Label for="exampleEmail" sm={2}>Event End Time</Label>
//           <Col sm={10}>
//             <Input type="time" name="policy" id="exampleEmail"
//               value={eventEndTime} onChange={(e) => { setEventEndTime(e.target.value) }}
//             />
//           </Col>
//         </FormGroup>
//         <FormGroup check row>
//           <Col sm={{ size: 10, offset: 2 }}>
//             <Button type='submit' color='primary'>Submit</Button>
//           </Col>
//         </FormGroup>
//       </Form>
//     </>
//   )
// }

// export default EventdetailsForm