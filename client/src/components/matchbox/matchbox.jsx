import React, { useState, } from "react";
import { Link } from "react-router-dom";
import "../matchbox/matchbox.css";
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

function MatchBox({ matchData, playedWeek }) {
    const [hasRefInfo, setHasRefInfo] = useState(matchData.referee_id ? true : false);

    return (
        <>
        <div className="matchbox-outer-container">
            <div className="matchbox-inner-container">
                <div className="matchbox-inner-left">

                    <div className="matchbox-inner-left-name">
                        <p>{matchData.club1_info[0].name}</p>
                    </div>

                    <div className="matchbox-inner-left-image">
                        <img alt="Homeclub" className="matchbox-inner-left-club-img" src={(clubs.find(({name})=>name === matchData.club1_info[0].name)).src}/>
                    </div>

                    <div className="matchbox-inner-left-score">
                        {playedWeek ? <p>{matchData.club1_goals}</p> : <p>-</p>}
                        
                    </div>

                </div>
                <div className="matchbox-inner-right">

                    <div className="matchbox-inner-right-score">
                        {playedWeek ? <p>{matchData.club2_goals}</p> : <p>-</p>}
                    </div>

                    <div className="matchbox-inner-right-image">
                        <img alt="Awayclub" className="matchbox-inner-right-club-img" src={(clubs.find(({name})=>name === matchData.club2_info[0].name)).src}/>
                    </div>

                    <div className="matchbox-inner-right-name">
                        <p>{matchData.club2_info[0].name}</p>
                    </div>

                </div>
            </div>
            <div className="matchbox-middle-container">
                <div className="matchbox-middle-referee">
                    {playedWeek && hasRefInfo ?
                        <div><b>Referee:</b> <Link to={`../referee/${matchData.ref_info[0].r_username}`}>{matchData.ref_info[0].name}</Link></div>
                        :   
                        <p>Referee is not assigned yet.</p>
                    }
                </div>
            </div>
            <div className="matchbox-bottom-container">
                <div className="matchbox-bottom-button">
                    <Link to={`../match/${matchData._id}`}>See Match Details</Link>
                </div>
            </div>
        </div>
        </>
    );
  }
  export default MatchBox;