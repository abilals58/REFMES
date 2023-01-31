import React from 'react'
import AdminRefSelect from './adminRefSelect';
import { useEffect, useState } from "react";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
function RefereeOfWeek({FormData,setFormData}) {
  const [week, setweek] = useState();
  const [loading,setLoading] = useState(false);
  const [allData, setallData] = useState([]);
  const getDetails = async() => {
    await axios.all([
      axios.get(`${process.env.REACT_APP_URL}/api/weeks/getWeek`),
      axios.get(`${process.env.REACT_APP_URL}/api/referees/getAllref`)
    ])
    .then(axios.spread((res1, res2) => {
      setallData(res2.data);
      setweek(res1.data.week_no);
      setLoading(true);
  
    })).catch(err => console.log(err));
  };
  useEffect(() => {
    getDetails();
},[])
 
  return (
    <>
    {loading ?
      <>
      <h1 className="selectRefh1"> SELECT THE REFEREES OF THE WEEK {parseInt(week)+1}: </h1>
      <AdminRefSelect FormData={FormData} setFormData={setFormData} currentweek= {parseInt(week)+1} allData={allData}/>
      </>
        :
        <div className="d-flex justify-content-center">
          <ReactBootstrap.Spinner animation="border"/>
        </div>

    }
    </>
  )
}

export default RefereeOfWeek