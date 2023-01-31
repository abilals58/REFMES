import React from 'react'
import findLogo from '../clubLogos/clubLogos'
import "./adminMatchBox.css"
function AdminMatchbox({SingleMatchData}) {
    var team1_logo= findLogo(SingleMatchData.team_1);
    var team2_logo= findLogo(SingleMatchData.team_2);
  return (
    <div className='admin-matchbox-outer-container'>
        <div className="admin-matchbox-inner-container">
            <div className="admin-matchbox-inner-left">

                <div className="admin-matchbox-inner-left-name">
                    <p>{SingleMatchData.team_1}</p>
                </div>

                <div className="admin-matchbox-inner-left-image">
                    <img alt="Homeclub" className="admin-matchbox-inner-left-club-img" src={team1_logo}/>
                </div>

                <div className="admin-matchbox-inner-left-score">
                    <p>{SingleMatchData.team1goal}</p>
                </div>
            </div>
            <div className="admin-matchbox-inner-right">

                <div className="admin-matchbox-inner-right-score">
                    <p>{SingleMatchData.team2goal}</p> 
                </div>

                <div className="admin-matchbox-inner-right-image">
                    <img alt="Awayclub" className="admin-matchbox-inner-right-club-img" src={team2_logo}/>
                </div>

                <div className="admin-matchbox-inner-right-name">
                    <p>{SingleMatchData.team_2}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminMatchbox