import AppNavBar from "../../components/appnavbar.jsx";
import React, {  useEffect, useState } from "react";
import axios from "axios";
import ClubCard from "../../components/clubs/clubCard"
import "../clubs/clubs.css"
import * as ReactBootstrap from "react-bootstrap";

function ClubsPage() {

  const [ClubsData, setClubData] = useState({});
  const [Loading, setLoading] = useState(false);

  const getClubs = async() =>{
    await axios.get(`${process.env.REACT_APP_URL}/api/clubs/getClubs`).then(response =>{
      setClubData(response.data);
      setLoading(true);

    }).catch(err => console.log(err))

  };

  useEffect(()=> {
    getClubs();
  }, [])
  
    return(
        <div>
            <AppNavBar/>
            <div>
                <h1 style={{textAlign: "center", margin: "2em 0"}}>Super League Clubs</h1>
            </div>
            <div className="container" style={{marginBottom: "2em"}}>
              <div className="row">
                { ClubsData ?
                        (ClubsData.length > 0 ?
                          ClubsData.map((item) => {
                            return(
                              <div key={item.name} className="com-xs-12 col-sm-6 col-md-4 col-lg-3"> 
                                <ClubCard clubName = {item.name} asciName = {item.asci_name} >  </ClubCard>
                              </div>
                            );
                          })
                          : 
                          <div className="d-flex justify-content-center">
                              <ReactBootstrap.Spinner animation="border"/>
                          </div>
                          )
                          :
                          <div className="d-flex justify-content-center">
                              <ReactBootstrap.Spinner animation="border"/>
                          </div>
                      }
               </div>
            </div>
        </div>
    )
}
export default ClubsPage
