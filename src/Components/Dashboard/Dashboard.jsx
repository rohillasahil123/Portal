import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import UploadCsv from "./UploadCsv";
import MyLeads from "./MyLeads";
import IndividualLead from "./SingleLead";
import Loginpage from "./Auth/Login";
import Board from "./Board";
import AdminDashBoaard from "./Admindashboard";
import ManageAll from "./ManageAll";
import Eligibility from "./Eli";
import EMICalculator from "./EmiCalculator";
import CreatePartner from "./Create/Crerate_user";
import CreateInd from "./Create/Create_ind";
import CreateManager from "./Create/Create_manager";
import Profile from "./Profile/Profile";
import LoginUserPage from "./CreateAuth/LoginInd";
import LoginPartner from "./CreateAuth/LoginPartner";
import LenderList from "./LenderList/LenderList";
import { Toaster } from "react-hot-toast";
import Deleteilist from "./Delete/Deleteilist";
import Protect from "../Protetcted/Protect";

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
        <Sidebar />

        <div
          className={`flex-1  justify-center ${
            isLoggedIn ? "bg-gray-50" : "bg-white"
          } min-h-screen`}
        >
          <Routes>
            <Route path="/board" element={<Board />} />
            <Route
              path="/uploadcsv"
              element={<UploadCsv onUpload={handleUpload} />}
            />
            <Route path="/myleads" element={<MyLeads leads={leads} />} />
            <Route
              path="/admin"
              element={
                <Protect>
                  <AdminDashBoaard />
                </Protect>
              }
            />
            <Route
              path="/manage/partner"
              element={
                <Protect>
                  <ManageAll />
                </Protect>
              }
            />
            <Route path="/EmiCalculator" element={<EMICalculator />} />
            <Route
              path="/eli"
              element={
                <Protect>
                  <Eligibility />
                </Protect>
              }
            />
            <Route path="/loginInd" element={<LoginUserPage />} />
            <Route path="/loginPartner" element={<LoginPartner />} />
            <Route
              path="/create_user"
              element={
                <Protect>
                  <CreatePartner />
                </Protect>
              }
            />
            <Route
              path="/create_ind"
              element={
                <Protect>
                  <CreateInd />
                </Protect>
              }
            />
            <Route
              path="/create_manager"
              element={
                <Protect>
                  <CreateManager />
                </Protect>
              }
            />
            <Route
              path="/individual"
              element={
                <Protect>
                  <IndividualLead />
                </Protect>
              }
            />
            <Route
              path="/profile"
              element={
                <Protect>
                  <Profile />
                </Protect>
              }
            />
            <Route
              path="/list"
              element={
                <Protect>
                  <LenderList />
                </Protect>
              }
            />
            <Route
              path="/deleteUser"
              element={
                <Protect>
                  <Deleteilist />
                </Protect>
              }
            />
            <Route path="/" element={<Loginpage />} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </Router>
  );
};

export default Dashboard;
