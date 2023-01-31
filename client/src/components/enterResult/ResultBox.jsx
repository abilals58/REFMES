import React, {useState, useEffect } from "react";
import axios from "axios";
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

function ResultBox({ matchData,formData,setformData }) {

    const [errorMessage, setErrorMessage] = useState("");
    const [btnValue, setBtnValue] = useState("Enter Result");
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [homeGoal,Sethomegoal] = useState(-1);   
    const [awayGoal,Setawaygoal] = useState(-1); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(homeGoal,awayGoal);
            if(homeGoal < 0 || awayGoal <0){
                setErrorMessage("Please enter a valid score!");
            }
            else{
                setBtnDisabled(true)
                const newScore = {
                    team1goal: homeGoal ,
                    team2goal: awayGoal,
                    match_id: matchData._id,
                    team_1:matchData.club1_info[0].name,
                    team_2:matchData.club2_info[0].name
                };
                var oldArray=formData.resultList
                oldArray.push(newScore);
                setformData({...formData,resultList:oldArray})
                setErrorMessage("You have submitted result successfully");
                setBtnValue("Submitted")    
            }
    }
    return (
        <div className="d-flex justify-content-center">
        <div className="rating-outer-container" style={{padding: "3em"}}>
            <div className="rating-container">
                <div className="rating-left">
                    <div className="rating-left-match">
                        <div className="rating-team">
                            <img alt="Homeclub" src={(clubs.find(({name})=>name === matchData.club1_info[0].name)).src}/>
                            <a>{matchData.club1_info[0].name} <input disabled={btnDisabled} style={{ fontSize: 15, width: "40px"}} type="number" onChange={(e)=>Sethomegoal(e.target.value)}/>  </a>
                        </div>
                        <a> vs. </a>
                        <div className="rating-team">
                            <img alt="Awayclub" src={(clubs.find(({name})=>name === matchData.club2_info[0].name)).src}/>
                            <a>{matchData.club2_info[0].name} <input disabled={btnDisabled} style={{ fontSize: 15, width: "40px"}} type="number" onChange={(e)=>Setawaygoal(e.target.value)}/></a>
                        </div>
                    </div>
                </div>
                <div className="rating-submit">
                <form onSubmit={handleSubmit}>
                    <p style={{color:"blue"}}>{errorMessage}</p>
                    <input  disabled={btnDisabled} type="submit" name="submitButton" className="btn btn-success" value={`${btnValue}`}/>
                </form>
                </div>
            </div>
        </div>
        </div>
    );
  }
  export default ResultBox;