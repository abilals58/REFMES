import React from 'react'
import { useState,useEffect } from 'react';
import PreMatchPage from './pre-match';
import * as ReactBootstrap from "react-bootstrap";
import axios from 'axios';
function Prematchlanding() {
    const [preWeek,setpreWeek]=useState();
    const [loading,setLoading] = useState(false);
    const getPreWeek= async()=>{
        await axios
            .get(`${process.env.REACT_APP_URL}/api/weeks/getPreWeek`)
            .then(res => {
                setpreWeek(res.data)
                setLoading(true);
        }).catch(err => console.log(err));
    }
useEffect(() => {
  getPreWeek();
},[])
  return (
    <>
    {loading ? 
    <PreMatchPage PreWeek={preWeek.week_no} /> :
    <div className="d-flex justify-content-center">
      <ReactBootstrap.Spinner animation="border"/>
    </div>
    }
    </>
  )
}

export default Prematchlanding;