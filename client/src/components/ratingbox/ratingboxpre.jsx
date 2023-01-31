import React, { useCallback, useState, useEffect } from "react";
import Rater from 'react-rater';
import { Link } from "react-router-dom";
import axios from "axios";
import { useStore } from "../../store/store";
import "../ratingbox/ratingbox.css";
import "../ratingbox/ratingboxpre.css";
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
import * as ReactBootstrap from "react-bootstrap";

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

function RatingBoxPre({ refereeData,preWeek }) {
    //console.log(refereeData);
    const [state] = useStore();
    const {user:currentUser} = state;
    const [rating, setRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isInteractive, setIsInteractive] = useState(true);
    const [btnValue, setBtnValue] = useState("Submit");
    const [ratingEntered, setRatingEntered] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [loading,setLoading] = useState(false);

    const monthSet = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (rating === 0) {
            setRatingEntered(false);
        } else {
            setRatingEntered(true);
            const newPreRating = {rating: rating, user_id: currentUser.user.id, week_no: preWeek, referee_id: refereeData._id} ;
            await axios.all([
                axios.post(`${process.env.REACT_APP_URL}/api/preRatings/addPreRating`, newPreRating),
                axios.post(`${process.env.REACT_APP_URL}/api/preRatings/refereeAddPreRating`, newPreRating),
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

    const getCurrentPostRating = async()=>   {
        await axios.get(`${process.env.REACT_APP_URL}/api/preRatings/getPreRating/${currentUser.user.id}/${refereeData._id}/${preWeek}`).then(res => {
            if (res.data.length === 0) {
                console.log("Empty");
            } else {
                setRating(res.data[0].rating);
                const date = new Date(res.data[0].date);
                setDay(date.getDate());
                setMonth(monthSet[date.getMonth()]);
                setYear(date.getFullYear());
                setIsInteractive(false);
                setBtnValue("Saved");
                setBtnDisabled(true);
            }
            setLoading(true);
        }).catch(err => console.log(err))
    };

    useEffect(() => {
        getCurrentPostRating();
    }, []);

    return (
        <>
        {loading ? <div className="rating-outer-container-pre">
            <div className="rating-container">
                <div className="rating-left-pre">
                    <div className="rating-left-match">
                        <div className="rating-right-referee" style={{margin: "0"}}><a href={`../referee/${refereeData.r_username}`}><b>{refereeData.name}</b></a></div>
                    </div>
                </div>
                <div className="rating-right-pre">
                    <Rater onRate={({rating}) => {setRating(rating); setRatingEntered(true);}} total={5} rating={rating} interactive={isInteractive}/>
                    {isInteractive ? <></> : <div className="rating-right-date">{month} {day}, {year}</div>}
                    {ratingEntered ? <></> : <div className="rating-right-error"><a>Choose a rating, please!</a><br/></div>}
                    <p className="rating-box-error-msg">{errorMessage}</p>
                </div>
                <div className="rating-submit">
                <form onSubmit={handleSubmit}>
                    <input type="submit" name="submitButton" disabled={btnDisabled} className="btn btn-success" value={`${btnValue}`}/>
                </form>
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
  export default RatingBoxPre;