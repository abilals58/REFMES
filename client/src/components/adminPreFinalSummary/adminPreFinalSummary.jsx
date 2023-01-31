import React, { useEffect, useState } from "react";
import "../adminPreFinalSummary/adminPreFinalSummary.css";
import * as ReactBootstrap from "react-bootstrap";
import RefAssignBox from "../refAssignBox/refAssignBox.jsx";
import { useNavigate } from "react-router";
import axios from "axios";
function AdminPreFinalSummaryPage ( {currentWeek, allData, formData, setFormData} ){

    const assignmentList=formData.assignmentList;
    const myData=formData.checkedCheckboxes;
    const[isdisabled,setDisabled]=useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [btnValue, setBtnValue] = useState("Submit");
    const handleClick=(e)=>{
    setDisabled(true);
    e.preventDefault();
      var allarray=[];
      for(let i=0; i<formData.checkedCheckboxes.length;i++){
        allarray.push(formData.checkedCheckboxes[i]._id);
        
      }
      const newRefereesOfWeek ={
        week_no: currentWeek+1,
        referee_ids: allarray
      };
     axios.all([
        axios.post(`${process.env.REACT_APP_URL}/api/admin/selectReferee`,newRefereesOfWeek),
        axios.post(`${process.env.REACT_APP_URL}/api/admin/assignReferee`,formData.assignmentList),
        axios.post(`${process.env.REACT_APP_URL}/api/admin/updatePreWeek`,newRefereesOfWeek)])
        .then(axios.spread((res1,res2,res3)=>{
            console.log({res1,res2,res3});
            console.log(res1.status,res2.status,res3.status);
            if (res1.status === 200 && res2.status===200 && res3.status ===200) {
                setErrorMessage("Admin choices have been saved successfully,redirecting..")
                setBtnValue("Saved");
                setDisabled(true);
                setTimeout(PreviousPage,2000);
            } else {
                console.log("elsedeyim");
                setErrorMessage("Error! Please try again.");
                setBtnValue("Save");
                setDisabled(false);
            }
            }))
        .catch(err =>{
            console.log("Error: ", err);
            setErrorMessage("Error! Please try again.");
        });
    }
    function PreviousPage() {
        navigate("/admin")
    }
    return(
        <div  className="container">
            <div className="selectec-ref-text">Assigned Referees for Week {currentWeek}</div>
            <div className="row">
                {assignmentList ?
                (assignmentList.map((item, index) => {
                    return(<RefAssignBox key={index} refereeData={assignmentList[index].refereeDetails} matchData={assignmentList[index].matchDetails} idx={index}/>);
                }))
                :
                <div className="d-flex justify-content-center">
                    <ReactBootstrap.Spinner animation="border"/>
                </div>
                }
            </div>
            <div className="selectec-ref-text">Selected Referees for Week {currentWeek+1}</div>
            <div style={{overflow: "hidden"}} className="row">
                { myData ?
                
                (myData.length > 0 ?
                    myData.map((item) => {
                        return(
                        <div style={{overflow: "hidden"}} key={item.name} className="ck-button-summary col-xs-12 col-sm-6 col-md-4 mt-2 mb-2">
                            <label className="w-100">
                                <p className="w-100 m-0 p-3">{item.name}</p>
                            </label>
                        </div>
                        );
                    })
                    :
                    <div className="d-flex justify-content-center">
                        <ReactBootstrap.Spinner animation="border"/>
                    </div>
                )
                :
                <div className="d-flex justify-content-center">
                    <ReactBootstrap.Spinner animation="border"/>
                </div>
                }
            </div>
            <div className="d-flex justify-content-center row">
                <button onClick={handleClick} disabled={isdisabled} className="preweek-ref-submit">{btnValue}</button>
                <p className="preweek-ref-error-mes">{errorMessage}</p>
            </div>
    </div>
    )
};

export default AdminPreFinalSummaryPage;