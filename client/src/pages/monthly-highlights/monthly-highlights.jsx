import { useStore } from "../../store/store";
import AppNavBar from "../../components/appnavbar.jsx";
import { useNavigate } from "react-router";
import React, { useCallback, useState } from "react";
import axios from "axios";

function MHighlightsPage() {
    return(
        <div>
            <AppNavBar/>
            <h1 style={{textAlign: "center", marginTop: "172px"}}>Monthly Highlights Page</h1>
        </div>
    )
}
export default MHighlightsPage