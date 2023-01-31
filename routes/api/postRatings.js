const express = require("express");
const { response } = require("express");
const router = express.Router();
require("dotenv").config();
const PostRating = require('../../models/postRatingModel');
const ObserverRating = require('../../models/observerRatingModel');
const Referee = require('../../models/refereemodel');

router.post("/addPostRating", async(req, res) => {
    const {rating, user_id, match_id, referee_id,week_no} = req.body;
    
    timeZone = 'Europe/Istanbul';
    const date = new Date().toLocaleString('en-US', { timeZone });
    
    const newPostRating = new PostRating({ rating, user_id, match_id, date });

    try {
        const postRating = await PostRating.findOne({ user_id: user_id, match_id: match_id });
        if (postRating) throw Error('This post rating already exists');

        const savedPostRating = await newPostRating.save();
        if (!savedPostRating) throw Error('Something went wrong while saving the post rating');
        res.status(200).json(savedPostRating)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get("/getPostRating/:matchID/:userID", async(req, res) => {
    try {
        await PostRating.find({ user_id: req.params.userID, match_id: req.params.matchID }).then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/addObserverRating", async(req, res) => {
    const {rating, observer_id, match_id, ref_id, week_no} = req.body;
    
    const newObserverRating = new ObserverRating({ rating, observer_id, match_id, ref_id, week_no});

    try {
        const observerRating = await ObserverRating.findOne({ observer_id: observer_id, match_id: match_id });
        if (observerRating) throw Error('This post rating already exists');

        const savedObserverRating = await newObserverRating.save();
        if (!savedObserverRating) throw Error('Something went wrong while saving the observer rating');

        // updating the array in the referees collection

    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


router.post("/findAndUpdateRef", async(req, res) => {

    const {rating, observer_id, match_id, ref_id, week_no} = req.body;
    console.log("in backend");
    // find and get referee
    await Referee.findById(ref_id)
    .then(refData => {
        console.log(refData.observerRating);
        const ObserverRating = [...refData.observerRating];
        console.log("new array", ObserverRating);
        //update weekly rating
        ObserverRating[week_no][0] += rating;
        ObserverRating[week_no][1] += 1;
        //update total rating
        ObserverRating[0][0] += rating;
        ObserverRating[0][1] += 1;
        console.log("updated array", ObserverRating);
        // find and update referee information
        Referee.findOneAndUpdate({_id:ref_id}, {observerRating: ObserverRating})
        .then(updateData =>{
            console.log("updated data", updateData);
        })
    })
    .catch(err => {
        console.log(err);
    });
    
});


router.get("/getObserverRating/:matchID/:observerID", async(req, res) => {
    try {
        await ObserverRating.find({ observer_id: req.params.observerID, match_id: req.params.matchID }).then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/refereeAddPostRating", async(req, res) => {
    const {rating, user_id, match_id, referee_id,week_no} = req.body;
    
    try {
        await Referee.findById(referee_id)
        .then(refData=>{
            //update correct week
            //console.log(refData);
            const PostRating = [...refData.postRating];
            PostRating[week_no][0] += rating;
            PostRating[week_no][1] += 1;
            //update Total
            PostRating[0][0] += rating;
            PostRating[0][1] += 1;
            Referee.findByIdAndUpdate(referee_id,{
                postRating:PostRating
            }).then(updateData =>{
                res.status(200).json(PostRating)
                //console.log("updated data", updateData);
            })
        }).catch(err => {
            console.log(err);
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});
module.exports = router;