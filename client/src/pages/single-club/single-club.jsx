import { useStore } from "../../store/store";
import AppNavBar from "../../components/appnavbar.jsx";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import React, { useCallback, useState } from "react";
import axios from "axios";
import "./single-club.css"
import { useEffect } from "react";
import * as ReactBootstrap from "react-bootstrap";
import findLogo from "../../components/clubLogos/clubLogos.jsx";
import findSocialMedia from "../../components/clubLogos/clubsocials";
import { Timeline } from 'react-twitter-widgets'

function SingleClubPage() { // it takes clubname parameter from clubs.jsx
  // getting parameters from clubs page
  const { asciName } = useParams();

  const [ClubData, setClubData] = useState({});
  const [clubName, setClubName] = useState();
  const [logo, setLogo] = useState();
  const [loading, setLoading] = useState(false);
  const [socialMedia, setSocialMedia] = useState();

  const getClub = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/api/clubs/getClub/${asciName}`).then(response => {
      if (response.data) {
        setClubName(response.data.name);
        setClubData(response.data);
        setLogo(findLogo(response.data.name));
        setSocialMedia(findSocialMedia(response.data.name));
        setLoading(true);
      }
    }).catch(err => console.log(err))

  };
  function setTimeLoad() {
    setLoading(true);
  }

  useEffect(() => {
    getClub();
  }, [])

  var playerlist = ClubData.playerArray;
  console.log("social media: ", socialMedia);

  return (

    <div className="container-fluid">
      <div className="row"> <AppNavBar /> </div>

      <div id="club-details-container" className="col-12">
        <div id="club-info-section" className="row">
          <div id="club-logo" className="col-3"> {loading ? <a href={ClubData.website} target="_blank"> <img id="club-image" src={logo} /> </a> : <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border" /></div>} </div>
          <div id="club-info" className="col-9">
            <div id="c-i-h" className="row"> {loading ? <h1 id="c-info-head"> <b>{ClubData.full_name}</b> </h1> : <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border" /></div>} <br /> </div>
            <div id="c-i-t1" className="row"> {loading ? <p className="c-info-text"> <b>Founded:</b> {ClubData.founded}</p> : <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border" /></div>}  <br /> </div>
            <div id="c-i-t2" className="row"> {loading ? <p className="c-info-text"> <b>Stadium:</b> {ClubData.stadium}</p> : <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border" /></div>}  </div>
            <div id="c-i-g" className="row"> {loading ? <p className="c-g-info"> {ClubData.info}</p> : <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border" /></div>}  </div>
          </div>
        </div>
        <div className="row single-clup-page-table-social-flow">
          <div className="col-7">
            <div className="container players-table-container">
              <div id="table-head" className="row container text-center"> {loading ? <h2>Player List of {ClubData.name}</h2> : <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border" /></div>} </div>

              <div className="row">

                <div id="table">
                  <table className="players-table">
                    <thead className="players-table-head">
                      <tr>
                        <th className="players-table-head-th">Player Name</th> <th className="players-table-head-th">Number</th> <th className="players-table-head-th">Age</th> <th className="players-table-head-th">Height</th> <th className="players-table-head-th">Foot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerlist ?
                        (playerlist.length > 0 ?
                          playerlist.map((item) => {

                            return (

                              <tr className="players-table-tr" key={item.pName}>
                                <td className="players-table-name-col col-3">{item.pName}</td>
                                <td className="players-table-td col-1">{item.jerseyNumber}</td>
                                <td className="players-table-td col-1">{item.Age}</td>
                                <td className="players-table-td col-1">{item.height}</td>
                                <td className="players-table-td players-table-last-col col-1">{item.Foot}</td>
                              </tr>
                            );
                          }) : <></>) : <></>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-5">
            <div id="social-media-head" className="row container text-center">  <div className="d-flex justify-content-center"> <h2>Social Media </h2> </div> </div>

            <div>
              {loading ?
                <Timeline
                  dataSource={{ sourceType: "url", url: socialMedia.twitter }}
                  options={{ borderColor: "#FF0000", width: "80%", height: "800" }}
                />
                :
                <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border" /></div>
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
export default SingleClubPage