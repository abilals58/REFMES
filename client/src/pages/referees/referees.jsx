import { useStore } from "../../store/store";
import AppNavBar from "../../components/appnavbar.jsx";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../referees/referees.css"
import RefCard from "../../components/refbar/refcard"
import * as ReactBootstrap from "react-bootstrap";

function RefereesPage() {
  const [allData, setallData] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllRef = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/api/referees/getAllref`).then(res => {
      setallData(res.data);
      setLoading(true);

    }).catch(err => console.log(err))
  };
  useEffect(() => {
    getAllRef();
  }, [])

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  if (loading) {
    allData.sort(compare);
  }
  return (
    <div>
      <AppNavBar />
      <div><h1 style={{ textAlign: "center", margin: "2em 0em" }}>Super League Referees</h1></div>
      <div className="mt-3 container allref-container-center">
        <div className="row text-center mb-5">
          {allData ?
            (allData.length > 0 ?
              allData.map((item) => {
                return (
                  <div key={item.r_username} className="d-flex justify-content-center col-xl-6 col-m-6 col-sm-12 mb-2">
                    <RefCard Refdata={item} r_username={item.r_username} Refname={item.name}></RefCard>
                  </div>

                );
              }) :
              <div className="d-flex justify-content-center">
                <ReactBootstrap.Spinner animation="border" />
              </div>)
            :

            <div className="d-flex justify-content-center">
              <ReactBootstrap.Spinner animation="border" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default RefereesPage

