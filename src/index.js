
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Dashboard from './layouts/Admin'
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<BrowserRouter >
  <Dashboard   />
  </BrowserRouter>
);
