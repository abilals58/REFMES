import React from "react";
import axios from "axios";
import { useState } from "react";
import "../admin-auth/addObserver.css";
function AdminAddObserver(){
    const [o_id,Setobserverid] = useState("");
    const [o_password,Setpassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const newObserver = {
            observer_id : o_id,
            password: o_password
        };
        if(!newObserver.observer_id || !newObserver.password){
            setErrorMessage("Please, enter all fields!");
        }
        else{
            setErrorMessage("You have successfully added observer to the database!");
        }
        await axios.post(`${process.env.REACT_APP_URL}/api/admin/addObserver`,newObserver)
        .then(res =>{

        }).catch(err=>console.log(err));
    };
    return(
        <div>
             <h1 style={{textAlign: "center", color: "red"}}>ADD OBSERVER PAGE</h1>
             <div>
                <h2 style={{textAlign:"center"}}>REGISTER THE NEW OBSERVER TO THE SYSTEM WITH FILLING FOLLOWING INFORMATION:</h2>
                <form className="form_addObserver" onSubmit={handleSubmit}>
                <div>
                    <p>Give ID to the observer:</p>
                    <input onChange={(e)=>Setobserverid(e.target.value)}  placeholder="ID Number..." type="number" className="btn-border input-style form-control"/>
                </div>
                <div>
                    <p>Give password to the observer:</p>
                    <input onChange={(e)=>Setpassword(e.target.value)}  placeholder="Password..." type="text" className="btn-border input-style form-control"/>
                </div>
                <div  style={{marginLeft:"150px",marginTop:"20px",marginBottom:"20px"}}>
                    <p className="errorMessage">{errorMessage}</p>
                    <button  type="submit" className="btn btn-block col-8 btn-success">ADD OBSERVER</button>
                </div>
                </form>
             </div>
        </div>
    )
};
export default AdminAddObserver;