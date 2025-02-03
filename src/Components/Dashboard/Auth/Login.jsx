import React, { useState, useEffect } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie"
// import logo from "../../assets/logo.png"

const Login = ({ onAuthToggle }) => {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [countdown, setCountdown] = useState(60);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [error , setError] = useState({})
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    username: "",
  });


  const navigate = useNavigate();
  
  const isOtpFilled = otp.every((value) => value !== "");

  
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);


  const handleInputChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  // Handle OTP input change
  const handelChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus the next input if not the last field
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };


  const handelKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1);
      setCountdown(30);
      toast.success("OTP resent successfully!");
    } else {
      toast.error("You have exceeded the maximum OTP resend attempts.");
    }
  };

  // Verify OTP
  


  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
  
    if (otpValue.length < 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }
  
    setIsLoader(true); 
    try {
      console.log(otp)
      const response = await axios.post(
        "http://localhost:3000/verify-otp",
        {
          phone: formData.phone,
          otp: otpValue,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
        console.log(response)
     
      if (response.status === 200) {
        const { token, userId, message } = response.data;
        
        Cookies.set("userToken", token, {
          secure: true,
          sameSite: "Strict",
          expires: 1, 
        });
        Cookies.set("userId", userId, {
          secure: true,
          sameSite: "Strict",
          expires: 1,
        });
  
        console.log("User ID:", userId);
  
        toast.success(message || "OTP verified successfully!");
        navigate("/board");
      } else {
        toast.error(response.data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(
        error.response?.data?.message || "Failed to verify OTP. Please try again."
      );
    } finally {
      setIsLoader(false); 
    }
  };
  

  const handleSendOtpClick = async () => {
    const newErrors = {}
    if(!formData.email)newErrors.email = "email is required"
    if(!formData.phone)newErrors.phone = "phone is required"
    if(!formData.username)newErrors.username = "username is required"
    if(!formData.password)newErrors.password = "password is required"
     if(Object.keys(newErrors).length === 0){
    setIsLoader(true);
    try {
      const response = await axios.post("http://localhost:3000/generate-otp", {
        phone: formData.phone,
      });
      console.log(response.data);
      console.log(formData)
      setIsOnScreen(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error sending OTP");
    }
  }
}


  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCountdownComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [retryCount]);

  // const handleResendOtp = async () => {
  //   if (retryCount < 5) {
  //     try {
  //       const response = await axios.post(
  //         "https://credmantra.com/api/v1/auth/resend-otp",
  //         {
  //           phone: phone,
  //         }
  //       );
  //       console.log(response);
  //       toast.success(`OTP resent successfully your number ${phone}`);
  //     } catch (error) {
  //       toast.error(error);
  //       console.log(error);
  //     }
  //     setCountdown(60);
  //     setIsCountdownComplete(false);
  //     setOtp(new Array(4).fill(""));
  //     setRetryCount((prev) => prev + 1);
  //   } else {
  //     toast.error("You have exceeded the maximum OTP resend attempts.");
  //   }
  // };

  return (
    <>
     <div className="justify-center flex">
        {isOnScreen ? (
          <>
        <div className="sm:h-[80vh] h-[48vh]  w-[63%] sm:w-[35%] border ml-0 sm:ml-[30%] mt-[4%]  bg-white  shadow-lg  items-center">
            <div className="h-[12%] flex justify-around">
              <h1 className="font-bold text-xl mt-5" >CM Partner Portel</h1>
              </div>
              <div className="h-[60%] w-full mt-[32%]">
                <div className="text-center ">
                  <h4 className="font-bold text-sky-600 text-lg">WELCOME</h4>
                  <h6 className="font-medium text-xs md:text-sm">
                    AUTHORIZATION IS REQUIRED TO YOU <br /> TO GET IN.
                  </h6>
                </div>
                <div className="flex justify-center mt-4 space-x-3">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      className="h-12 w-10 border text-center text-xl  font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => handelChange(e, index)}
                      onKeyDown={(e) => handelKeyDown(e, index)}
                      maxLength={1}
                      value={value}
                    />
                  ))}
                </div>
                <div className="text-center mt-5">
                  {isCountdownComplete && !isOtpFilled ? (
                    <button
                      className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <button
                      className={`${
                        isOtpFilled
                          ? "bg-green-600 hover:bg-green-800"
                          : "bg-gray-400 cursor-not-allowed"
                      } text-white font-bold py-2 px-4 rounded-full`}
                      onClick={handleVerifyOtp}
                      disabled={!isOtpFilled}
                    >
                      Submit
                    </button>
                  )}
                  {countdown > 0 && (
                    <p className="text-sm mt-3 text-gray-500">{`Resend your OTP in ${countdown}s`}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-4">
                    {retryCount < 5
                      ? `You have ${5 - retryCount} OTP resend attempts left.`
                      : "You have exceeded the maximum OTP resend attempts."}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="sm:h-[80vh] h-[48vh]  w-[63%] sm:w-[35%] border ml-0 sm:ml-[30%] mt-[4%]  bg-white  shadow-lg  items-center">
              <div className="h-[12%] text-center ">
              <h1 className="font-bold text-xl mt-5" >CM Partner Portel</h1>
              </div>
            <div className="mt-3 text-center ">
              <h1 className="text-4xl font-bold ">LOGIN</h1>
            </div>

            <div className=" mt-5">
              <div className="ml-3">
                <p className="text-[14px]">Email Address</p>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className={`h-11 p-2 border w-[90%] rounded shadow ${error.email ? "border-red-500" : "border-gray-300"}`}
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {
                  error.email && (<p className="text-red-500">{error.email}</p>)
                }
              </div>
              <div className="flex ml-3 mt-3">
                <div className=" ">
                  <p className="text-[14px]">Username</p>
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    className="h-11 p-2 border w-[97%] rounded shadow"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <p className="text-[14px]">Phone</p>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="mobileNumber"
                    className="h-11 p-2 border w-[97%] rounded shadow"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="ml-3 mt-3">
                <p className="text-[14px]">Password</p>
                <input
                  type="text"
                  placeholder="Enter your Password"
                  required
                  className="h-11 p-2 border w-[90%] rounded shadow"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              className="h-11 rounded-md w-[90%] mt-7 ml-3 border bg-sky-600 text-white font-semibold hover:bg-sky-800"
              onClick={handleSendOtpClick}
            >
              LOGIN
            </button>
            <div className="flex justify-around mt-2">
<p className="text-md " >login as a <span className="text-blue-600 hover:cursor-pointer font-semibold"> <Link to="/loginPartner" >Partner</Link> </span>?</p>
<p className="text-md " >login as a <span className="text-blue-600 hover:cursor-pointer font-semibold"><Link to="/loginInd" >Individual</Link> </span>?</p>
      </div>
          </div>
          
        )}
      </div>

    </>
  );
};

export default Login;
