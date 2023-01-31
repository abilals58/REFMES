import React, { useState, useEffect } from "react";
import Rater from 'react-rater';
import axios from "axios";
import { useStore } from "../../store/store";
import "../ratingbox/observerratingbox.css";
import 'react-rater/lib/react-rater.css';
import findLogo from "../clubLogos/clubLogos";

  function ObserverRatingBox({matchData}){

    const [state] = useStore();
    const {observer:CurrentObserver} = state;

    const [rating, setRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isInteractive, setIsInteractive] = useState(true);
    const [btnValue, setBtnValue] = useState("Submit");
    const [ratingEntered, setRatingEntered] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            setRatingEntered(false);
        } else {
            setRatingEntered(true);
            const newObserverRating = {rating: rating, observer_id: CurrentObserver.observer.id, match_id: matchData._id, ref_id:matchData.referee_id, week_no: matchData.week_no};
            axios
                .post(`${process.env.REACT_APP_URL}/api/postRatings/addObserverRating`, newObserverRating)
                .then((res) => {
                    if (res.status === 200 && res.data.message) {
                        setErrorMessage(res.data.message);
                    } else if (res.status === 200) {
                        setErrorMessage("Your rating submitted successfully");
                    } else {
                        setErrorMessage("Error! Please try again.");
                    }
                }).catch((err) => {
                    setErrorMessage("Error! Please try again.");
                });

            axios
                .post(`${process.env.REACT_APP_URL}/api/postRatings/findAndUpdateRef`, newObserverRating)
                .then((res) => {

                    console.log("res", res);

                }).catch((err) => {
                    console.log("Error: ", err);
                    setErrorMessage("Error! Please try again.");
                });
        }
    }

    const getCurrentObserverRating = async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/api/postRatings/getObserverRating/${matchData._id}/${CurrentObserver.observer.id}`).then(res => {
            setRating(res.data);
            if (res.data.length === 0) {
                console.log("Empty");

            } else {
                setRating(res.data[0].rating);
                setIsInteractive(false);
                setBtnValue("Saved");
                setBtnDisabled(true);
            }
        }).catch(err => console.log(err))
    };
   

    useEffect(() => {
        getCurrentObserverRating();
    }, []);

    //console.log("ref info",matchData.ref_info );
    return(
    <>
        {matchData.ref_info[0] ?
        <div className="observer-rating-outer-container">
        <div className="observer-rating-container">
            <div className="observer-rating-left">
                <div className="observer-rating-left-match">
                    <div className="observer-rating-team">
                        <img alt="Homeclub" src={findLogo(matchData.club1_info[0].name)}/>
                        <a>{matchData.club1_info[0].name} <b>({matchData.club1_goals})</b></a>
                    </div>
                    <a> vs. </a>
                    <div className="observer-rating-team">
                        <img alt="Awayclub" src={findLogo(matchData.club2_info[0].name)}/>
                        <a>{matchData.club2_info[0].name} <b>({matchData.club2_goals})</b></a>
                    </div>
                </div>
            </div>
            <div className="observer-rating-right">
                <div className="observer-rating-right-referee"><a href={`../referee/${matchData.ref_info[0].r_username}`}><b>{matchData.ref_info[0].name}</b></a></div>
                <Rater onRate={({rating}) => {setRating(rating); setRatingEntered(true);}} total={5} rating={rating} interactive={isInteractive}/>
                {ratingEntered ? <></> : <div className="observer-rating-right-error"><a>Choose a rating, please!</a><br/></div>}
            </div>
            <div className="observer-rating-submit">
            <form onSubmit={handleSubmit}>
                <input type="submit" name="submitButton" disabled={btnDisabled} className="btn btn-success" value={`${btnValue}`}/>
            </form>
            </div>
        </div>
    </div>
    :
    <p>No Referee</p>
    }
    </>
    )

  }
export default ObserverRatingBox

