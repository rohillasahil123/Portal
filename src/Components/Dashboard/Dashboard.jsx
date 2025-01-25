import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import UploadCsv from "./UploadCsv";
import MyLeads from "./MyLeads";
import IndividualLead from "./SingleLead"   
import Loginpage from "./Login" 
import Board from "./Board";
import AdminDeshBoaard from "./AdminDeshBoaard";
import ManageAll from "./ManageAll"
import Eligibility from "./Eli"
// import EMICalculator from "./EMICalculator"
import EMICalculator from "./EmiCalculator";


const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [leads, setLeads] = useState([]);

  const handleUpload = (data) => {
    setLeads(data); 
  };
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleAuthToggle = () => {
    const newStatus = !isLoggedIn;
    setIsLoggedIn(newStatus);
    localStorage.setItem("isLoggedIn", newStatus);
  };

  return (
    <Router>
      <div className="flex">
        {/* {isLoggedIn && <Sidebar isLoggedIn={isLoggedIn} onAuthToggle={handleAuthToggle} />} */}
        <Sidebar/>

        {/* Main Content */}
        <div className={`flex-1 p-6 ${isLoggedIn ? "bg-gray-50" : "bg-white"} min-h-screen`}>
          <Routes>
           
            <Route
              path="/"
              element={<Board/>}
            />
            <Route
              path="/uploadcsv"
              element={ <UploadCsv onUpload={handleUpload} /> }
            />  
            <Route
              path="/myleads"
              element={ <MyLeads leads={leads} /> }
            />
            <Route
              path="/manage/partner"
              element={<ManageAll/>}
            />
              <Route
              path="/EmiCalculator"
              element={ <EMICalculator/> }
            />
               <Route
              path="/eli"
              element={ <Eligibility/>  }
            />
             <Route
              path="/admin/dashboard"
              element={<AdminDeshBoaard/>}
            />
            <Route
              path="/individual"
              element={ <IndividualLead />}
            />
            <Route path="/login" element={<Loginpage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
