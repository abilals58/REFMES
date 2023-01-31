import { useStore } from "../../store/store";
import AppNavBar from "../../components/appnavbar.jsx";
import { useNavigate } from "react-router";
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import PostCommentBox from "../../components/post-comment/post-comment.jsx"
import { useParams } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";

function PostMatchCommentPage() {
    const params = useParams();
    const matchID = params.matchID;

    const [matchDetails, setMatchDetails] = useState([]);
    const [loading,setLoading] = useState(false);

    const getSingleMatchDetails = async() => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/matches/getSingleMatchDetails/${matchID}`)
            .then(res => {
                setMatchDetails((res.data ?? [])[0]);
                setLoading(true);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getSingleMatchDetails();
    }, []);

    return(
        <div>
            <AppNavBar/>
            <h1 style={{textAlign: "center", marginTop: "144px", marginBottom: "60px"}}>Post-Match Comment Page</h1>
            {loading && matchDetails ?
                <div className="matches">
                    <PostCommentBox matchData={matchDetails}/>
                </div>
            :
            <div className="d-flex justify-content-center">
                <ReactBootstrap.Spinner animation="border"/>
            </div>
            }
        </div>
    )
}
export default PostMatchCommentPage