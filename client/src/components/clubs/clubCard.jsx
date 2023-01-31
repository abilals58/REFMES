import React from "react";
import findLogo from "../clubLogos/clubLogos";
import "../clubs/clubCard.css"

function ClubCard({clubName, asciName}){

    var logo= findLogo(clubName);

    return(

        <a href = {`/club/${asciName}`}> <div  className="club-card">
            <div className="club-card-image"> <img src= {logo}  className="card-img-top c-card-img" alt= {clubName}/> </div>
                <div className="card-body c_title ">
                    <h3 className="card-title">{clubName}</h3> 
                </div> 
            </div>
        </a>
    
    )
}
export default ClubCard


