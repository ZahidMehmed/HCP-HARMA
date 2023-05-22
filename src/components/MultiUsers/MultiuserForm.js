import React from 'react'

const MultiuserForm = (props) => {
  return (
    <div className='row justify-content-start'>
    <input
      className="form-check-input"
      type="checkbox"
      value=""
      id="flexCheckDefault"
    //   checked={EmpLeaves}
      checked={props.state}
    //   onChange={(e) => { setEmpLeaves(e.target.checked) }}
      onChange={props.onChangeEvent}
    />
    <label className="form-check-label" htmlFor="flexCheckDefault">
      {props.label}
    </label>
  </div>
  )
}

export default MultiuserForm