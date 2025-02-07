import { createContext, useEffect , useState } from "react";
import axios from "axios";

export const ThemeContext = createContext(null); 

export const ThemeProvider = (props) => {
    const [allData, setAllData] = useState("");
    useEffect(  ()=>{
        const getdata = async ()=>{
          const fetchData =await axios.get('http://localhost:3000/getAllData/partners/leads')
        setAllData(fetchData.data)
        console.log(allData)  
        }
        getdata()
        
      },[])

 

  return <ThemeContext.Provider value={{allData , setAllData }} >{props.children}</ThemeContext.Provider>;
};
