import AppNavBarSingle from "../../components/appnavbarsingle.jsx";
import ObserverRatingBox from "../../components/ratingbox/observerratingbox.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../observer-auth/observerRating.css";
import * as ReactBootstrap from "react-bootstrap";

function ObserverRatingInnerPage({currentWeekNo}) {

    const [matchDetails, setMatchDetails] = useState([]);
    const [loading,setLoading] = useState(false);

    const getMatchDetails = async() => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/matches/getMatchDetails/${currentWeekNo}`)
            .then(res => {
                setMatchDetails(res.data);
                setLoading(true);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getMatchDetails();
    }, []);

    return(
        <div>
            <div>
                <h1 style={{textAlign: "center", margin: "2em 0em 1em 0em"}}>Observer Rating for Week {currentWeekNo}</h1>
            </div>
            {loading && matchDetails ?
                <div className="matches">
                {matchDetails.map((singleMatchDetails) => {
                    return(<ObserverRatingBox key={singleMatchDetails._id} matchData={singleMatchDetails}/>)
                })}
                </div>
                :
                <div className="d-flex justify-content-center">
                    <ReactBootstrap.Spinner animation="border"/>
                </div>
            }
        </div>
    )
}

export default ObserverRatingInnerPage

