import React, { useCallback, useState, useEffect } from "react";
import Rater from 'react-rater';
import { Link } from "react-router-dom";
import axios from "axios";
import { useStore } from "../../store/store";
import "../ratingbox/ratingbox.css";
import 'react-rater/lib/react-rater.css';
import logoFenerbahce from '../../logos/fenerbahce.png';
import logoGalatasaray from '../../logos/galatasaray.png';
import logoBesiktas from '../../logos/besiktas.png';
import logoBasaksehir from '../../logos/basaksehir.png';
import logoAdanaDemirspor from '../../logos/adana_demirspor.png';
import logoKonyaspor from '../../logos/konyaspor.png';
import logoHatayspor from '../../logos/hatayspor.png';
import logoGiresunspor from '../../logos/giresunspor.png';
import logoAlanyaspor from '../../logos/alanyaspor.png';
import logoSivasspor from '../../logos/sivasspor.png';
import logoAntalyaspor from '../../logos/antalyaspor.png';
import logoGaziantepFK from '../../logos/gaziantep_fk.png';
import logoUmraniyespor from '../../logos/umraniyespor.png';
import logoIstanbulspor from '../../logos/istanbulspor.png';
import logoKasimpasa from '../../logos/kasimpasa.png';
import logoAnkaragucu from '../../logos/ankaragucu.png';
import logoTrabzonspor from '../../logos/trabzonspor.png';
import logoKaragumruk from '../../logos/karagumruk.png';
import logoKayserispor from '../../logos/kayserispor.png';

const clubs = [
    { name: "Fenerbahçe", src: logoFenerbahce},
    { name: "Galatasaray", src: logoGalatasaray},
    { name: "Beşiktaş", src: logoBesiktas},
    { name: "Başakşehir", src: logoBasaksehir},
    { name: "Adana Demirspor", src: logoAdanaDemirspor},
    { name: "Konyaspor", src: logoKonyaspor},
    { name: "Hatayspor", src: logoHatayspor},
    { name: "Giresunspor", src: logoGiresunspor},
    { name: "Alanyaspor", src: logoAlanyaspor},
    { name: "Sivasspor", src: logoSivasspor},
    { name: "Antalyaspor", src: logoAntalyaspor},
    { name: "Gaziantep FK", src: logoGaziantepFK},
    { name: "Ümraniyespor", src: logoUmraniyespor},
    { name: "İstanbulspor", src: logoIstanbulspor},
    { name: "Kasımpaşa", src: logoKasimpasa},
    { name: "Ankaragücü", src: logoAnkaragucu},
    { name: "Trabzonspor", src: logoTrabzonspor},
    { name: "Karagümrük", src: logoKaragumruk},
    { name: "Kayserispor", src: logoKayserispor},
  ]

function RatingBox({ matchData }) {

    const [state, dispatch] = useStore();
    const {user:currentUser} = state;
    const [rating, setPostRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isInteractive, setIsInteractive] = useState(true);
    const [btnValue, setBtnValue] = useState("Submit");
    const [ratingEntered, setRatingEntered] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const monthSet = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(rating);
        if (rating === 0) {
            setRatingEntered(false);
        } else {
            setRatingEntered(true);
            const newPostRating = {rating: rating, user_id: currentUser.user.id, match_id: matchData._id, referee_id:matchData.referee_id, week_no:matchData.week_no};
            await axios.all([
                axios.post(`${process.env.REACT_APP_URL}/api/postRatings/addPostRating`, newPostRating),
                axios.post(`${process.env.REACT_APP_URL}/api/postRatings/refereeAddPostRating`, newPostRating),
              ])
              .then(axios.spread((res1, res2) =>    {
                console.log("Stattus:",res1.status,res2.status);
                 if (res1.status === 200 && res2.status===200) {
                    setErrorMessage("Your rating submitted successfully");
                    const date = new Date();
                    setDay(date.getDate());
                    setMonth(monthSet[date.getMonth()]);
                    setYear(date.getFullYear());
                    setIsInteractive(false);
                    setBtnValue("Saved");
                    setBtnDisabled(true);
                } else {
                    console.log("elsedeyim");
                    setErrorMessage("Error! Please try again.");
                    setBtnValue("Save");
                    setBtnDisabled(false);
                }
            
              })).catch(err =>{
                console.log("Error: ", err);
                setErrorMessage("Error! Please try again.");
            });
        }
    }

    const getCurrentPostRating = async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/api/postRatings/getPostRating/${matchData._id}/${currentUser.user.id}`).then(res => {
            if (res.data.length === 0) {

            } else {
                setPostRating(res.data[0].rating);
                const date = new Date(res.data[0].date);
                setDay(date.getDate());
                setMonth(monthSet[date.getMonth()]);
                setYear(date.getFullYear());
                setIsInteractive(false);
                setBtnValue("Saved");
                setBtnDisabled(true);
            }
        }).catch(err => console.log(err))
    };

    useEffect(() => {
        getCurrentPostRating();
    }, []);
    //console.log(matchData);
    return (
        <>
        { matchData.ref_info[0] ?
         <div className="rating-outer-container">
            <div className="rating-container">
                <div className="rating-left">
                    <div className="rating-left-match">
                        <div className="rating-team">
                            <a href={`../club/${matchData.club1_info[0].asci_name}`}>{matchData.club1_info[0].name} </a>
                            <img alt="Homeclub" src={(clubs.find(({name})=>name === matchData.club1_info[0].name)).src}/>
                            <div className="rating-team-score-box">
                                <b>{matchData.club1_goals}</b>
                            </div>
                        </div>
                        <div className="rating-team-middle">
                        <p >-</p>
                        </div>
                        <div className="rating-team">
                            <div className="rating-team-score-box">
                                <b>{matchData.club2_goals}</b>
                            </div>
                            <img alt="Awayclub" src={(clubs.find(({name})=>name === matchData.club2_info[0].name)).src}/>
                            <a href={`../club/${matchData.club2_info[0].asci_name}`}>{matchData.club2_info[0].name} </a>
                        </div>
                    </div>
                </div>
                <div className="rating-right">
                    <div className="rating-right-referee"><a href={`../referee/${matchData.ref_info[0].r_username}`}><b>{matchData.ref_info[0].name}</b></a></div>
                    <Rater onRate={({rating}) => { console.log(rating); setPostRating(rating); setRatingEntered(true);}} total={5} rating={rating} interactive={isInteractive}/>
                    {isInteractive ? <></> : <div className="rating-right-date">{month} {day}, {year}</div>}
                    {ratingEntered ? <></> : <div className="rating-right-error"><a>Choose a rating, please!</a><br/></div>}
                    <p className="rating-box-post-error-msg">{errorMessage}</p>
                </div>
                <div className="rating-submit">
                <form onSubmit={handleSubmit}>
                    <input type="submit" name="submitButton" disabled={btnDisabled} className="btn btn-success" value={`${btnValue}`}/>
                </form>
                </div>
            </div>
            <div className="rating-comment-container">
                <div className="rating-comment-add-button"><Link to={`../match/${matchData._id}/comment`}>Add Comment</Link></div>
            </div>
        </div>
        :
        <p>No Referee</p>
        }
        </>
    );
  }
  export default RatingBox;