import React from "react";
import {useState,useEffect} from "react"
import axios from "axios";
import SortedMatches from "./match-standings.jsx";
import RefereeDisplayBox from "../../components/referee-display-importance/referee-display-box.jsx";
import * as ReactBootstrap from "react-bootstrap";

function RefereeDisplay({RefData,CurrentWeek}) {
  var mydate=RefData[0].first_super_date.split(".")
  var currentdate=new Date().getFullYear()
  //console.log(currentdate-parseInt(mydate[2]));
    const[loading,setLoading] = useState(false);
    const[Refarray,setRefarray] = useState([]);

    const getallrefpoints = async()=>{
      let mydata=[]
      for (let index = 0; index < RefData.length; index++) {
        const oneRef = RefData[index];     
        var mydate= oneRef.first_super_date.split(".")
        mydata.push(
          {
            name:oneRef.name,
            observerPoint:oneRef.observerRating[0][1]===0 ? 0 : (oneRef.observerRating[0][0] /oneRef.observerRating[0][1]),
            fanPoint:oneRef.preRating[0][1]===0 ? 0 : (oneRef.preRating[0][0] /oneRef.preRating[0][1]),
            experience:currentdate-parseInt(mydate[2]),
            ratio:0,
            r_username:oneRef.r_username
          })
      }
      await axios.get(`${process.env.REACT_APP_URL}/api/admin/getRefmesRatingWeights`)
         .then(res =>{
          //console.log("Refmes rate: ",res.data);
          var wConstant=parseFloat(res.data.wConstant)
          var wExperience= parseFloat(res.data.wExperience)
          var wFan=parseFloat(res.data.wFan)
          var wObserver=parseFloat(res.data.wObserver)
          for (let index = 0; index < mydata.length; index++) {
            const arrayelement = mydata[index];
            if(arrayelement.observerPoint===0 && arrayelement.fanPoint===0){
              arrayelement.ratio=0.00.toFixed(2);
            }
            else{
              var total=(wConstant) +(arrayelement.observerPoint*20)* wObserver + (arrayelement.fanPoint*20)* wFan + (arrayelement.experience)* wExperience;
              arrayelement.ratio=(total/20).toFixed(2)
            }
            // var total=(wConstant) +(arrayelement.observerPoint)* wObserver + (arrayelement.fanPoint)* wFan + (arrayelement.experience)* wExperience;
            // arrayelement.ratio=(total/20).toFixed(2)
          }
          setRefarray(mydata);
          setLoading(true);

         }).catch(err=>console.log(err));
    };
    useEffect(() => {
      getallrefpoints();
    }, [])

  if(Refarray)
  {
    Refarray.sort(function(a, b){
      if(a.ratio < b.ratio) { return 1; }
      if(a.ratio > b.ratio) { return -1; }
      return 0;
    })
  }

    return (
        <div>
        {loading ?
        <div className="mt-1">
            { Refarray? 
            (Refarray.map((item,index)=>{
                return(
                    <div key={item.name} className="match-importance-box-class">
                      <RefereeDisplayBox RefereeData={item} RefereeRank={index+1}/>
                    </div>
                )
            }))
            :
            <div className="d-flex justify-content-center">
                <ReactBootstrap.Spinner animation="border"/>
            </div>
            }
        </div>
        :
        <div className="d-flex justify-content-center">
            <ReactBootstrap.Spinner animation="border"/>
        </div>
        }
      </div>
    );
  }
  export default RefereeDisplay;