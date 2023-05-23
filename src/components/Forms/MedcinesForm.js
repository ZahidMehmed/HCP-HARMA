import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/Forms.css'
import { Form, FormGroup, Label, Input, FormFeedback, Button, Row, Col } from 'reactstrap';
import MedicineComp from 'components/FormComponents/MediCom';
const EmoloyeesForm = () => {
  const [TabPhoto, setTabPhoto] = useState(null); // State for the tablet photo
  const [brandName, setBrandName] = useState(''); // State for the brand name
  const [Strength, setStrength] = useState(''); // State for the strength
  const [Ingredients, setIngredients] = useState(''); // State for the ingredients
  const [Description, setDescription] = useState(''); // State for the description
  const [DosageForm, setDosageForm] = useState(''); // State for the dosage form
  const [Discount, setDiscount] = useState(0); // State for the discount
  const [Price, setPrice] = useState(0); // State for the price

  const [Err, setErr] = useState(false)
  const Navigate = useNavigate()
  const params = useParams();
  const validateForm = () => {
    const errors = {};

    if (!TabPhoto) {
      errors.TabPhoto = "Full name is required";
    }

    if (!brandName) {
      errors.brandName = "Brand is required";
    }

    if (!Strength) {
      errors.Strength = "Password is required";
    }

    if (!Ingredients) {
      errors.Ingredients = "CNIC is required";
    }

    if (!Description) {
      errors.Description = "Designation is required";
    }

    if (!DosageForm) {
      errors.DosageForm = "Salary is required";
    }

    if (!Discount) {
      errors.Discount = "Last degree is required";
    }

    if (!Price) {
      errors.Price = "Address is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (errors) {
      setErr(errors);
      return;
    }

    const formData = new FormData();
    formData.append('TabPhoto', TabPhoto);
    formData.append('brandName', brandName);
    formData.append('Strength', Strength);
    formData.append('Ingredients', Ingredients);
    formData.append('Description', Description);
    formData.append('DosageForm', DosageForm);
    formData.append('Discount', Discount);
    formData.append('Price', Price);
    // formData.append('TabPhoto', TabPhoto);
    // formData.append('TabPhoto', TabPhoto);
    // formData.append('TabPhoto', TabPhoto);

    try {
      const response = await fetch('http://localhost:350/PharmaList', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        Navigate("/tables")
        console.log(data);
      } else {
        // Handle the error response
        console.log('Error:', response.status);
      }
    } catch (error) {
      // Handle any network or request error
      console.log('Error:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setTabPhoto(file);
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className='EmpForm'>
        <Row className='ms-2 mt-4'>
          <Col sm={5}>
            <FormGroup >
              <Label for="exampleEmail" >Product Image</Label>
              <Input type="file" name="TabPhoto" className="form-control" onChange={handleFileChange}
                invalid={Err
                  && Err.TabPhoto ? true : false}
              />
              {Err && Err.TabPhoto && (<FormFeedback>{Err.TabPhoto}</FormFeedback>)}
            </FormGroup>
          </Col>
        </Row>
        <Row className='ms-2 mt-4'>
          <Col sm={4}>
            <MedicineComp
              type={`text`}
              placeholder={`Strength`}
              label={'Strength'}
              value={Strength}
              onChangeEvent={(e) => {
                setStrength(e.target.value);
                if (Err && Err.Strength) {
                  setErr({ ...Err, Strength: null });
                }
              }}
              invalid={Err && Err.Strength ? true : false}
              errorMessage={Err && Err.Strength ? Err.Strength : null}
            />
          </Col>
          <Col sm={4}>
            <MedicineComp
              type={`text`}
              placeholder={`Company Name`}
              label={'Company Name'}
              value={brandName}
              onChangeEvent={(e) => {
                setBrandName(e.target.value);
                if (Err && Err.brandName) {
                  setErr({ ...Err, brandName: null });
                }
              }}
              invalid={Err && Err.brandName ? true : false}
              errorMessage={Err && Err.brandName ? Err.brandName : null}
            />
          </Col>
        </Row>

        <Row className='ms-2 mt-4'>
          <Col sm={8}>
            <MedicineComp
              type={`text`}
              placeholder={`Prodcut Further details`}
              label={'ingredients'}
              value={Ingredients}
              onChangeEvent={(e) => {
                setIngredients(e.target.value);
                if (Err && Err.Ingredients) {
                  setErr({ ...Err, Ingredients: null });
                }
              }}
              invalid={Err && Err.Ingredients ? true : false}
              errorMessage={Err && Err.Ingredients ? Err.Ingredients : null}
            />
          </Col>
        </Row>

        <Row className='ms-2 mt-4'>
          <Col sm={8}>
            <MedicineComp
              type={`textarea`}
              placeholder={`Discription about further deatils`}
              label={'Prodcut Description'}
              value={Description}
              onChangeEvent={(e) => {
                setDescription(e.target.value);
                if (Err && Err.Description) {
                  setErr({ ...Err, Description: null });
                }
              }}
              invalid={Err && Err.Description ? true : false}
              errorMessage={Err && Err.Description ? Err.Description : null}
            />
          </Col>
        </Row>
        <Row className='ms-2 mt-4'>
          <Col sm={4}>
            <MedicineComp
              type={`text`}
              placeholder={`Dosage Form (cagegory, medicine, etc.)`}
              label={'Dosage (type)'}
              value={DosageForm}
              onChangeEvent={(e) => {
                setDosageForm(e.target.value);
                if (Err && Err.DosageForm) {
                  setErr({ ...Err, DosageForm: null });
                }
              }}
              invalid={Err && Err.DosageForm ? true : false}
              errorMessage={Err && Err.DosageForm ? Err.DosageForm : null}
            />
          </Col>
          <Col sm={4}>
            <MedicineComp
              type={`text`}
              placeholder={`Discount`}
              label={'discount'}
              value={Discount}
              onChangeEvent={(e) => {
                setDiscount(e.target.value);
                if (Err && Err.Discount) {
                  setErr({ ...Err, Discount: null });
                }
              }}
              invalid={Err && Err.Discount ? true : false}
              errorMessage={Err && Err.Discount ? Err.Discount : null}
            />
          </Col>
        </Row>

        <Row className='ms-2 mt-4'>
          <Col sm={4}>
            <MedicineComp
              type={`text`}
              placeholder={`Prodcut Price`}
              label={'Dosage (type)'}
              value={Price}
              onChangeEvent={(e) => {
                setPrice(e.target.value);
                if (Err && Err.Price) {
                  setErr({ ...Err, Price: null });
                }
              }}
              invalid={Err && Err.Price ? true : false}
              errorMessage={Err && Err.Price ? Err.Price : null}
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

    </>
  )
}

export default EmoloyeesForm