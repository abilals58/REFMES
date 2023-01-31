import React, { useEffect, useState } from "react";
import "./adminUpdatePostWeek.css";
import AppNavBarSingle from "../../components/appnavbarsingle.jsx";
import * as ReactBootstrap from "react-bootstrap";
import axios from "axios";
import AdminEnterResult from "./enterResult";
import AdminPostWeekSummary from "../../components/adminPostFinal/adminPostWeekSummary";

function AdminUpdatePostWeekPage(){
    const [loading, setLoading] = useState(false);
    const [preWeekNo, setPreWeekNo] = useState(0);
    const [postWeekNo, setPostWeekNo] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [page, setPage] = useState(0);
    const FormTitles=["Match Results","Final Summary"]
    const [formData,setFormData]=useState({
        resultList: [],
        nextButton:true,
        prevButton:false
    });


    const getCurrentinfos = async() => {
        await axios.all([
            axios.get(`${process.env.REACT_APP_URL}/api/weeks/getPreWeek`),
            axios.get(`${process.env.REACT_APP_URL}/api/weeks/getPostWeek`),
        ]).then(axios.spread((res1, res2) => {
            setPreWeekNo(res1.data.week_no);
            setPostWeekNo(res2.data.week_no);
            if (res1.data.week_no - res2.data.week_no >= 1) {setIsValid(true);}
            setLoading(true);
        })).catch(err => console.log(err));
    };
    useEffect(() => {
        getCurrentinfos();
    }, []);

    const PageDisplay=()=>{
        if(page === 0) {
            return <AdminEnterResult PostWeek={postWeekNo} formData={formData} setFormData={setFormData} />
        }  
        else {
            return <AdminPostWeekSummary PostWeek={postWeekNo} formData={formData} setFormData={setFormData}/>
        }
    }
    return(
        <div>
            <AppNavBarSingle/>
            <div>
                <div className=" pt-3 d-flex justify-content-center row">
                    <div className="admin-preweek-progress-bar">
                        <div
                            style={{ width: page === 0 ? "50%" :  "100%" }}>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 style={{textAlign: "center", marginTop: "0.5em"}}>Admin Update Post Week</h5>
                    <h1 style={{textAlign: "center", margin: "0.75em 0"}}>{FormTitles[page]}</h1>
                </div>
                {loading 
                    ?
                    <>
                    {isValid 
                        ?
                        <div style={{textAlign: "center"}}>
                            {PageDisplay()}
                            <div className="admin-form-container-footer" style={{margin: "2em 0"}}>
                                <button disabled={page === 0} onClick={()=>{setPage((currPage)=>currPage-1)}} >Prev</button>
                                <button 
                                disabled={page==0 ? false: true}  
                                onClick={()=>{setPage((currPage)=>currPage+1)}}>Next
                                </button>
                            </div>
                        </div>
                        :
                        <div style={{textAlign: "center"}}>
                            <p className="post-consistent-text-error">Week values creates an inconsistency when performs this update, first update pre-week, please!</p>
                        </div>
                    }
                    </>
                    :
                    <div className="d-flex justify-content-center">
                        <ReactBootstrap.Spinner animation="border"/>
                    </div>
                }
            </div>
        </div>

    );
}
export default AdminUpdatePostWeekPage;