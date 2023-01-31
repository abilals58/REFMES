import { useStore } from "../../store/store";
import { useNavigate } from "react-router";
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import RefHighlightCard from "../../components/refbar/refhighlightcard";
import RefMostCommentCard from "../../components/refbar/refmostcommentcard";
import * as ReactBootstrap from "react-bootstrap";

function WHighlightsPage({ currentWeek }) {
    const [refereesOfWeek, setRefereesOfWeek] = useState([]);
    const [loading, setLoading] = useState(false);
    const getRefereesOfWeek = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/refereesOfWeek/getRefereesOfWeek/${currentWeek}`) //o hafta görev yapan hakemleri çekmiş oldum refereesOfWeek arrayine
            .then(res => {
                setRefereesOfWeek(res.data.myarray);
                setLoading(true);
            }).catch(err => console.log(err));
    };

    useEffect(() => {
        getRefereesOfWeek();
    }, []);

    function compareObserverVotes(a, b) {
        if (a.observerRating[currentWeek][0] / a.observerRating[currentWeek][1] < b.observerRating[currentWeek][0] / b.observerRating[currentWeek][1]) {
            return 1;
        }
        if (a.observerRating[currentWeek][0] / a.observerRating[currentWeek][1] > b.observerRating[currentWeek][0] / b.observerRating[currentWeek][1]) {
            return -1;
        }
        return 0;
    }
    function compareFanVotes(a, b) {
        if (a.postRating[currentWeek][0] / a.postRating[currentWeek][1] < b.postRating[currentWeek][0] / b.postRating[currentWeek][1]) {
            return 1;
        }
        if (a.postRating[currentWeek][0] / a.postRating[currentWeek][1] > b.postRating[currentWeek][0] / b.postRating[currentWeek][1]) {
            return -1;
        }
        return 0;
    }
    function compareComments(a, b) {
        if (a.postRating[currentWeek][2] < b.postRating[currentWeek][2]) {
            return 1;
        }
        if (a.postRating[currentWeek][2] > b.postRating[currentWeek][2]) {
            return -1;
        }
        return 0;
    }
    const sortedObserverVotes = refereesOfWeek.sort(compareObserverVotes);
    const bestObserverVotes = sortedObserverVotes.slice(0, 3);
    const worstObserverVote = sortedObserverVotes.slice(8);
    const sortedFanVotes = refereesOfWeek.sort(compareFanVotes);
    const bestFanVotes = sortedFanVotes.slice(0, 3);
    const worstFanVotes = sortedFanVotes.slice(8);
    const sortedComments = refereesOfWeek.sort(compareComments);
    const mostCommentedRef = sortedComments.slice(0, 1);
    return (
        <div>
            <div className="d-flex justify-content-center row">
                <div className="col-5 d-flex justify-content-center">
                    {loading && refereesOfWeek ?
                        <div className="text-center">
                            <h4>Best Referees for Observers in Week {currentWeek}</h4>
                            {bestObserverVotes.map((item) => {
                                return (<div id="best_observer" style={{ marginTop: "20px" }}>
                                    <RefHighlightCard Refdata={item} r_username={item.r_username} Refname={item.name} week={currentWeek}></RefHighlightCard>
                                </div>)
                            })}
                        </div>
                        :
                        <div>
                            <div className="d-flex justify-content-center">
                                <ReactBootstrap.Spinner animation="border" />
                            </div>
                        </div>
                    }
                </div>
                <div className="col-5 d-flex justify-content-center">
                    {loading && refereesOfWeek ?
                        <div className="text-center">
                            <h4>Best Referees for Fans in Week {currentWeek}</h4>
                            {bestFanVotes.map((item) => {
                                return (<div id="best_fan" style={{ marginTop: "20px" }}>
                                    <RefHighlightCard Refdata={item} r_username={item.r_username} Refname={item.name} week={currentWeek}></RefHighlightCard>
                                </div>)
                            })}
                        </div>
                        :
                        <div>
                            <div className="d-flex justify-content-center">
                                <ReactBootstrap.Spinner animation="border" />
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-5 d-flex justify-content-center">
                    {loading && refereesOfWeek ?
                        <div className="text-center mt-5">
                            <h4>Worst Referee for Observers in Week {currentWeek}</h4>
                            {worstObserverVote.map((item) => {
                                return (<div id="worst_observer" style={{ marginTop: "20px" }}>
                                    <RefHighlightCard Refdata={item} r_username={item.r_username} Refname={item.name} week={currentWeek}></RefHighlightCard>
                                </div>)
                            })}
                        </div>
                        :
                        <div>
                            <div className="d-flex justify-content-center">
                                <ReactBootstrap.Spinner animation="border" />
                            </div>
                        </div>
                    }
                </div>
                <div className="col-5 d-flex justify-content-center">
                    {loading && refereesOfWeek ?
                        <div className="text-center mt-5">
                            <h4>Worst Referee for Fans in Week {currentWeek}</h4>
                            {worstFanVotes.map((item) => {
                                return (<div id="worst_fan" style={{ marginTop: "20px" }}>
                                    <RefHighlightCard Refdata={item} r_username={item.r_username} Refname={item.name} week={currentWeek}></RefHighlightCard>
                                </div>)
                            })}
                        </div>
                        :
                        <div>
                            <div className="d-flex justify-content-center">
                                <ReactBootstrap.Spinner animation="border" />
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="d-flex justify-content-center">
                {loading && refereesOfWeek ?
                    <div className="text-center mt-5">
                        <h4>Most Commented Referee in Week {currentWeek}</h4>

                        {mostCommentedRef.map((item) => {
                            return (<div id="most_commented" style={{ marginTop: "20px" }}>
                                <RefMostCommentCard Refdata={item} r_username={item.r_username} Refname={item.name} week={currentWeek}></RefMostCommentCard>
                            </div>)
                        })}
                    </div>
                    :
                    <div>
                        <div className="d-flex justify-content-center">
                            <ReactBootstrap.Spinner animation="border" />
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}
export default WHighlightsPage