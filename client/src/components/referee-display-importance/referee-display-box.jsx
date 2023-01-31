import React from "react";

import "../referee-display-importance/referee-display-box.css";

function RefereeDisplayBox({ RefereeRank, RefereeData }) {
 console.log(RefereeData);
    return (
        <>
        <div className="referee-display-outer-container">
            <div className="referee-display-container">
                <div className="referee-display-rank-container">
                    <div className="referee-display-text">
                        <p className="referee-display-rank">{RefereeRank}</p>
                    </div>
                </div>
                <div className="referee-display-left-container">
                    <div className="referee-display-text">
                        <a className="referee-display-link" href={`/referee/${RefereeData.r_username}`}> {RefereeData.name}</a>
                    </div>
                </div>
                <div className="referee-display-right-container">
                    <div className="referee-display-text">
                        <div className="referee-display-point-circle">{RefereeData.ratio}</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
  }
  export default RefereeDisplayBox;