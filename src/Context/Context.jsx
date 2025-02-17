import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export const ThemeContext = createContext(null);
export const ThemeProvider = ({ children }) => {
  const [allData, setAllData] = useState(null);
  const [leads, setLeads] = useState(null);
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(null);
  const [approve, setApprove] = useState(null);
  const [reject, setReject] = useState(null);
  const [progress, setProgress] = useState(null);
  const [userId, setUserId] = useState(Cookies.get("userId"));
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const [adminSuccess, setAdminSuccess] = useState(null);
  const [adminRejected , setAdminRejected] = useState(null)
  const [partnerShow, setPartnerShow] = useState(null);

  
  useEffect(()=>{
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getAllData/partners/leads");
      setPartnerShow(response.data.partners)
      setAllData(response.data.totalLeads);
      setAdminSuccess(response.data.successLeads)
      setAdminRejected(response.data.rejectedLeads)
      
    } catch (error) {
      console.error("Error fetching all data:", error);
    }

  };
  getData()
},[allData])

  // Fetch leads data
  useEffect(()=>{
  const fetchLeads = async () => {
    if (!userId) return;
    try {
      const response = await axios.post("http://localhost:3000/get-leads-by-uploader-id", {
        uploaderId: userId,
      });
      setLeads(response.data.totalLeads);
      setUser(response.data.totalUsers);
      setApprove(response.data.approvedUsers);
      setReject(response.data.rejectedUsers);
      setProgress(response.data.processingLeads);
     
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };
  fetchLeads();
}, [userId , fetchTrigger , allData])
 

 
  useEffect(() => {
      const newUserId = Cookies.get("userId");
      if (newUserId !== userId) {
        setUserId(newUserId);
      }
  }, [userId]);


  return (
    <ThemeContext.Provider value={{
      allData, setAllData, leads, setLeads, user, setUser, adminRejected , adminSuccess, partnerShow,
      success, setSuccess, approve, setApprove, reject, setReject, progress, setProgress,
      fetchTrigger, setFetchTrigger
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
