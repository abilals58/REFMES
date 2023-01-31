import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Landing from "./pages/landing/landing.jsx";
import Signup from "./pages/signup/signup";
import { useStore } from "./store/store";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import ErrorPage from "./pages/error/error";
import ProfilePage from "./pages/profile/profile";
import EditPage from "./pages/edit/editpage";
import RefPage from "./pages/single-referee/singleRefPage";
import Postmatchlanding from "./pages/post-match/post-match-landing";
import Prematchlanding from "./pages/pre-match/pre-match-landing";
import AwardsPage from "./pages/awards/awards";
import WHighlightsPage from "./pages/weekly-highlights/weekly-highlights";
import MHighlightsPage from "./pages/monthly-highlights/monthly-highlights";
import SingleClubPage from "./pages/single-club/single-club";
import ClubsPage from "./pages/clubs/clubs";
import MatchesPage from "./pages/matches/matches";
import RefereesPage from "./pages/referees/referees";
import AdminPage from "./pages/admin/admin";
import AdminAuthPage from "./pages/admin-auth/admin-auth";
import AdminAddReferee from "./pages/admin-auth/addReferee";
import AdminSelectRefereeLanding from "./pages/admin-auth/selectref-landing";
import AdminAddObserver from "./pages/admin-auth/addObserver";
import AdminEnterResult from "./pages/admin-auth/enterResult";
import AdminSelectReferee from "./pages/admin-auth/selectReferee";
import AdminUpdateReferee from "./pages/admin-auth/updateReferee";
import PostMatchCommentPage from "./pages/post-match/post-match-comment";
import SingleMatchPage from "./pages/single-match/single-match";
import StandingPage from "./pages/standings/standings"
import MatchImportancePage from "./pages/match-importance/match-importance-landing";
import ObserverLoginPage from "./pages/observer/observerLogin";
import ObserverAuthPage from "./pages/observer-auth/observer-auth";
import ObserverRatingPage from "./pages/observer-auth/observerRating";
import RefmesRatingPage from "./pages/admin-auth/refmesRating";
import WHighlightsPageLanding from "./pages/weekly-highlights/weeklyHighlights-landing";
import AdminUpdatePreWeekPage from "./pages/admin-auth/adminUpdatePreWeek";
import AdminUpdatePostWeekPage from "./pages/admin-auth/adminUpdatePostWeek";
import AdminAnswerReportsPage from "./pages/admin-auth/adminAnswerReports";
import ForgotPassword from "./pages/login/forgotpassword";
import ResetPassword from "./pages/login/resetpassword";
import ReportPage from "./pages/report-page/report-page";
import VotingResult from "./pages/voting-result/voting-result";


function App() {
  const [state] = useStore();
  const { user: currentUser } = state;
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        { !currentUser ?
        <>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login/reset-password/:user_id/:token" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminPage />} />
        <Route path="/admin" element={<AdminAuthPage />} />
        <Route path="/admin/refmes_rating" element={<RefmesRatingPage />} />
        <Route path="/admin/update_pre_week" element={<AdminUpdatePreWeekPage />} />
        <Route path="/admin/update_post_week" element={<AdminUpdatePostWeekPage />} />
        <Route path="/admin/retrieve_referee_info" element={<AdminUpdateReferee />} />
        <Route path="/admin/add_referee" element={<AdminAddReferee />} />
        <Route path="/admin/add_observer" element={<AdminAddObserver />} />
        <Route path="/admin/adminAnswerReports" element={<AdminAnswerReportsPage />} /> 
        <Route path="/admin-auth/enterResult" element={<AdminEnterResult />} />
        <Route path="/admin-auth/selectReferee" element={<AdminSelectRefereeLanding />} />
        <Route path="/admin-auth/selectReferee" element={<AdminSelectReferee />} />
        <Route path="/observer" element={<ObserverLoginPage />} />
        <Route path="/observer-auth" element={<ObserverAuthPage />} />
        <Route path="/observer-auth/observerRating" element={<ObserverRatingPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/standings" element={<StandingPage/>} />
        <Route path="/livestatus" element={<MatchImportancePage/>} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/club/:asciName" element={<SingleClubPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/referees" element={<RefereesPage />} />
        <Route path="/ratingResults" element={<VotingResult/>} />
        </>
        :
        <>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/edit" element={< EditPage/>} />
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="/referee/:rUsername" element={<RefPage/>} />
        <Route path="/pre-match" element={<Prematchlanding />} />
        <Route path="/post-match" element={<Postmatchlanding/>} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/weeklyHighlights" element={<WHighlightsPageLanding />} />
        <Route path="/highlights/monthly" element={<MHighlightsPage />} />
        <Route path="/club/:asciName" element={<SingleClubPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/referees" element={<RefereesPage />} />
        <Route path="/match/:matchID/comment" element={<PostMatchCommentPage />} />
        <Route path="/match/:matchID" element={<SingleMatchPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/post-comment" element={<PostMatchCommentPage/>} />
        <Route path="/standings" element={<StandingPage/>} />
        <Route path="/livestatus" element={<MatchImportancePage/>} />
        <Route path="/ratingResults" element={<VotingResult/>} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="*" element={<ErrorPage />} />
        </>
}
      </Routes>
    </React.Suspense>
  );
}

export default App;
