import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStore } from "../../store/store";
import "../matchbox/matchboxAdvanced.css";
import CommentBox from "../comment/commentbox";
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

function MatchBoxAdvanced({ matchData, playedWeek }) {

    const [loading, setLoading] = useState(false);
    const [hasRefInfo, setHasRefInfo] = useState(matchData.referee_id ? true : false);
    const [list, setList] = useState([]);

    const getCurrentComments = async () => {
        await axios.get(`${process.env.REACT_APP_URL}/api/comments/getComments/${matchData._id}`).then(res => {
            if (res.data === []) {
                
            } else {
                setList(res.data);
                setLoading(true);
            }
        }).catch(err => console.log(err))
    };

    useEffect(() => {
        getCurrentComments();
    },[]);

    list.sort(function(a, b){
        if(a.date < b.date) { return 1; }
        if(a.date > b.date) { return -1; }
        return 0;
    })
 console.log("mylist: ",list);
    return (
        <div className="matchbox-advanced-outer-container">
            <div className="matchbox-advanced-clubs-container">
                <div className="matchbox-advanced-clubs-left-container">
                    <div className="matchbox-advanced-clubs-left-inner">
                        <div className="matchbox-advanced-clubs-left-logo">
                            <img alt="Homeclub" className="matchbox-advanced-clubs-left-club-img" src={(clubs.find(({name})=>name === matchData.club1_info[0].name)).src}/>
                        </div>
                        <div className="matchbox-advanced-clubs-left-name">
                            <Link to={`../club/${matchData.club1_info[0].asci_name}`}><b>{matchData.club1_info[0].name}</b></Link>
                        </div>
                        <div className="matchbox-advanced-clubs-left-score">
                            {playedWeek && hasRefInfo ? <p>{matchData.club1_goals}</p> : <p>-</p>}
                        </div>
                    </div>
                </div>
                <div className="matchbox-advanced-clubs-vs"><p>vs.</p></div>
                <div className="matchbox-advanced-clubs-right-container">
                    <div className="matchbox-advanced-clubs-right-inner">
                        <div className="matchbox-advanced-clubs-right-score">
                            {playedWeek && hasRefInfo ? <p>{matchData.club2_goals}</p> : <p>-</p>}
                        </div>
                        <div className="matchbox-advanced-clubs-right-name">
                            <Link to={`../club/${matchData.club2_info[0].asci_name}`}><b>{matchData.club2_info[0].name}</b></Link>
                        </div>
                        <div className="matchbox-advanced-clubs-right-logo">
                            <img alt="Awayclub" className="matchbox-advanced-clubs-right-club-img" src={(clubs.find(({name})=>name === matchData.club2_info[0].name)).src}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="matchbox-advanced-stadium-container">
                <div className="matchbox-advanced-stadium-name"><p><b>Stadium:</b> {matchData.club1_info[0].stadium}</p></div>
            </div>
            <div className="matchbox-advanced-referee-container">
                {playedWeek && hasRefInfo ?
                    <div>Match in <b>Week {matchData.week_no}</b> | Referee: <b><Link className="matchbox-advanced-referee-name" to={`../referee/${matchData.ref_info[0].r_username}`}>{matchData.ref_info[0].name}</Link></b></div>
                    :
                    <div>Match in <b>Week {matchData.week_no}</b> | Referee is not assigned yet.</div>
                }
            </div>
            <div className="matchbox-advanced-comments-container">
                <p style={{fontWeight: "bold"}}>Comments from Fans</p>
                { loading ? (list.length > 0 ? list.slice(0, 10).map((item) => {

                    return(
                    <div style={{width: "100%"}} key={item._id}>
                        <div className="container d-flex justify-content-center padding-b">
                        <CommentBox commentPerson={item.user_info[0].full_name} pComment={item.comment} myDate={item.date} MatchData={[matchData]}/>
                        </div>
                    </div>

                    );
                    })
                    :
                    <p style={{marginTop: "1em"}}>No comments yet!</p>)
                :
                <div className="d-flex justify-content-center">
                    <ReactBootstrap.Spinner animation="border"/>
                </div>
                }
            </div>
        </div>
    );
}
export default MatchBoxAdvanced;