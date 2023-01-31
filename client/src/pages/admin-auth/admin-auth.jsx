import React from "react";
import "../admin-auth/admin-auth.css";
import { useNavigate } from "react-router";
import AppNavBarSingle from "../../components/appnavbarsingle.jsx";

function AdminAuthPage(){
    const navigate = useNavigate();

    const goToRefmesRating = (e) => {
      navigate("/admin/refmes_rating")
    }

    const goToUpdatePreWeek = (e) => {
      navigate("/admin/update_pre_week")
    }

    const goToUpdatePostWeek = (e) => {
      navigate("/admin/update_post_week")
    }

    const goToRetrieveReferee = (e) => {
      navigate("/admin/retrieve_referee_info")
    }

    const goToAddReferee = (e) => {
      navigate("/admin/add_referee")
    }

    const goToAddObserver = (e) => {
      navigate("/admin/add_observer")
    }
    const goToAnswerReports = (e) => {
      navigate("/admin/adminAnswerReports")
    }

    return(
        <div>
            <AppNavBarSingle/>
            <div>
              <h1 style={{textAlign: "center", margin: "2em 0em 1em 0em"}}>Admin Control Panel</h1>
            </div>
            <div className="admin-auth-container container">
              <div className="row">
                <div className="admin-auth-btn-container col-12 d-flex justify-content-center">
                  <a onClick={goToRefmesRating} className="admin-auth-btn btn btn-warning">REFMES Referee Rating Algorithm</a>
                </div>
                <div className="admin-auth-btn-container col-12 d-flex justify-content-center">
                  <a onClick={goToUpdatePreWeek} className="admin-auth-btn btn btn-success">Update Pre-Week</a>
                </div>
                <div className="admin-auth-btn-container col-12 d-flex justify-content-center">
                  <a onClick={goToUpdatePostWeek} className="admin-auth-btn btn btn-success">Update Post-Week</a>
                </div>
                <div className="admin-auth-btn-container col-12 d-flex justify-content-center">
                  <a onClick={goToRetrieveReferee} className="admin-auth-btn btn btn-primary">Retrieve Referee Information</a>
                </div>
                <div className="admin-auth-btn-container col-12 d-flex justify-content-center">
                  <a onClick={goToAddReferee} className="admin-auth-btn btn btn-secondary">Add a New Referee</a>
                </div>
                <div className="admin-auth-btn-container col-12 d-flex justify-content-center">
                  <a onClick={goToAddObserver} className="admin-auth-btn btn btn-secondary">Add a New Observer</a>
                </div>
                <div className="admin-auth-btn-container col-12 d-flex justify-content-center">
                  <a onClick={goToAnswerReports} className="admin-auth-btn btn btn-secondary">Answer Reports</a>
                </div>
              </div>
            </div>
        </div>
    );
}
export default AdminAuthPage;