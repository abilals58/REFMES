import React from "react";
import {useState,useEffect} from "react";
import axios from "axios";
import ImportanceBox from "../../components/match-importance-box/importance-box.jsx";
import "../match-importance/match-importance.css";
import * as ReactBootstrap from "react-bootstrap";

function SortedMatches({allmatches}) {
    const c_images = [
        { id: "fenerbahce", src: "Fenerbahce"},
        { id: "galatasaray", src: "Galatasaray"},
        { id: "besiktas", src: "Besiktas"},
        { id: "basaksehir", src: "Istanbul Basaksehir"},
        { id: "adanademirspor", src: "Adana Demirspor"},
        { id: "konyaspor", src: "Konyaspor"},
        { id: "hatayspor", src: "Hatayspor"},
        { id: "giresunspor", src: "Giresunspor"},
        { id: "alanyaspor", src: "Alanyaspor"},
        { id: "sivasspor", src: "Sivasspor"},
        { id: "antalyaspor", src: "Antalyaspor"},
        { id: "gaziantepfk", src: "Gazişehir Gaziantep"},
        { id: "umraniyespor", src: "Ümraniyespor"},
        { id: "istanbulspor", src: "İstanbulspor"},
        { id: "kasimpasaspor", src: "Kasimpasa"},
        { id: "ankaragucuspor", src: "Ankaragucu"},
        { id: "trabzonspor", src: "Trabzonspor"},
        { id: "karagumrukspor", src: "Fatih Karagümrük"},
        { id: "kayserispor", src: "Kayserispor"}
    ]
    const[loading,setLoading] = useState(false);
    const [standingsdata, setstandingsdata] = useState([]);
    const getStandings = async()=>{
        
        await axios.get(`${process.env.REACT_APP_URL}/api/matches/getstandings`).then(res=>{
            setstandingsdata(res.data);
            setLoading(true);

        }).catch(err => console.log(err))
      };
      useEffect(() => {
          getStandings();
      }, [])
    var myarray=[]
    //console.log(standingsdata);
    standingsdata.forEach((item)=>{
        var teamrank=item.rank;
        var teamname=item.team.name;
        var asciName=(c_images.find(({src})=>src ===teamname)).id;
        var team={
            rank:teamrank,
            name:teamname,
            asciname:asciName,
        }
        myarray.push(team)
    })
    var myranking=[]
    //console.log(myarray);
    if(myarray.length !==0){
        allmatches.forEach(element => {
            var club1_asci=element.club1_info[0].asci_name
            var club2_asci=element.club2_info[0].asci_name
            var club1_name=element.club1_info[0].name
            var club2_name=element.club2_info[0].name
            var club1_rank=(myarray.find(({asciname})=>asciname ===club1_asci)).rank;
            if(club1_asci==="fenerbahce" ||club1_asci==="galatasaray" || club1_asci==="besiktas" || club1_asci==="basaksehir"||club1_asci==="trabzonspor")
            {
                club1_rank=club1_rank-5;
            }
            // console.log(club1_rank.rank);
            var club2_rank=(myarray.find(({asciname})=>asciname ===club2_asci)).rank;
            if(club2_asci==="fenerbahce" ||club2_asci==="galatasaray" || club2_asci==="besiktas" || club2_asci==="basaksehir"||club2_asci==="trabzonspor")
            {
                club2_rank=club2_rank-5;
            }
            var matchID=element._id
            var alldata={
                club1_asci:club1_asci,
                club2_asci:club2_asci,
                club1:club1_name,
                club2:club2_name,
                match_id:matchID,
                totalrank:club1_rank+club2_rank
            }
            myranking.push(alldata)
        });
    }
    //console.log(myranking);
    myranking.sort(function(a, b){
        if(a.totalrank > b.totalrank) { return 1; }
        if(a.totalrank < b.totalrank) { return -1; }
        return 0;
      })
    return (
      <div>
        {loading ?
        <div className="mt-1">
            { myranking? 
            (myranking.map((item)=>{
                return(
                    <div key={item.match_id} className="match-importance-box-class"> 
                        <ImportanceBox matchData={item}/>
                    </div>
                )
            }))
            :
            <div className="d-flex justify-content-center">
                <ReactBootstrap.Spinner animation="border"/>
            </div>
            }
        </div>
        :
        <div className="d-flex justify-content-center">
            <ReactBootstrap.Spinner animation="border"/>
        </div>
        }
      </div>
    );
  }
  export default SortedMatches;