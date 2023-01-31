import React from "react";
import AppNavBar from "../../components/appnavbar.jsx"
import RefInfo from "../../components/refbar/refbar.jsx";
import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import * as ReactBootstrap from "react-bootstrap";

function RefPage() {
  const { rUsername } = useParams();
  const [allData, setallData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getRef = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/api/referees/getref/${rUsername}`).then(res => {
      setallData(res.data);
      setLoading(true);

    }).catch(err => console.log(err))
  };
  useEffect(() => {
    getRef();
  }, [])
  return (
    <div>
      <AppNavBar />
      {loading && allData ?
        <>
          <RefInfo refName={allData}></RefInfo>
        </>
        :
        <div className="d-flex justify-content-center">
          <ReactBootstrap.Spinner animation="border" />
        </div>
      }
    </div>

  );
}
export default RefPage;