import React from 'react'
import * as ReactBootstrap from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "./formTabs.css"
function CurrentWeek({FormData,setFormData}) {
  
  const [currentWeekNo, setCurrentWeekNo] = useState(0);
  const [loading,setLoading] = useState(false);
  const [chosenweek,SetChosenWeek]=useState();
  const [errorMessage,setErrorMessage]=useState("Please Enter valid week");
  const getCurrentWeek = async() => {
    await axios
        .get(`${process.env.REACT_APP_URL}/api/weeks/getWeek/`)
        .then(res => {
            setFormData({...FormData,nextbutton:false})
            setCurrentWeekNo(res.data.week_no);
            setLoading(true);
            
    }).catch(err => console.log(err));
};

const checkInput=(e)=>{
  console.log((e.target.value));
 if(e.target.value==="" ||parseInt(e.target.value) < 1 || parseInt(e.target.value)  > 38)
 {
  setFormData({...FormData,nextbutton:false})
  setErrorMessage("Please Enter valid week")
 }
 else{
  setErrorMessage("You can click next Button")
  setFormData({...FormData,nextbutton:true,newWeek:parseInt(e.target.value)})
 }
}

useEffect(() => {
    getCurrentWeek();
},[]);
 console.log(FormData);
  return (
    <>
    {loading ? 
    <div className="currentweek-text-div">
        <p>Next Week will be</p>
        <p>{parseInt(currentWeekNo)+1}. week</p>
        <p className='current-week-headline'>Type your week for referee selection</p>
        <input style={{ fontSize: 15, width: "5em"}} type="number" onChange={(e)=>checkInput(e)}/>
        <p className='current-week-error'>{errorMessage}</p>
    </div>
    :
    <div className="d-flex justify-content-center">
      <ReactBootstrap.Spinner animation="border"/>
    </div>
    }
    </>
  )
}

export default CurrentWeek