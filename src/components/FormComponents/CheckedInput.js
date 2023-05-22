import React from 'react'
import { FormFeedback } from "reactstrap";
const CheckedInput = (props) => {
  return (
    <div >
    <input
      className="form-check-input"
      type="checkbox"
      value=""
      id="flexCheckDefault"
    //   checked={EmpLeaves}
      checked={props.state}
    //   onChange={(e) => { setEmpLeaves(e.target.checked) }}
      onChange={props.onChangeEvent}
      invalid={props.invalid}
      
    />
    <label className="form-check-label" htmlFor="flexCheckDefault">
      {props.label}
    </label>
    {props.errorMessage && <FormFeedback>{props.errorMessage}</FormFeedback>}  
  </div>
  )
}

export default CheckedInput