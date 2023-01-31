import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchBoxAdvanced from "../../components/matchbox/matchboxAdvanced.jsx"
import * as ReactBootstrap from "react-bootstrap";
import "../single-match/single-match.css";

function SingleMatchInnerPage({ matchID, currentWeekNo }) {

    const [matchDetails, setMatchDetails] = useState([]);
    const [loading,setLoading] = useState(false);
    const [playedWeek, setPlayedWeek] = useState(false);
    const [weekNo, setWeekNo] = useState(3);

    const getSingleMatchDetails = async() => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/matches/getSingleMatchDetails/${matchID}`)
            .then(res => {
                if (res.data) {
                    setMatchDetails((res.data ?? [])[0]);
                    setWeekNo(res.data.week_no);
                }
                setLoading(true);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getSingleMatchDetails();
        if (parseInt(currentWeekNo) > parseInt(weekNo)) {
            setPlayedWeek(true);
        } else {
            setPlayedWeek(false);
        }
    }, []);

    return(
        <div style={{width: "100%"}}>
            {loading ?
                <MatchBoxAdvanced matchData={matchDetails} playedWeek={playedWeek}/>
                :
                <div className="d-flex justify-content-center">
                    <ReactBootstrap.Spinner animation="border"/>
                </div>
            }
        </div>
    )
}
export default SingleMatchInnerPage