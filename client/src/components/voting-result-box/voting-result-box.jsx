import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../voting-result-box/voting-result-box.css";
import 'react-rater/lib/react-rater.css';
import findLogo from "../clubLogos/clubLogos";
import * as ReactBootstrap from "react-bootstrap";
import axios from "axios";

function VotingResultBox({ matchData}) {
    const [hasRefInfo, setHasRefInfo] = useState(matchData.referee_id ? true : false);
    const [refRatio,setRefRatio]=useState(0);
    
    const[loading,setLoading] = useState(false);
    var currentdate=new Date().getFullYear()
    const getRefmesrating=async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/api/admin/getRefmesRatingWeights`).then(res=>{
            var wConstant=parseFloat(res.data.wConstant)
            var wExperience= parseFloat(res.data.wExperience)
            var wFan=parseFloat(res.data.wFan)
            var wObserver=parseFloat(res.data.wObserver)
            var mydate= matchData.ref_info[0].first_super_date.split(".")
            var experience=currentdate-parseInt(mydate[2])
        
            var observerRate=matchData.ref_info[0].observerRating[0][1]===0 ? 0 : (matchData.ref_info[0].observerRating[0][0])/(matchData.ref_info[0].observerRating[0][1])
            var FanRate=matchData.ref_info[0].preRating[0][1]===0 ? 0 : (matchData.ref_info[0].preRating[0][0])/(matchData.ref_info[0].preRating[0][1])
            var total=(wConstant) +(observerRate*20)* wObserver + (FanRate*20)* wFan + (experience)* wExperience
            var ratio=(total/20).toFixed(2);
            setRefRatio(ratio);
            setLoading(true)

        })
    }
    useEffect(() => {
     getRefmesrating();
    }, [])

    return (
        <>
        {loading ?
        <div className="voting-result-box-outer-container">
            <div className="voting-result-box-inner-container">
                <div className="voting-result-box-inner-left">

                    <div className="voting-result-box-inner-left-name">
                        <p>{matchData.club1_info[0].name}</p>
                    </div>

                    <div className="voting-result-box-inner-left-image">
                        <img alt="Homeclub" className="voting-result-box-inner-left-club-img" src={findLogo(matchData.club1_info[0].name)}/>
                    </div>

                    <div className="voting-result-box-inner-left-score">
                        <p>-</p>
                    </div>

                </div>
                <div className="voting-result-box-inner-right">

                    <div className="voting-result-box-inner-right-score">
                        <p>-</p>
                    </div>

                    <div className="voting-result-box-inner-right-image">
                        <img alt="Awayclub" className="voting-result-box-inner-right-club-img" src={findLogo(matchData.club2_info[0].name)}/>
                    </div>

                    <div className="voting-result-box-inner-right-name">
                        <p>{matchData.club2_info[0].name}</p>
                    </div>

                </div>
            </div>
            <div className="voting-result-box-middle-container">
                <div className="voting-result-box-middle-referee">
                    {hasRefInfo ?
                        <div><b>Referee:</b> <Link className="voting-result-box-middle-link" to={`../referee/${matchData.ref_info[0].r_username}`}>{matchData.ref_info[0].name}</Link></div>
                        :   
                        <p>Referee is not assigned yet.</p>
                    }
                </div>
            </div>
            <div className="voting-result-box-bottom-container">
                <div className="voting-result-box-display-text">
                    <div className="voting-result-box-point-circle">REFMES Score: {refRatio}</div>
                </div>
            </div>
        </div>
        :
        <div className="d-flex justify-content-center">
            <ReactBootstrap.Spinner animation="border"/>
        </div>
        }
        </>
    );
  }
  export default VotingResultBox;