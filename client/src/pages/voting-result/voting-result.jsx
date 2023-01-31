import React from 'react'
import { useState,useEffect } from 'react';
import AppNavBar from "../../components/appnavbar.jsx";
import * as ReactBootstrap from "react-bootstrap";
import VotingResultInner from './voting-result-inner.jsx';
import axios from 'axios';
function VotingResult() {
    const [preWeek,setpreWeek]=useState();
    const [loading,setLoading] = useState(false);
    const getPostWeek= async()=>{
        await axios
            .get(`${process.env.REACT_APP_URL}/api/weeks/getPreWeek`)
            .then(res => {
                setpreWeek(res.data)
                setLoading(true);
        }).catch(err => console.log(err));
    }
useEffect(() => {
  getPostWeek();
},[])
  return (
    <div>
        <AppNavBar/>
        {loading ? 
        <VotingResultInner PreWeek={preWeek.week_no-1}/>
        :
        <div className="d-flex justify-content-center">
            <ReactBootstrap.Spinner animation="border"/>
        </div>
        }
    </div>
  )
}

export default VotingResult