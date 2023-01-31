import "./adminForm.css"
import React from "react";
import { useState } from "react";
import RefereeOfWeek from "./refereeOfWeek";
import CurrentWeek from "./currentWeek";
import StopVoting from "./stopVoting";
import FinalSummary from "./finalSummary";

function AdminForm(){
  const[page,setPage]=useState(0);
  const FormTitles=["Current Week Update","Referees Of Next Week","Decide Referees","Final Summary"]
  const [FormData,setFormData]=useState(
    {
      weekReferee:[],
      newWeek:0,
      decidedReferee:[],
      checkedCheckboxes:[],
      nextbutton:true,
      prevbutton:false,
    }
  )
  const PageDisplay=()=>{
    if(page===0)
    {
      return <CurrentWeek FormData={FormData} setFormData={setFormData}/>
    }
    else if(page ===1)
    {
      return <RefereeOfWeek FormData={FormData} setFormData={setFormData}/>
    }
    else if(page ===2)
    {
      return <StopVoting FormData={FormData} setFormData={setFormData}/>
    }
    else
    {
      return <FinalSummary FormData={FormData} setFormData={setFormData}/>
    }
    
  }
    return (
      <div className="admin-week-form">
        <div className="admin-progress-bar">
          <div
            style={{ width: page === 0 ? "25%" : page == 1 ? "50%" : page == 2 ? "75%" : "100%" }}>
          </div>
        </div>
        <div className="admin-form-container">
          <div className="header">
            <h1>{FormTitles[page]}</h1>
          </div>
          <div className="body">
            {PageDisplay()}
          </div>
          <div className="footer">
            <button name="admin-form-prev-button" disabled={page === 0 || FormData.prevbutton} onClick={()=>{setPage((currPage)=>currPage-1)}} >Prev</button>
            <button name="admin-form-next-button" disabled={page === FormTitles.length-1 || !FormData.nextbutton}  onClick={()=>{setPage((currPage)=>currPage+1)}}>Next</button>
          </div>
        </div>

      </div>
    )
  };
  export default  AdminForm;