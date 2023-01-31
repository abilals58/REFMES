import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { useStore } from "../../store/store";
import "../post-comment/post-comment.css";
import "../matchbox/matchbox.css"
import logoFenerbahce from '../../logos/fenerbahce.png';
import logoGalatasaray from '../../logos/galatasaray.png';
import logoBesiktas from '../../logos/besiktas.png';
import logoBasaksehir from '../../logos/basaksehir.png';
import logoAdanaDemirspor from '../../logos/adana_demirspor.png';
import logoKonyaspor from '../../logos/konyaspor.png';
import logoHatayspor from '../../logos/hatayspor.png';
import logoGiresunspor from '../../logos/giresunspor.png';
import logoAlanyaspor from '../../logos/alanyaspor.png';
import logoSivasspor from '../../logos/sivasspor.png';
import logoAntalyaspor from '../../logos/antalyaspor.png';
import logoGaziantepFK from '../../logos/gaziantep_fk.png';
import logoUmraniyespor from '../../logos/umraniyespor.png';
import logoIstanbulspor from '../../logos/istanbulspor.png';
import logoKasimpasa from '../../logos/kasimpasa.png';
import logoAnkaragucu from '../../logos/ankaragucu.png';
import logoTrabzonspor from '../../logos/trabzonspor.png';
import logoKaragumruk from '../../logos/karagumruk.png';
import logoKayserispor from '../../logos/kayserispor.png';

const clubs = [
    { name: "Fenerbahçe", src: logoFenerbahce},
    { name: "Galatasaray", src: logoGalatasaray},
    { name: "Beşiktaş", src: logoBesiktas},
    { name: "Başakşehir", src: logoBasaksehir},
    { name: "Adana Demirspor", src: logoAdanaDemirspor},
    { name: "Konyaspor", src: logoKonyaspor},
    { name: "Hatayspor", src: logoHatayspor},
    { name: "Giresunspor", src: logoGiresunspor},
    { name: "Alanyaspor", src: logoAlanyaspor},
    { name: "Sivasspor", src: logoSivasspor},
    { name: "Antalyaspor", src: logoAntalyaspor},
    { name: "Gaziantep FK", src: logoGaziantepFK},
    { name: "Ümraniyespor", src: logoUmraniyespor},
    { name: "İstanbulspor", src: logoIstanbulspor},
    { name: "Kasımpaşa", src: logoKasimpasa},
    { name: "Ankaragücü", src: logoAnkaragucu},
    { name: "Trabzonspor", src: logoTrabzonspor},
    { name: "Karagümrük", src: logoKaragumruk},
    { name: "Kayserispor", src: logoKayserispor},
  ]

function PostCommentBox({ matchData }) {

    const [state, dispatch] = useStore();
    const {user:currentUser} = state;
    const [errorMessage, setErrorMessage] = useState("");
    const [comment, setComment] = useState("");
    const [isEmptyComment, setIsEmptyComment] = useState(false);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isDisable, setisDisable] = useState(false);

    const onSubmit = async(data, e) => {
        e.preventDefault();
        setisDisable(true);
        if (comment === "") {
            setIsEmptyComment(true);
            setisDisable(false);
        } else {
            setIsEmptyComment(false);
            const newComment = { comment: comment, user_id: currentUser.user.id, match_id: matchData._id, referee_id: matchData.ref_info[0]._id, week_no:matchData.week_no};
            await axios.all([
                axios.post(`${process.env.REACT_APP_URL}/api/comments/sendComment`, newComment),
                axios.post(`${process.env.REACT_APP_URL}/api/comments/refereeSendComment`, newComment)])
            .then(axios.spread((res1,res2) => {
                if (res1.status === 200 && res2.status === 200) {
                    setErrorMessage("Your comment successfully submitted. Previous page is loading..");
                    setTimeout(PreviousPage,2000);
                } 
                 else {
                    setErrorMessage("Error! Please try again.");
                    setisDisable(false);
                }
            })).catch((err) => {
                setErrorMessage("Error! Something went wrong.");
                setisDisable(false);
            });
        }
    }
    function PreviousPage() {
        navigate("/post-match")
    }
    return (
        <>
       <div className="post-comment-outer-container">
            <div className="matchbox-inner-container">
                <div className="matchbox-inner-left">
                    <div className="matchbox-inner-left-name">
                        <p>{matchData.club1_info[0].name}</p>
                    </div>
                    <div className="matchbox-inner-left-image">
                        <img alt="Homeclub" className="matchbox-inner-left-club-img" src={(clubs.find(({name})=>name === matchData.club1_info[0].name)).src}/>
                    </div>
                    <div className="matchbox-inner-left-score">
                        <p>{matchData.club1_goals}</p>
                    </div>
                </div>

                <div className="matchbox-inner-right">
                    <div className="matchbox-inner-right-score">
                         <p>{matchData.club2_goals}</p>
                    </div>
                    <div className="matchbox-inner-right-image">
                        <img alt="Awayclub" className="matchbox-inner-right-club-img" src={(clubs.find(({name})=>name === matchData.club2_info[0].name)).src}/>
                    </div>
                    <div className="matchbox-inner-right-name">
                        <p>{matchData.club2_info[0].name}</p>
                    </div>
                </div>
            </div>
            <div className="post-comment-referee">
                <a href={`../referee/${matchData.ref_info[0].r_username}`}><b>{matchData.ref_info[0].name}</b></a>
            </div>
            <div>
                <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <br/><textarea {...register("comment")} className="form-control" onChange={(e)=>setComment(e.target.value)} name="comment" cols="75" rows="5" placeholder="Type your comment here.."></textarea>
                    {isEmptyComment ? <div className="post-comment-comment-error"><p>Please enter a comment to send.</p></div> : <></>}
                    <div className="post-comment-comment-error"><p>{errorMessage}</p></div>
                    <br/><input disabled={isDisable} type="submit" name="submitButton" className="btn btn-success" value={`Send`}/>
                </form>
                </div>
            </div>
        </div>
        </>
    );
  }
  
  export default PostCommentBox;