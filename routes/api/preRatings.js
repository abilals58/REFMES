const express = require("express");
const router = express.Router();
require("dotenv").config();
const PreRating = require('../../models/preRatingModel');
const Referee =require("../../models/refereemodel")
router.post("/addPreRating", async(req, res) => {
    const {rating, user_id, week_no, referee_id} = req.body;
    
    timeZone = 'Europe/Istanbul';
    const date = new Date().toLocaleString('en-US', { timeZone });
    
    const newPreRating = new PreRating({ rating, user_id, week_no, referee_id, date });

    try {
        const preRating = await PreRating.findOne({ user_id: user_id, week_no: week_no, referee_id: referee_id });
        if (preRating) throw Error('This pre rating already exists');

        const savedPreRating = await newPreRating.save();
        if (!savedPreRating) throw Error('Something went wrong while saving the pre rating');
        res.status(200).json(savedPreRating)
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
});
router.post("/refereeAddPreRating", async(req, res) => {
    const {rating, user_id, week_no, referee_id} = req.body;
    
    try {
        await Referee.findById(referee_id)
        .then(refData=>{
            //update correct week
            //console.log(refData);
            const PreRating = [...refData.preRating];
            PreRating[week_no][0] += rating;
            PreRating[week_no][1] += 1;
            //update Total
            PreRating[0][0] += rating;
            PreRating[0][1] += 1;
            Referee.findByIdAndUpdate(referee_id,{
                preRating:PreRating
            }).then(updateData =>{
                res.status(200).json(updateData)
                //console.log("updated data", updateData);
            })
        }).catch(err => {
            console.log(err);
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get("/getPreRating/:userID/:refereeID/:weekNo", async(req, res) => {
    try {
        await PreRating.find({ user_id: req.params.userID, referee_id: req.params.refereeID, week_no: req.params.weekNo }).then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;