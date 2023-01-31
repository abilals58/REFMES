  import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminUpdatePreWeek.css";
import AppNavBarSingle from "../../components/appnavbarsingle.jsx";
import AdminRefSelect from "../../components/adminRefSelect/adminRefSelect.jsx";
import AdminRefAssign from "../../components/adminRefAssign/adminRefAssign.jsx";
import AdminPreFinalSummary from "../../components/adminPreFinalSummary/adminPreFinalSummary.jsx";
import * as ReactBootstrap from "react-bootstrap";

function AdminUpdatePreWeekPage(){
    
    const [loading, setLoading] = useState(false);
    const [preWeekNo, setPreWeekNo] = useState(0);
    const [postWeekNo, setPostWeekNo] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [refData, setRefData] = useState({});
    const [page, setPage] = useState(0);
    const FormTitles=["Referees Of Next Week","Assign Referees","Final Summary"]
    const [formData,setFormData]=useState({
        weekReferee: [],
        decidedReferee: [],
        checkedCheckboxes: [],
        assignmentList: [],
        nextButton:true,
        prevButton:false
    });
    
    const getCurrentWeek = async() => {
        await axios.all([
            axios.get(`${process.env.REACT_APP_URL}/api/weeks/getPreWeek`),
            axios.get(`${process.env.REACT_APP_URL}/api/weeks/getPostWeek`),
            axios.get(`${process.env.REACT_APP_URL}/api/referees/getAllref`)
        ]).then(axios.spread((res1, res2, res3) => {
            setPreWeekNo(res1.data.week_no);
            setPostWeekNo(res2.data.week_no);
            if (res1.data.week_no - res2.data.week_no <= 1) {setIsValid(true);}
            setRefData(res3.data);
            setLoading(true);
        })).catch(err => console.log(err));
    };

    useEffect(() => {
        getCurrentWeek();
    }, []);
    

    const PageDisplay=()=>{
        if(page === 0) {
            return <AdminRefSelect currentWeek={preWeekNo} allData={refData} formData={formData} setFormData={setFormData}/>
        } else if (page === 1) {
            return <AdminRefAssign currentWeek={preWeekNo} allData={refData} formData={formData} setFormData={setFormData}/>
        } else {
            return <AdminPreFinalSummary currentWeek={preWeekNo} allData={refData} formData={formData} setFormData={setFormData}/>
        }
    }
   
    return(

        <div>
            <AppNavBarSingle/>
            <div className=" pt-3 d-flex justify-content-center row">
                <div className="admin-preweek-progress-bar">
                <div
                    style={{ width: page === 0 ? "33.3%" : page == 1 ? "66%" :  "100%" }}>
                </div>
                </div>
            </div>
            <div>
                <h5 style={{textAlign: "center", marginTop: "0.5em"}}>Admin Update for Pre-Week</h5>
                <h1 style={{textAlign: "center", margin: "0.75em 0"}}>{FormTitles[page]}</h1>
            </div>
            { loading ?
            <>
                { isValid ?
                <div style={{textAlign: "center"}}>
                    {/* <p>Pre-Week: {preWeekNo} Post-Week: {postWeekNo}</p> */}
                    {PageDisplay()}

                    <div className="admin-form-container-footer" style={{margin: "2em 0"}}>
                        <button name="admin-form-prev-button" disabled={page === 0 || formData.prevButton} onClick={()=>{setPage((currPage)=>currPage-1)}} >Prev</button>
                        <button name="admin-form-next-button"
                        disabled={page==0 ? formData.checkedCheckboxes.length !==9 : (page === 2 || !formData.nextButton)}  
                        onClick={()=>{setPage((currPage)=>currPage+1)}}>Next
                        </button>
                    </div>
                </div>
                :
                <div style={{textAlign: "center"}}>
                    <p className="consistent-text-error">Week values creates an inconsistency when performs this update, first update post-week, please!</p>
                </div>
                }
            </>
            :
            <div className="d-flex justify-content-center">
                <ReactBootstrap.Spinner animation="border"/>
            </div>
            }
        </div>

    );
}
export default AdminUpdatePreWeekPage;