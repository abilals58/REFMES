import React from "react";
import AppNavBarSingle from "../../components/appnavbarsingle.jsx";
import { useEffect,useState } from "react";
import axios from "axios";
import '../admin-auth/adminAnswerReports.css';
import ReportBox from "../../components/report/reportBox.jsx";
function AdminAnswerReportsPage(){
    const[allReports,setallReports] = useState([]);
    const[loading,setLoading] = useState(false);
    const getAllReports = async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/api/admin/getAllReports`).then(res=>{
          setallReports(res.data);
          setLoading(true);
      
        }).catch(err => console.log(err))
      };
      useEffect(() => {
        getAllReports();
      }, [])

    return(

        <div>
            <AppNavBarSingle/>
            <div>
                <h1 className="reporth1">Admin Answer Reports Page</h1>
               <div style={{justifyContent:"center"}}>
                { allReports ?
            (allReports.length > 0 ?
              allReports.map((item) => {
                return(<ReportBox key={item._id} reportData={item}/>)
              }) :
                  <div className="justify-content-center">
                      <p>There are no reports</p>
                  </div>)
                  :
            
              <div className="justify-content-center">
                  {loading}
              </div>
                }
                </div>
            </div>
        </div>

    );
}
export default AdminAnswerReportsPage;