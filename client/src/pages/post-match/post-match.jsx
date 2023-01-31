import { useStore } from "../../store/store";
import AppNavBar from "../../components/appnavbar.jsx";
import RatingBox from "../../components/ratingbox/ratingbox.jsx";
import { useNavigate } from "react-router";
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "../post-match/post-match.css";
import * as ReactBootstrap from "react-bootstrap";

function PostMatchPage({PostWeek}) {
    const [matchDetails, setMatchDetails] = useState([]);
    const [loading,setLoading] = useState(false);

    const getMatchDetails = async() => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/matches/getMatchDetails/${PostWeek}`)
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
            <AppNavBar/>
            <div>
                <h1 style={{textAlign: "center", margin: "2em 0em 1em 0em"}}>Post-Match Rating for Week {PostWeek}</h1>
            </div>
            {loading && matchDetails ?
                <div className="matches">
                {matchDetails.map((singleMatchDetails) => {
                    return(<RatingBox key={singleMatchDetails._id} matchData={singleMatchDetails}/>)
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

export default PostMatchPage