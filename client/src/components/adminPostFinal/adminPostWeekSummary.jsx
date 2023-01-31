import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AdminMatchbox from './adminMatchbox';
import "../adminPreFinalSummary/adminPreFinalSummary.css"

function AdminPostWeekSummary({PostWeek,formData,setFormData}) {
    const[isdisabled,setDisabled]=useState(formData.resultList.length !==9);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(formData.resultList.length !==9 ? "Please enter all match results":"");
    const [btnValue, setBtnValue] = useState("Submit");
    const handleClick=(e)=>{
    const postweekinfo={
        PostWeek:PostWeek
    }
    axios.all([
        axios.post(`${process.env.REACT_APP_URL}/api/admin/updatePostWeek`, postweekinfo),
        axios.post(`${process.env.REACT_APP_URL}/api/admin/updateMatchScore`, formData.resultList)
    ])
    .then(axios.spread((res1,res2) => {
        console.log((res1,res2));
            if (res1.status === 200 && res2.status === 200) {
            setErrorMessage("You have submitted result successfully,redirecting..");
            setDisabled(true)
            setBtnValue("Submitted")
            setTimeout(PreviousPage,3000);
        } else {
            setErrorMessage("Error,try again!");
        }
    })).catch((err) => {
        console.log("Error: ", err);
    });  
}
function PreviousPage() {
    navigate("/admin")
}
  return (
    <div className='container'>
        <div className='row'>
        {formData.resultList.length >0 ?
            formData.resultList.map((item,index)=>{
                return(
                    <div key={index} className='d-flex justify-content-center'>
                        <AdminMatchbox SingleMatchData={item} />
                    </div>
                    )
                }
            )
        :
        <p>You did not enter any result</p>
        }
        </div>
        <div className="d-flex justify-content-center row">
            <button onClick={handleClick} disabled={isdisabled} className="preweek-ref-submit">{btnValue}</button>
            <p className="preweek-ref-error-mes">{errorMessage}</p>
        </div>
    </div>
    
  )
}

export default AdminPostWeekSummary