import React from 'react'
import { useState,useEffect } from 'react';
import PostMatchPage from './post-match';
import * as ReactBootstrap from "react-bootstrap";
import axios from 'axios';
function Postmatchlanding() {
    const [postWeek,setpostWeek]=useState();
    const [loading,setLoading] = useState(false);
    const getPostWeek= async()=>{
        await axios
            .get(`${process.env.REACT_APP_URL}/api/weeks/getPostWeek`)
            .then(res => {
                setpostWeek(res.data)
                setLoading(true);
        }).catch(err => console.log(err));
    }
useEffect(() => {
  getPostWeek();
},[])
  return (
    <>
    {loading ? 
    <PostMatchPage PostWeek={postWeek.week_no-1}/>
    :
    <div className="d-flex justify-content-center">
      <ReactBootstrap.Spinner animation="border"/>
    </div>
    }
    </>
  )
}

export default Postmatchlanding;