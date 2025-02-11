import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

const isAuthenticated = () => {
  return !!Cookies.get('userToken');
};

const Protect = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default Protect;
