
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../comment/commentbox.css"
import axios from "axios";


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
function Comment({ commentPerson, pComment, myDate,MatchData, }) {
  //console.log(MatchData);
  const matchID=MatchData[0]._id
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const RenderDate=new Date(myDate)
  let mth = month[RenderDate.getMonth()];
  let day=RenderDate.getDate();
  let year=RenderDate.getFullYear();
  let myweek=MatchData[0].week_no;
  const [matchDetails, setMatchDetails] = useState([]);
  const [loading,setLoading] = useState(false);

    const getMatchDetails = async() => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/matches/getSingleMatchDetails/${matchID}`)
            .then(res => {
                setMatchDetails((res.data ?? [])[0]);
                setLoading(true);
        }).catch(err => console.log(err));
    };
  useEffect(() => {
    getMatchDetails();
  },[]);
    return(
      (loading ?
      <div className="refs-page-container">
        <div className="refs-page-inner-container">
          <div className="refs-page-header">
            <div className="refs-page-header-person"><b>{commentPerson}</b></div>
            <div className="refs-page-header-dot"><p>•</p></div>
            <div className="refs-page-header-date"><p>{mth} {day}, {year}</p></div>
          </div>
          <div className="refs-page-comment">
            <div className="refs-page-comment-text"><p>{pComment}</p></div>
          </div>
        </div>
        <div className="refs-page-right-container">
          <div className="refs-page-rigth-logos">
            <div className="refs-page-rigth-logo"><img alt="Homeclub" src={(clubs.find(({name})=>name === matchDetails.club1_info[0].name)).src} className="refs-page-right-logo-img"/></div>
            <div className="refs-page-rigth-logo"><img alt="Awayclub" src= {(clubs.find(({name})=>name === matchDetails.club2_info[0].name)).src} className="refs-page-right-logo-img"/></div>
          </div>
          <div  className="refs-page-rigth-week"><b>Week {myweek}</b></div>
        </div>
      </div>
      :
      <></>
      )
    )
}
export default Comment