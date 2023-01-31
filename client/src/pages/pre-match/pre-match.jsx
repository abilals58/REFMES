import { useStore } from "../../store/store";
import AppNavBar from "../../components/appnavbar.jsx";
import RatingBoxPre from "../../components/ratingbox/ratingboxpre.jsx";
import React, {useState, useEffect } from "react";
import axios from "axios";
import "../pre-match/pre-match.css";
import * as ReactBootstrap from "react-bootstrap";

function PreMatchPage({PreWeek}) {

    const [refereesOfWeek, setRefereesOfWeek] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRefereesOfWeek = async() => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/refereesOfWeek/getRefereesOfWeek/${PreWeek}`)
            .then(res => {
                setRefereesOfWeek(res.data.myarray);
                setLoading(true);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getRefereesOfWeek();
    },[]);

    return (
        <div>
            <AppNavBar/>
            <div>
                <h1 style={{textAlign: "center", margin: "2em 0em 1em 0em"}}>Pre-Match Rating for Week {PreWeek}</h1>
            </div>
            {loading && refereesOfWeek ?
                <div className="matches">
                {refereesOfWeek.map((singleReferee) => {
                    return(<RatingBoxPre key={singleReferee._id} refereeData={singleReferee} preWeek={PreWeek}/>)
                })}
                </div>
                :
                <div className="d-flex justify-content-center">
                    <ReactBootstrap.Spinner animation="border"/>
                </div>
            }
        </div>
    );
  }
  export default PreMatchPage;