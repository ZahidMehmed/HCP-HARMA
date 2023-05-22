import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAltAverage,
  faBook,
  faUser,
  faCapsules,
  faUserDoctor
} from '@fortawesome/free-solid-svg-icons'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import '../../assets/css/SideBar.css'
import logo from "../../assets/img/HC - PHARMA-PhotoRoom.png-PhotoRoom.png";
var ps;
function Sidebar(props) {
  const [EmpList, setEmpList] = useState(false)
  const [EmpLeaves, setEmpLeaves] = useState(false)
  const [Events, setEvents] = useState(false)
  const [Policy, setPolicy] = useState(false)
  const [Auter, setAuter] = useState("")
  const sidebar = React.useRef();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1 && sidebar.current) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      getAdminRequest()
      getSuperAdminRequest()
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps?.destroy();
      }
    };
  }, [sidebar.current]);
  const authering = localStorage.getItem('user')
  const user = authering ? JSON.parse(authering) : null;
  const auth = user?.user?.email
  const authV = JSON.parse(authering)
  let id = authV?.user?._id
  const getAdminRequest = async () => {
    let result = await fetch(`http://localhost:350/AdminPermisionsId/${id}`)
    result = await result.json()
    setEmpList(result.EmpList)
    setEmpLeaves(result.EmpLeaves)
    setEvents(result.Events)
    setPolicy(result.Policy)
  }
  const getSuperAdminRequest = async () => {
    try {
      let result = await fetch(`http://localhost:350/userGetId/${id}`);
      result = await result.json();
      setEmpList(result.EmpList)
      setEmpLeaves(result.EmpLeaves)
      setEvents(result.Events)
      setPolicy(result.Policy)
      setAuter(result.status)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {authering &&
        <div
          className="sidebar"
          data-color={props.bgColor}
          data-active-color={props.activeColor}
        >
          <div className="logo d-flex align-items-center bg-nav">
            <Link
              className="simple-text "
            >
              <img src={logo} style={{ width: "100px ", margin: "0px" }}
                alt="react-logo" />
            </Link>
            <Link style={{color:"#03a05c", fontWeight:700, color:600}}
              className=" logo-normal"
            >
              HC-Pharma
            </Link>
          </div>
          <div className="sidebar-wrapper bg-nav" ref={sidebar}>
            <Nav className="" >
              <li>
                <NavLink
                  to="/"
                  className="nav-link d-flex align-items-center"   >
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faTachometerAltAverage}
                      style={{ fontSize: 30, marginRight: 10, color:"#03a05c" }}
                       className="icon" /></div>
                  <p className="ms-1">Dashboard</p>
                </NavLink>
              </li>
              {EmpList === true &&
                <li>
                  <NavLink
                    to="/tables"
                    className="nav-link d-flex align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faCapsules}
                        style={{ fontSize: 30, marginRight: 10 }} className="icon" /></div>
                    <p>Pharma List</p>
                  </NavLink>
                </li>
              }
              {EmpLeaves === true &&
                <li>
                  <NavLink
                    to="/Consultant"
                    className="nav-link d-flex align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faUserDoctor}
                        style={{ fontSize: 30, marginRight: 10 }} className="icon" /></div>
                    <p>Consultant</p>
                  </NavLink>
                </li>
              }
              {Events === true &&
                <li>
                  <NavLink
                    to="/events"
                    className="nav-link d-flex align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faUser}
                        style={{ fontSize: 30, marginRight: 10 }} className="icon" /></div>
                    {/* <i className="nc-icon nc-tile-56" /> */}
                    <p>Users</p>
                  </NavLink>
                </li>
              }
              {Policy === true &&
                <li>
                  <NavLink
                    to="/policy"
                    className="nav-link d-flex align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBook}
                        style={{ fontSize: 30, marginRight: 10 }} className="icon" /></div>
                    {/* <i className="nc-icon nc-tile-56" /> */}
                    <p>Policy</p>
                  </NavLink>
                </li>
              }
              {auth == "william@gmail.com" &&
                <li>
                  <NavLink
                    to="/MultiUsers"
                    className="nav-link d-flex align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <MdOutlineAdminPanelSettings
                        style={{ fontSize: 30, marginRight: 10 }} className="icon" /></div>

                    <p>Admins</p>
                  </NavLink>
                </li>
              }
            </Nav>
          </div>
        </div>
      }
    </>
  );
}

export default Sidebar;
