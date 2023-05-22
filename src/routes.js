import AdminRegFrom from "components/Forms/AdminsReg";
import ConsultantForm from "components/Forms/ConsultantForm";
import ConsultantUpdate from "components/Forms/ConsultantUpdate";
import EventUpdateForm from "components/Forms/EventUpdateForm";
import Dashboard from "views/Dashboard";
import EmpAtendHistory from "views/EmpAtendHistory";
import EmployeeDetails from "views/EmployeeDetails";
import Events from "views/Events";
import MultiUsers from "views/MultiUsers";
import Pgae404 from "views/Pgae404";
import Policy from "views/Policy";
import UpdateEmployeeDetails from "views/UpdateEmpDetails";
import User from "views/User";
let c = true;
const routes = [
  {
    name :"Dashboard",
    path:"/",
    element:<Dashboard />

  },
  // {
  //   name :"Employees List",
  //   path:"/tables",
  //   element:<EmployeeTables />
  // },
  // {
  //   name :"Event Detail ",
  //   path:"/events",
  //   element:<Events />
  // },
  // {
  //   name :"Policy ",
  //   path:"/policy",
  //   element:<Policy/>
  // },

  {
    name :"Employee Registration",
    path:"/employeeForm",
    element:<EmployeeDetails />
  },

  {
    name :"Consultant Registration",
    path:"/ConsultantForm",
    element:<ConsultantForm />
  },
  {
    name :"Update Employe",
    path:"/UpdateEmployee/:id",
    element:<UpdateEmployeeDetails/>
  },
  {
    name :"Edit Consultant detail",
    path:"/UpdateConsultant/:id",
    element:<ConsultantUpdate/>
  },
  // {
  //   name :"Leaves",
  //   path:"/Leaves",
  //   element:<EmployeeLeaves />
  // },
  {
    name :"Employee History",
    path:"/EmpAtendHistory/:id",
    element:<EmpAtendHistory />
  },
  {
    name :" User Profile",
    path:"/userProfile",
    element:<User />
  },
  {
    name :"Uupdate Event Detail",
    path:"/updateEvent/:id",
    element:<EventUpdateForm />
  },
  // {
  //   name :"Admins",
  //   path:"/MultiUsers",
  //   element:<MultiUsers/>
  // },
  {
    name :"Admins Registration",
    path:"/AdminsReg",
    element:<AdminRegFrom />
  },
  {
    name :"404 Error",
    path:"*",
    element:<Pgae404/>
  },
  ]
export default routes;
