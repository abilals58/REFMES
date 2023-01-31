import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import MLR from "ml-regression-multivariate-linear";
import AppNavBarSingle from "../../components/appnavbarsingle.jsx"
import * as ReactBootstrap from "react-bootstrap";
import "../admin-auth/refmes-rating.css"

function calculateRefmesRating(weights, totalFanRating, fanRatingCount, totalObserverRating, observerRatingCount, yearExperience) {
    const wFan = weights[0];
    const wObserver = weights[1];
    const wExperience = weights[2];
    const wConstant = weights[3];

    const fanRating = (totalFanRating / fanRatingCount) * 20;
    const observerRating = (totalObserverRating / observerRatingCount) * 20;

    const refmesPoint = (wFan * fanRating) + (wObserver * observerRating) + (wExperience * yearExperience) + wConstant;
    const refmesRating = (refmesPoint / 20).toFixed(2);

    return refmesRating;
}

function RefmesRatingPage(){
    const [errorMessage, setErrorMessage] = useState("To submit your new calculation, click on 'Send to the Database' button.");
    const [wFan, setWFan] = useState();
    const [wObserver, setWObserver] = useState();
    const [wExperience, setWExperience] = useState();
    const [wConstant, setWConstant] = useState();
    const [loading,setLoading] = useState(false);
    const [randomEx,setRandomexperience]=useState(0)
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [btnValue, setBtnValue] = useState("Calculate the Weights");

    const getWeights = async() => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/admin/getRefmesRatingWeights`)
            .then(res => {
                if (res.data) {
                    setWFan(res.data.wFan);
                    setWObserver(res.data.wObserver);
                    setWExperience(res.data.wExperience);
                    setWConstant(res.data.wConstant);
                    setLoading(true);
                }
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getWeights();
    }, [])

    // Fan Rating, Observer Rating, Experience of Referee

    const x = [
        [100, 100, 15],
        [100, 100, 10],
        [100, 100, 7],
        [100, 100, 5],
        [100, 100, 3],
        [100, 100, 1],
        [100, 90, 5],
        [100, 90, 1],
        [100, 80, 5],
        [100, 70, 5],
        [100, 60, 5],
        [100, 50, 5],
        [100, 40, 5],
        [100, 30, 5],
        [100, 0, 5],
        [90, 100, 5],
        [90, 100, 1],
        [80, 100, 5],
        [70, 100, 5],
        [60, 100, 5],
        [50, 100, 5],
        [40, 100, 5],
        [30, 100, 5],
        [0, 100, 5],
        [80, 80, 5],
        [60, 60, 5],
        [40, 40, 5],
        [20, 20, 5]];

    const y = [
        [102], // 100, 100, 15
        [101.5],
        [101],
        [100], // 100, 100, 5
        [99.5],
        [98],
        [96], // 100, 90, 5
        [95.5],
        [92],
        [88],
        [84],
        [80],
        [76],
        [72],
        [37], // 100, 0, 5
        [97], // 90, 100, 5
        [96.5],
        [96],
        [95],
        [94],
        [93],
        [92],
        [91],
        [90], // 0, 100, 5
        [81], // 80, 80, 5
        [65],
        [38],
        [18]];

    const mlr = new MLR(x, y);

    const PostDatabase = async (e)=> {
        var newWeights={
            fan:wFan,
            observer:wObserver,
            experience:wExperience,
            constant:wConstant
        }
        setBtnDisabled(true)
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_URL}/api/admin/postRefmesRatingWeights`,newWeights)
         .then(res =>{
            setErrorMessage("You have successfully added new weights to the database!");
            setBtnDisabled(false);

         }).catch(err=>console.log(err));
    };
    function getRndInteger(min, max) {
        return (Math.random() * (max - min) ) + min;
      }
      var doubleWfan= parseFloat(wFan)
      var doubleWObserver= parseFloat(wObserver)
      var doublewExperience= parseFloat(wExperience)
      var doublewconst= parseFloat(wConstant)
      function loadingwaiting() {
        setLoading(true)
        setBtnValue("Calculate the Weights")
        setBtnDisabled(false)
        setErrorMessage("New weights of the algorithm are calculated!")
      }
      const newRandom = (e) => {
        setBtnDisabled(true)
        setBtnValue("Calculating...")
        setLoading(false)
        var randomfan=getRndInteger(doubleWfan-0.03*doubleWfan,doubleWfan+0.03*doubleWfan)
        var randomObserver=getRndInteger(doubleWObserver-0.03*doubleWObserver,doubleWObserver+0.03*doubleWObserver)
        var randomExperience=getRndInteger(doublewExperience-0.03*doublewExperience,doublewExperience+0.03*doublewExperience)
        var randomconst=getRndInteger(doublewconst-0.006*doublewconst,doublewconst+0.006*doublewconst)
        
        setWFan(randomfan)
        setWObserver(randomObserver)
        setWExperience(randomExperience)
        setWConstant(randomconst)
        setTimeout(loadingwaiting,3000)
      }
    useEffect(() => {
    }, [randomEx])
    
    return(
        <div>
            <AppNavBarSingle/>
            <h1 style={{textAlign: "center", marginTop: "72px", marginBottom: "32px"}}>REFMES Rating</h1>

            <div className="row">
                    <div className="refmes-rating-outer-container">
                        <div className="refmes-rating-weight-container">
                            <div className="refmes-rating-weight-inner">
                            { loading ?
                                <p>Weight of Fan Rating: <b>{wFan}</b></p>
                                :
                                <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border"/></div>
                            }
                            </div>
                        </div>
                        <div className="refmes-rating-weight-container">
                            <div className="refmes-rating-weight-inner">
                            { loading ?
                                <p>Weight of Observer Rating: <b>{wObserver}</b></p>
                                :
                                <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border"/></div>
                            }
                            </div>
                        </div>
                        <div className="refmes-rating-weight-container">
                            <div className="refmes-rating-weight-inner">
                            { loading ?
                                <p>Weight of Referee Experience: <b>{wExperience}</b></p>
                                :
                                <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border"/></div>
                            }
                            </div>
                        </div>
                        <div className="refmes-rating-weight-container">
                            <div className="refmes-rating-weight-inner">
                            { loading ?
                                <p>Constant: <b>{wConstant}</b></p>
                                :
                                <div className="d-flex justify-content-center"><ReactBootstrap.Spinner animation="border"/></div>
                            }
                            </div>
                        </div>
                    </div>
                <div style={{minHeight:"100px", marginTop:"20px"}}  className="refmes-rating-outer-container">
                        <div className="refmes-rating-outer-container mt-4">
                            <input onClick={newRandom} style={{"width":400 }} type="submit" name="submitButton" disabled={btnDisabled} className="btn btn-success" value={`${btnValue}`}/>                   
                        </div>
                        <div className="refmes-rating-outer-container mt-4">
                            <input onClick={PostDatabase} style={{"width":400 }} type="submit" name="submitButton" disabled={btnDisabled} className="btn btn-warning" value="Send to the Database"/>                   
                        </div>
                        <div className="refmes-rating-outer-container mt-4">
                            <div className="refmes-rating-inner-container-error">
                                <p>{errorMessage}</p>
                            </div>
                        </div>
                </div>

            </div>

        </div>
    )
};
export default RefmesRatingPage;