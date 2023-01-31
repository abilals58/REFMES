import React, { useEffect, useState } from "react";
import axios from "axios";
import WHighlightsPage from "./weekly-highlights";
import AppNavBar from "../../components/appnavbar.jsx";
import * as ReactBootstrap from "react-bootstrap";

function WHighlightsPageLanding() {
  const [week, setweek] = useState({});
  const [loading, setLoading] = useState(false);

  const getWeek = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/api/weeks/getPostWeek`).then(response => {
      setweek(response.data.week_no);
      setLoading(true);
    }).catch(err => console.log(err))
  };
  useEffect(() => {
    getWeek();
  }, [])

  return (
    <div>
      {loading ?
        <>
          <AppNavBar />
          <div>
            <h1 style={{ textAlign: "center", margin: "2em 0em 1em 0em" }}>Weekly Highlights for Week {week - 1}</h1>
          </div>
          <WHighlightsPage currentWeek={week - 1} />
        </>
        :
        <div className="d-flex justify-content-center">
          <ReactBootstrap.Spinner animation="border" />
        </div>
      }
    </div>
  )
};
export default WHighlightsPageLanding;