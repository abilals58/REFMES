import "../profile/profile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppNavBar from "../../components/appnavbar.jsx";
import stadium from "../profile/allclubs.png"
import profilePhoto from '../../components/refbar/user_profile.png'
import { useParams } from "react-router-dom";
import ProfileComments from "./profile-comments";
import { BsPencilFill} from 'react-icons/bs';
import * as ReactBootstrap from "react-bootstrap";
import { useStore } from "../../store/store"
function ProfilePage() {
    const params = useParams();
    const currUsername = params.username;
    const [loading,setLoading]=useState(false);
    const [state, dispatch] = useStore();
    const {user:currentUser} = state;
    //console.log(currentUser.user.username);
    const [userData,setuserData]=useState();
    const getCurrentUser=async()=>{
      await axios.get(`${process.env.REACT_APP_URL}/api/users/getuserbyUsername/${currUsername}`).then(res=>{
        setuserData(res.data);
        setLoading(true);
      }).catch(err=>{
        console.log(err);
      })
    }

useEffect(() => {
  getCurrentUser();
}, [])
 return(
  <div className="profile-info row align-items-center mr-0">
    <AppNavBar/>
    {loading ?
    <div>
      <div className="user_profile_cap">
        <div className="user_profile_cover">
          <img src={stadium} className="stadium" alt="img"/>
        </div>
        <div className="user_profile_headline">
            <img src={profilePhoto} alt="img"/> 
            <article style={{display:"flex"}}><p style={{marginRight: "5px", fontSize: "30px"}}>{userData.full_name}</p><p style={{marginTop:"15px"}}>(@{userData.username})</p>
            {currentUser.user.username===currUsername ? 
            <div className="user_edit_pen"><a id="userEditpen" href="/edit"><BsPencilFill/></a></div> :
            <></>
            }
            </article>
        </div>
      </div>
      <ProfileComments CurrentUser={userData}/>
    </div>
    :
    <div className="d-flex justify-content-center">
    <ReactBootstrap.Spinner animation="border"/>
    </div>
  }
  
  </div>
 )
}
export default ProfilePage