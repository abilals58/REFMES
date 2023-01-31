import React, { useEffect, useState } from "react";
import findLogo from "../../components/clubLogos/clubLogos";
import {BsTwitter, BsInstagram} from 'react-icons/bs';
import axios from "axios";
import CommentBox from "../../components/comment/commentbox";
import "../profile/profile.css";
import * as ReactBootstrap from "react-bootstrap";
function ProfileComments({CurrentUser}) {
    const [UserComments,setUserComments]=useState([]);
    const [loading,setLoading]=useState(false);
    var clubLogo=findLogo(CurrentUser.fan_of)
    const getUserComments = async () => {
        await axios.get(`${process.env.REACT_APP_URL}/api/comments/getUserComments/${CurrentUser._id}`).then(res => {
            if (res.data.length === 0) {
                console.log("Empty");
                setLoading(true);
            } else {
                setUserComments(res.data);
                setLoading(true);
            }
        }).catch(err => console.log(err))
    };
 useEffect(() => {
   getUserComments();
 }, [])
 
  return (
    <>
  {loading ? 
  <div className="user_profile_main">
    <div className="col-4 left-sidebar-margin">
    <div className="profile-left-sidebar">
        <p className="mt-2 profile-section-text d-flex justify-content-center">Fan Information</p>
        <hr></hr>
        <div className="club_container">
        <div className="col-4 club_inner"><img alt="userprofile" src={clubLogo}/></div>
        <div className="col-8 club_inner"><p>{CurrentUser.fan_of}</p></div>
        </div>
        <p className="mt-2 profile-section-text d-flex justify-content-center">User Information</p>
        <hr></hr>
        <div className="social_media_container">
        <div className="social_media_inner"><a id="twitter" style={{color: "#1D9BF0"}} href={`https://twitter.com/${CurrentUser.social_media.length>0 && CurrentUser.social_media[0] ? CurrentUser.social_media[0] :""}`}><BsTwitter/></a></div>
        <div className="social_media_inner"><a id="instagram" style={{color: "#FE0088"}} href={`https://www.instagram.com/${CurrentUser.social_media.length>1 && CurrentUser.social_media[1] ? CurrentUser.social_media[1] :""}`}><BsInstagram/></a></div>
        </div>
        <div className="user-profile-information">
        <p className="d-flex justify-content-center profile-subsection-text">Email:</p>
        <input className=" user-profile-input" disabled={true} value={CurrentUser.email}></input>
        <p className="d-flex justify-content-center profile-subsection-text">Username:</p>
        <input className=" user-profile-input" disabled={true} value={CurrentUser.username}></input>
        <p className="d-flex justify-content-center profile-subsection-text">Full Name:</p>
        <input className="user-profile-input" disabled={true} value={CurrentUser.full_name}></input>
        <p className="d-flex justify-content-center profile-subsection-text">Total Comments:</p>
        <p className="d-flex justify-content-center profile-section-text">{UserComments.length}</p>
        </div> 
    </div>
    </div>
    <div className="col-6">
        <p  className="d-flex justify-content-center profile-section-text">All Comments</p>
        <hr className="user-profile-divider"></hr>
        <div className="user-profile-comment-scroll"> 
            {UserComments.length > 0 ? UserComments.slice(0, 10).map((item) => {

            return(
            <div style={{width: "100%"}} key={item._id}>
                <div className="container d-flex justify-content-center">
                <CommentBox commentPerson={CurrentUser.full_name} pComment={item.comment} myDate={item.date} MatchData={item.match_infos}/>
                </div>
            </div>

            );
            })
            :
            <p style={{marginTop: "1em",fontStyle:"italic",fontWeight:"bold",justifyContent:"center",display:"flex"}}>No comments yet!</p>
            }
        </div>
    </div> 
    </div>
    :
    <div className="d-flex justify-content-center">
    <ReactBootstrap.Spinner animation="border"/>
    </div>
}
</>  
  )
}

export default ProfileComments