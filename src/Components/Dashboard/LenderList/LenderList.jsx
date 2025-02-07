import React, { useState, useEffect } from "react";
import faircent from "../../../assets/faircent.webp";
import abhiloan from "../../../assets/abhi.webp";
import moneytap from "../../../assets/moneytap-logo.svg";
import ClickLoan from "../../../assets/clickmyloans.webp";
import piramal from "../../../assets/piramal-vector-logo.png";
import prefr from "../../../assets/prefr.png";
import ramfin from "../../../assets/ramfin.png";
import Upwards from "../../../assets/Upwards.png";
import Fibe from "../../../assets/FIBE.webp";
import zype from "../../../assets/Zipe.webp";
import moneyview from "../../../assets/moneyview.svg";
import SmartCoin from "../../../assets/smartcoin.jpg";
import mpocket from "../../../assets/mpkt.svg";
import meter from "../../../assets/meter.png";
import cashe from "../../../assets/cashe.jpg";
import { GiMoneyStack } from "react-icons/gi";
import { GrDocumentConfig } from "react-icons/gr";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

const LenderList = () => {
  // const [user, setUser] = useState({});
  const [filteredLenders, setFilteredLenders] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const leandersdetails = [
    {
      name: "AbhiLoans",
      respName: "abhi",
      imageUrl: abhiloan,
      approvalRating: "Excellent",
      loanAmount: "Upto ₹ 5,00,000",
      interestRate: "Starting from 24% to 30%",
      tenure: "Upto 24 months",
      processingFee: "Upto 2.5%",
      features: [
        "No Collateral",
        "Repayment Flexibility",
        "No Usage Restriction",
      ],
      showForm: true,
      formUrl: "/abhiloans",
      type: "security",
    },
    {
      name: "Cashe",
      respName: "cashe",
      imageUrl: cashe,
      type: "pl",
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/cashe",
      offerConfig: {
        redUrl: "https://cashe.co.in",
        red2Url: "https://cashe.co.in",
        displayText: "You have an offer!!",
        successCondition: (response) =>
          response.cashe.message === "Successfully Created",
      },
    },
    {
      name: "ClickMyLoans",
      respName: "ClickMyLoans",
      type: "pl",
      imageUrl: ClickLoan,
      approvalRating: "Excellent",
      loanAmount: "Upto ₹ 5,00,000",
      interestRate: "Starting from 24% to 30%",
      tenure: "Upto 24 months",
      processingFee: "Upto 2.5%",
      features: [
        "No Collateral",
        "Repayment Flexibility",
        "No Usage Restriction",
      ],
      showForm: true,
      formUrl:
        "https://clickmyloan.cloudbankin.com/onboard/?referral_code=clA4jK9pR6",
    },
    {
      name: "Faircent",
      respName: "faircent",
      imageUrl: faircent,
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/faircent",
      offerConfig: {
        redUrl: "https://pq.faircent.com/",
        red2Url: "https://pq.faircent.com/",
        displayText: "You have an offer!!",
        errorText: "You are not eligible for Faircent",
        successCondition: (response) => response.faircent.success === true,
      },
    },
    {
      name: "Fibe",
      respName: "fibe",
      type: "pl",
      imageUrl: Fibe,
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/fibe",
      offerConfig: {
        redUrl: "redirectionUrl",
        displayText: "You have an offer!!",
        successCondition: (response) =>
          response.reason === "customer lead updated",
      },
    },

    {
      name: "MoneyTap",
      respName: "moneytap",
      type: "pl",
      imageUrl: moneytap,
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/moneytap",
      offerConfig: {
        redUrl: "reponse.pwa",
        errorText: "You are not eligible for MoneyView",
        displayText: "You have an offer!!",
        successCondition: (response) => response.status !== "reject",
      },
    },
    {
      name: "MoneyView",
      respName: "moneyview",
      type: "pl",
      imageUrl: moneyview,
      approvalRating: "Excellent",
      loanAmount: "Upto ₹ 2,00,000",
      interestRate: "Starting from 26%",
      tenure: "Upto 36 months",
      processingFee: "Upto 3%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/moneyview",
      offerConfig: {
        redUrl: "reponse.pwa",
        errorText: "You are not eligible for MoneyView",
        displayText: "You have an offer!!",
        successCondition: (response) => response.message === "success",
      },
    },
    {
      name: "MPocket",
      respName: "Mpocket",
      type: "pl",
      imageUrl: mpocket,
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/mpocket",
      offerConfig: {
        redUrl: "redirectionUrl",
        displayText: "You have an offer!!",
        successCondition: (response) =>
          response.reason === "customer lead updated",
      },
    },
    {
      name: "Payme",
      respName: "payme",
      type: "pl",
      imageUrl: piramal,
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/payme",
      offerConfig: {
        redUrl: "reponse.cibil.message",
        displayText: "You have an offer!!",
        successCondition: (response) =>
          response.cibil.message === "Cibil fetched successfully",
      },
    },
    {
      name: "Prefr",
      respName: "prefr",
      type: "pl",
      imageUrl: prefr,
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/prefr",
      offerConfig: {
        redUrl: "reponse.pwa",
        displayText: "You have an offer!!",
        successCondition: (response) => response === "success",
      },
    },
    {
      name: "RamFin",
      respName: "ramfin",
      type: "pl",
      imageUrl: ramfin,
      approvalRating: "Excellent",
      loanAmount: "Upto ₹ 5,00,000",
      interestRate: "Starting from 24% to 30%",
      tenure: "Upto 24 months",
      processingFee: "Upto 2.5%",
      features: [
        "No Collateral",
        "Repayment Flexibility",
        "No Usage Restriction",
      ],
      showForm: false,
      formUrl: "/ramfin",
      offerConfig: {
        redUrl: "https://www.ramfincorp.com/",
        displayText: "You have an offer!!",
        successCondition: (response) =>
          response.ramfin.message === "Lead created successfully.",
      },
    },
    {
      name: "SmartCoin",
      respName: "SmartCoin",
      type: "pl",
      imageUrl: SmartCoin,
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/smartcoin",
      offerConfig: {
        redUrl: "https://www.olyv.co.in/",
        displayText: "You have an offer!!",
        successCondition: (response) => {
          console.log(response);
          response.reason === "customer lead updated";
          return false;
        },
      },
    },
    {
      name: "Upwards Marketplace",
      respName: "upwards",
      imageUrl: Upwards,
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/upwards",
      offerConfig: {
        redUrl: "redirectionUrl",
        displayText: "You have an offer!!",
        successCondition: (response) => {
          console.log(response);
          response.reason === "customer lead updated";
          return true;
        },
      },
    },
    {
      name: "Upwards",
      respName: "upwards",
      imageUrl: Upwards,
      approvalRating: "Good",
      loanAmount: "Upto ₹ 3,00,000",
      interestRate: "Starting from 22% to 28%",
      tenure: "Upto 18 months",
      processingFee: "Upto 2%",
      features: ["No Collateral", "Flexible Repayment", "No Usage Restriction"],
      showForm: false,
      formUrl: "/upwards",
      offerConfig: {
        redUrl: "redirectionUrl",
        displayText: "You have an offer!!",
        successCondition: (response) => {
          console.log(response);
          response.reason === "customer lead updated";
          return true;
        },
      },
    },
    {
      name: "Zype",
      respName: "zype",
      type: "pl",
      imageUrl: zype,
      approvalRating: "Excellent",
      loanAmount: "Upto ₹ 5,00,000",
      interestRate: "Starting from 24% to 30%",
      tenure: "Upto 24 months",
      processingFee: "Upto 2.5%",
      features: [
        "No Collateral",
        "Repayment Flexibility",
        "No Usage Restriction",
      ],
      showForm: false,
      formUrl: "/zype",
      offerConfig: {
        redUrl: "https://www.getzype.com/",
        displayText: "You have an offer!!",
        successCondition: (response) => {
          console.log(response);
          response.reason === "customer lead updated";
          return false;
        },
      },
    },
  ];

  useEffect(() => {
    const fetchUserIdFromCookiesAndLenderData = async () => {
      const userData = Cookies.get("userId");

      if (userData) {
        setUser(userData);
        console.log("User ID from cookies:", userData);

        setLoading(true);

        try {
          const response = await axios.post(
            "https://credmantra.com/api/v1/auth/get-lenders",
            { userId: userData }
          );
          console.log(response.data, "tytu");

          if (response.data && Array.isArray(response.data.data)) {
            const apiNames = response.data.data.map((name) =>
              name.trim().toLowerCase()
            );
            const matchedLenders = leandersdetails.filter((lender) =>
              apiNames.includes(lender.name.trim().toLowerCase())
            );

            setFilteredLenders(matchedLenders);
            console.log("Matched Lenders:", matchedLenders);
          } else {
            console.error("Unexpected API response format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching lender data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserIdFromCookiesAndLenderData();
  }, []);

  const handleLenderApply = async (lender) => {
    const userId = Cookies.get("userId");
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    console.log(lender, userId);

    try {
      const response = await axios.post(
        "https://credmantra.com/api/v1/leads2/inject_by_id",
        { lenders: [lender], userId: userId },
        {
          headers: {
            "x-api-key": "vs65Cu06INTER1GB2qSdJejP",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const lenderResponse = response.data[respName];
      console.log(lenderResponse.redirectUrl);
      if (lenderResponse?.redirectUrl) {
        window.location.href = lenderResponse.redirectUrl;
      } else {
        setError("No offer available");
        setTimeout(() => setError(null), 5000);
      }
    } catch (error) {
      setError("An error occurred while processing your application");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center items-center h-auto ml-[15%]">
      <div className="flex items-center text-4xl font-semibold justify-center mt-3">
        <GiMoneyStack />
        <h1 className="mx-2">Select a Lender</h1>
        <GiMoneyStack /> <br />
      </div>
      <p className="text-2xl mt-[1.3%]">
        Here are the offers that will best suit your needs.
      </p>
    
      
        {

        
  
        leandersdetails.map((lender, index) => (
          <div
          className="sm:w-[97%]  h-[23vh] w-[90%] sm:h-[40vh] mt-[2%] border border-gray-800 rounded-2xl items-center text-center mb-[2%] "
          style={{ justifySelf: "center" }}
          key={index}
        >
          <div className=" flex sm:w-full h-[20%] w-[20%] sm:h-[25vh] mt-[3%] rounded-lg sm:justify-around text-gray-600 space-y-2 space-x-4 sm:space-x-0 ">
            <img
              src={lender.imageUrl}
              alt="Safety List"
              className="sm:h-[86%] sm:w-[16%] h-full w-full ml-1 sm:ml-0 mt-3 sm:mt-0 "
            />
            <div className="text-center">
              <h2 className="text-[10px] sm:text-lg">Approval Rating</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">
                  {lender.approvalRating}
                </h2>
                <img
                  src={meter}
                  alt="Meter"
                  className="sm:h-5 sm:w-7 sm:mt-1 h-3 w-5 "
                />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-[10px] sm:text-lg">Loan Amount</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">
                  {lender.loanAmount}
                </h2>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-[10px] sm:text-lg">Interest Rate</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">
                  {lender.interestRate}
                </h2>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-[10px] sm:text-lg">Tenure</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">{lender.tenure}</h2>
              </div>
            </div>

            <div className="text-center ">
              <h2 className="text-[10px] sm:text-lg">Processing Fee</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">
                  {lender.processingFee}
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full h-0.5 bg-transparent border-t-2 border-dotted sm:mt-0 mt-[20%] border-gray-500"></div>

          <div
            className="flex sm:justify-around mt-4"
            style={{ justifyItems: "center" }}
          >
            <div className="flex text-center sm:space-x-5">
              {lender.features.map((feature, idx) => (
                <div className="flex" key={idx}>
                  <GrDocumentConfig className="mt-1" />
                  
                  <h2 className="text-[10px] sm:text-lg">{feature}</h2>
                </div>
              ))}
            </div>
            <button
              className="h-[35px] border w-[25%] mr-3 sm:mr-0 text-[13px] sm:text-[17px] sm:w-[20%] bg-sky-400 text-white font-bold rounded-lg hover:bg-sky-800 flex items-center justify-center "
              onClick={() => handleLenderApply(lender)}
            >
              <Link to={lender.formUrl}>Apply Now</Link>
            </button>
          </div>
        </div>
         
        ))
          
      }
      
    </div>
  );
};

export default LenderList;