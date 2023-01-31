import AppNavBarSingle from "../../components/appnavbarsingle.jsx"
import React, {  useEffect, useState } from "react";
import axios from "axios";
import UpdateRefBar from "../../components/refbar/updatebar"
import "../admin-auth/updateReferee.css"

function UpdateRefPage() {

  const [RefData, setRefData] = useState({});
  const [UpdateRefData, setUpdateRefData] = useState({});
  const [Loading, setLoading] = useState(false);
  const [Updated, setUpdated] = useState(false);

  const getRefs = async() =>{
    
    await axios.get(`${process.env.REACT_APP_URL}/api/referees/getAllUpdatedref`).then(response =>{
      setRefData(response.data);
      setLoading(true);

    }).catch(err => console.log(err))

  };

  const updateRef = async() =>{
    await axios.get(`${process.env.REACT_APP_URL}/api/referees/updateRef`).then(res =>{
      setUpdateRefData(res.data);
      setUpdated(true);

    }).catch(err => console.log(err))

  };

  useEffect(()=> {
    getRefs();
  }, [])
 
    return(
        <div>
            <AppNavBarSingle/>
            <div>
                <h1 style={{textAlign: "center", margin: "2em 0em 2em 0em"}}>Referee Information Update Page </h1>
            </div>
            <div className="container-fluid">
            <div className="row">
              <div className="col-1"></div>
            <div className="col-9">
            { RefData ?
                    (RefData.length > 0 ?
                      RefData.map((item) => {
                        
                        return(
                          <div key={item.r_username}> 
                            <UpdateRefBar referee = {item} >  </UpdateRefBar>
                          </div>
                        );
                      }) : <></>)            :<></>
                   
                  }
            </div>
            <div className="col-2"> 
              <button onClick={updateRef} type="button" className="btn btn-warning update-ref-btn-size">Update</button>
              <a href="/admin-auth/updateReferee"> <button type="button" className="btn btn-warning update-ref-btn-size">See Last Version</button> </a>
             </div>
            </div>
            </div>
        </div>
    )
}
export default UpdateRefPage