import { useNavigate } from "react-router";
import AppNavBar from "../../components/appnavbar.jsx"
import { userLogout } from "../../store/userreducer";
import axios from "axios";
import React, {useEffect, useCallback, useState } from "react";
import { useStore } from "../../store/store";
import { userLogin } from "../../store/userreducer";
import "../edit/edit.css";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import * as ReactBootstrap from "react-bootstrap";
function Edit(){

  //Password
  const passSchema = z
.object({
    currentPassword:z.string().min(1,{message:"Can not be empty"}),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 character" })
      .regex(
      // eslint-disable-next-line max-len
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*';."_)(+,/:>\]<=?@\\^`|[}{~-])/,
        {
          message:
          // eslint-disable-next-line max-len
          "Password must contain uppercase, lowercase, numeric and special character",
        },
      ),
    passwordConfirm: z.string(),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords are not the same",
    path: ["passwordConfirm"],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(passSchema),
    mode: "all",
  });
    const [state, dispatch] = useStore();
    const navigate = useNavigate();
    const {user:currentUser} = state;
    const {user:value}=currentUser
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [errorMessagedelete, setErrorMessagedelete] = useState("");
    const [editdisable,seteditdisable]=useState(false)
    const [passdisable,setpassdisable]=useState(false)

    var [newusername,setnewusername]=useState("");
    var [newfullname,setfullname]=useState("");
    var [newTwittername,setTwitterusername]=useState("");
    var [newInstaname,setInstausername]=useState("");
    const [oldInfos,setoldInfos]=useState("");
    const [loading,setLoading]=useState(false);

    const getUserInfo=async()=>{
      await axios.get(`${process.env.REACT_APP_URL}/api/users/getuserInfo/${currentUser.user.id}`).then((res)=>{
          setoldInfos(res.data)
          setLoading(true)
      }).catch((err) => {
        console.log("Error:", err);
        setErrorMessage("Error! Something went wrong.");
      });
    }
    
    const deleteUser = useCallback((data) => {
      axios
        .post(`${process.env.REACT_APP_URL}/api/users/delete`,value)
        .then((res) => {
          if (res.status === 200 && res.data.message) {
            setErrorMessagedelete(res.data.message);
          } else if (res.status === 200) {
            setErrorMessagedelete("You delete account succesfully");
            
            dispatch(userLogout());
            navigate("/landing");
          } else {
            setErrorMessagedelete("Error! Please try again.");
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          setErrorMessagedelete("Error! Please try again.");
        });
    }, [navigate, dispatch]);

    const userInfohandleSubmit = async (e)=> {
      seteditdisable(true)
      setpassdisable(true)
      e.preventDefault();
      
      if(newInstaname==="" && newTwittername==="" && newusername==="" && newfullname==="")
      {
        setErrorMessage("You did not change anything")
        seteditdisable(false)
        setpassdisable(false)
      }
      else {
        if(newfullname==="")
        {
          newfullname=oldInfos.full_name
        }
        if(newusername==="")
        {
          newusername=oldInfos.username
        }
        if(newTwittername==="")
        {
          newTwittername=oldInfos.social_media.length>0 ? oldInfos.social_media[0] : ""
        }
        if(newInstaname==="")
        {
          newInstaname= oldInfos.social_media.length>1 ? oldInfos.social_media[1] : ""
        }
        var newuseInfos={
        full_name:newfullname,
        username:newusername.replaceAll(/ /g,"").toLowerCase(),
        insta:newInstaname,
        twitter:newTwittername,
        email:oldInfos.email,
        id:oldInfos._id,
        fan_of:oldInfos.fan_of
        }
        await axios.post(`${process.env.REACT_APP_URL}/api/users/updatesetting`,newuseInfos)
          .then((res) =>{
            console.log(res);
            if (res.status === 200 && res.data.msg) {
              setErrorMessage(res.data.msg);
              seteditdisable(false)
              setpassdisable(false)
            }
            else if (res.status === 200) {
                  setErrorMessage("You update account succesfully,please wait for refresh");
                  
                  dispatch(userLogin({user:newuseInfos}));
                  setTimeout(Refresh,400)
            }else {
              //console.log(res);
              setErrorMessage("Error! Something went wrong.");
              seteditdisable(false)
              setpassdisable(false)
            }
          })
        }
        e.target.reset();
    }
    function Refresh() {
      window.location.reload();
     }
    const onpassSubmit=  useCallback((data)=> {
      const { currentPassword, password } = data;
      console.log(password);
      var usermail=oldInfos.email;
      axios
        .post(`${process.env.REACT_APP_URL}/api/users/change-password`, { usermail, currentPassword, password })
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.data.message) {
            setErrorMessage2(res.data.message);
          } 
          else if (res.status === 200) {
            setErrorMessage2("Changed password succesfully");
            reset();
          } 
          else {
            setErrorMessage2("Error! Please try again.");
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          setErrorMessage2("Error! Please try again.");
        });
    },[reset])


    useEffect(() => {
      getUserInfo();
    },[])
    
    return(
      <div className="container">
        <AppNavBar/>

        { loading ? <div className="edit_buttons_container">
              <form onSubmit={userInfohandleSubmit} className="username-edit-form">
                <div className="justify-content-center row">
                  <div className="col-5">
                  <p className="user-edit-headline">New Full Name</p>
                  </div>
                  <div className="col-5">
                  <input placeholder={oldInfos.full_name} onChange={(e)=>setfullname(e.target.value)} className="user-edit-inputs"></input>
                  </div>
                </div>
                <div className="justify-content-center row">
                  <div className="col-5">
                  <p className="user-edit-headline">New Username</p>
                  </div>
                  <div className="col-5">
                  <input placeholder={oldInfos.username} onChange={(e)=>setnewusername(e.target.value)} className="user-edit-inputs"></input>
                  </div>
                </div>
                <div className="justify-content-center row">
                  <div className="col-5">
                  <p className="user-edit-headline"> New Twitter username</p>
                  </div>
                  <div className="col-5">
                  <input placeholder={oldInfos.social_media.length > 0 && oldInfos.social_media[0] !=="" ? oldInfos.social_media[0] : "not entered yet!"} onChange={(e)=>setTwitterusername(e.target.value)} className="user-edit-inputs"></input>
                  </div>
                </div>
                <div className="justify-content-center row">
                  <div className="col-5">
                  <p className="user-edit-headline">New Instagram username</p>
                  </div>
                  <div className="col-5">
                  <input  placeholder={oldInfos.social_media.length > 1 && oldInfos.social_media[1] !=="" ? oldInfos.social_media[1] : "not entered yet!"}  onChange={(e)=>setInstausername(e.target.value)} className="user-edit-inputs"></input>
                  </div>
                </div>
                <div className="justify-content-center row">
                    <p className="errorMessage d-flex justify-content-center">{errorMessage}</p>
                    <button disabled={editdisable} type="submit" className="btn btn-block col-12 btn-success user-edit-button-size">Submit your new infos</button>
                </div>
              </form>
              <form  onSubmit={handleSubmit(onpassSubmit)} className="username-edit-form">
                <div className="justify-content-center row">
                  <div className="col-5">
                  <p className="user-edit-headline">Current Password</p>
                  </div>
                  <div className="col-5">
                  <input {...register("currentPassword")} className="user-edit-inputs"  type="password"></input>
                  <small className="align-self-start error-text">
                    {errors.currentPassword?.message}
                  </small>
                  </div>
                </div>
                <div className="justify-content-center row">
                  <div className="col-5">
                  <p className="user-edit-headline">New Password</p>
                  </div>
                  <div className="col-5">
                  <input {...register("password")} className="user-edit-inputs"  type="password"></input>
                  <small className="align-self-start error-text">
                    {errors.password?.message}
                  </small>
                  </div>
                </div>
                <div className="justify-content-center row">
                  <div className="col-5">
                  <p className="user-edit-headline">Confirm Password</p>
                  </div>
                  <div className="col-5">
                  <input {...register("passwordConfirm")} className="user-edit-inputs"  type="password"></input>
                  <small className="align-self-start error-text">
                    {errors.passwordConfirm?.message}
                  </small>
                  </div>
                </div>
                <div className="justify-content-center row">
                    <p className="errorMessage d-flex justify-content-center">{errorMessage2}</p>
                    <button disabled={passdisable} type="submit" className="btn btn-block col-12 btn-success user-edit-button-size">Submit new password</button>
                </div>
              </form>
              <div className="mt-5 d-flex justify-content-center row">
              <p className="errorMessage d-flex justify-content-center">{errorMessagedelete}</p>
                <button disabled={passdisable || editdisable} onClick = {deleteUser} type='submit' className="col-12 btn btn-block btn-danger user-edit-button-size">
                    Delete Account</button></div>
          </div>
        :
        <div className="d-flex justify-content-center">
            <ReactBootstrap.Spinner animation="border"/>
        </div>
        }
      </div>
  );
}
export default Edit