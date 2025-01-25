// import React from 'react'
// import Login from './Components/Login/Login'
// import { BrowserRouter , Routes, Route } from "react-router-dom";
// import Userform from './Components/Home/Userform';
// import { Toaster } from 'react-hot-toast';
// import CsvToTable from './Components/CsvFile/CsvToTable';
// import TableLead from './Components/CsvFile/Lead/TableLead';
// import Header from './Components/Header/Header';

// const App = () => {
//   return (
// < div className='flex'>
//    <BrowserRouter>
//    <Header/>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         {/* <Route path='/userform' element={<Userform/>} > </Route>
//         <Route path='/uploadfile' element={<CsvToTable/>}></Route>
//         <Route path='/dsa/Lead' element={<TableLead/> }></Route> */}

//       </Routes>
//       <Toaster/>
//       </BrowserRouter>
//       </div>
//   )
// }

// export default App

import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";

const App = () => (
  // <Router>
    <Dashboard />
  // </Router>
);

export default App;
