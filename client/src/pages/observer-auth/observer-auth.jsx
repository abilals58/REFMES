import React from "react";
import logo from '../../logo.png';
import { useNavigate } from "react-router";
import { useStore } from "../../store/store";
import AppNavBarSingle from "../../components/appnavbarsingle.jsx";;

function ObserverAuthPage(){
    const [state, dispatch] = useStore();
    const {observer:CurrentObserver} = state;
    const navigate = useNavigate();
    const goToObserverRate = (e) => {
        navigate("/observer-auth/observerRating")
      }

    return(
        <div className="container-fluid">
            <AppNavBarSingle/>
            <div><h1 style = {{textAlign: 'center', color: 'red', marginTop: '30px'}}>OBSERVER PANEL</h1></div>
            <div style={{minHeight:"100px", marginTop:"20px"}}  className="row">
                    <button onClick={goToObserverRate} style={{margin: "0 auto", marginTop: '30px'}} type='submit' className="col-5 btn btn-block btn-success">
                    Rate Referee</button>
                    
            </div>
        </div>
    );
}
export default ObserverAuthPage;