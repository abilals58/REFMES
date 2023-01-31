import React from "react";
import AppNavBar from "../../components/appnavbar.jsx"

function ErrorPage() {
    return (
      <div>
        <AppNavBar/>
        <h1 style={{textAlign: "center", marginTop: "172px"}}>Opps, something went wrong!</h1>
      </div>
    );
  }
  export default ErrorPage;