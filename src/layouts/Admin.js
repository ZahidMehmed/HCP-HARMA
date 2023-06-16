
import React, {useState, useEffect} from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes";
import LogIn from "components/Login/Login";
import Private from "components/Login/Private";
import MedicinesTable from "views/MedicinesTables";
import Eventss  from 'views/Events'
import Policyy from "views/Policy";
import MultiUsers from "views/MultiUsers";
import Consultants from "views/Consultant";
import '../assets/css/AdminCSS.css'
var ps;

function Dashboard(props) {
  const [EmpList, setEmpList] = useState(false)
  const [EmpLeaves, setEmpLeaves] = useState(false)
  const [Events, setEvents] = useState(false)
  const [Policy, setPolicy] = useState(false)
  const [Auter, setAuter] = useState("")
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps?.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    getAdminRequest()
    getSuperAdminRequest()
  }, [location]);

  const authering = localStorage.getItem('user')
  let value = localStorage.getItem('user')
  const authV = JSON.parse(value)
  let id = authV?.user?._id
  const getAdminRequest = async () => {
    let response = await fetch(`https://hc-pharma-back-end.vercel.app/AdminPermisionsId/${id}`);
    if (response.ok) {
      try {
        const result = await response.text();
        if (result) {
          const jsonData = JSON.parse(result);
          setEmpList(jsonData.EmpList);
          setEmpLeaves(jsonData.EmpLeaves);
          setEvents(jsonData.Events);
          setPolicy(jsonData.Policy);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  };
  
  
  const getSuperAdminRequest = async () => {
    try {
      let result = await fetch(`https://hc-pharma-back-end.vercel.app/userGetId/${id}`);
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

    <div className="wrapper">
      <Sidebar
      />
      <div className="main-panel" ref={mainPanel}>
       <DemoNavbar {...props} /> 
        <Routes>
        <Route element ={<Private/>}>
          {routes.map((prop, key) => {
            return (  
              <Route
                key = {prop.name}
                path={prop.path}
                name={prop.name}
                element={prop.element}

              />
        
            );
          })}
       </Route>
       {!authering && (<Route path="/SignIn" element ={<LogIn/>} />) }
       {EmpList === true &&<Route path={"/tables"} element ={<MedicinesTable/>} /> }
       {EmpLeaves === true && <Route  path={"/Consultant"} element ={<Consultants />} /> }
       {/* {Events === true && <Route   path={"/events"} element ={<Eventss/>} /> } */}
       {Policy === true && <Route   path={"/policy"} element ={<Policyy/>} /> }
       {Auter == "Autherized" && <Route   path={"/MultiUsers"} element ={<MultiUsers/>} /> }
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
