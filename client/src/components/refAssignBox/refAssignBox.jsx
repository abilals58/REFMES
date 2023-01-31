import React from "react";
import "../refAssignBox/refAssignBox.css";

function RefAssignBox({ refereeData, matchData, idx }) {

    return (
        <>
        <div className="ref-assign-box-container col-sm-12 col-md-6 col-lg-4">
            <div className="ref-assign-box-details">
                <p><b>Referee {idx+1}:</b> {refereeData.name} ({refereeData.ratio})</p>
                <p>{matchData.club1} vs. {matchData.club2}</p>
            </div>
        </div>
        </>
    );
  }
  export default RefAssignBox;