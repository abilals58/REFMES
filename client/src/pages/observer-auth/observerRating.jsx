import AppNavBarSingle from "../../components/appnavbarsingle.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../observer-auth/observerRating.css";
import ObserverRatingInnerPage from "./observerRating-inner";
import * as ReactBootstrap from "react-bootstrap";
function ObserverRatingPage() {

    const [currentWeekNo, setCurrentWeekNo] = useState(1);
    const [loading,setLoading] = useState(false);
    const getCurrentWeek = async() => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/weeks/getPostWeek`)
            .then(res => {
                setCurrentWeekNo(res.data.week_no);
                setLoading(true)
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getCurrentWeek();
    }, []);

    return(
        <>
        {loading ? <div>
            <AppNavBarSingle/>
            <ObserverRatingInnerPage currentWeekNo={currentWeekNo-1}/>
        </div> :
        <div className="d-flex justify-content-center">
            <ReactBootstrap.Spinner animation="border"/>
        </div>
        }
        </>
    )

    
}

export default ObserverRatingPage

