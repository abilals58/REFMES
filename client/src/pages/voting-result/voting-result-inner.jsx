import React from 'react'
import {useState,useEffect} from "react"
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
import VotingResultBox from '../../components/voting-result-box/voting-result-box';
function  VotingResultInner({PreWeek}) {
    const[loading,setLoading] = useState(false);
    const [allmatchDetails, setallMatchDetails] = useState([]);
    const getMatches=async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/api/matches/getMatchDetails/${PreWeek}`).then((result) => {
            setallMatchDetails(result.data);
            setLoading(true);
        }).catch((err) => {
            
        });
    }
    useEffect(() => {
        getMatches();
    }, [])
    //console.log(allmatchDetails);
    if(allmatchDetails.length !==0)
    {
        allmatchDetails.sort(function(a, b){
            if (a.ref_info[0].name > b.ref_info[0].name) {return 1;}
            if (a.ref_info[0].name < b.ref_info[0].name ) {return -1;}
            return 0;
        });
    }
    return (
    <div>
        <div>
            <h1 style={{textAlign: "center", margin: "2em 0em 1em 0em"}}>Referee Assignment Results for Week {PreWeek}</h1>
        </div>
        {allmatchDetails.map(item=>{
            return(
                <div className='d-flex justify-content-center row' key={item._id}>
                    <VotingResultBox matchData={item} />
                </div>
            )

        })}
    
    </div>
  )
}

export default VotingResultInner