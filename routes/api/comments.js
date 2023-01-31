const express = require("express");
const { response } = require("express");
const router = express.Router();
require("dotenv").config();
const Comment = require('../../models/commentModel');
const mongoose = require("mongoose");
const Referee =require("../../models/refereemodel")

router.post("/sendComment", async(req, res) => {
    const {comment, user_id, match_id, referee_id,week_no} = req.body;
    timeZone = 'Europe/Istanbul';
    const date = new Date().toLocaleString('en-US', { timeZone });
        
    const newComment = new Comment({ comment, user_id, match_id, referee_id, date });

    try {

        const savedComment = await newComment.save();
        if (!savedComment) throw Error('Something went wrong while saving the post rating');
        res.status(200).json(savedComment)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});
router.post("/refereeSendComment", async(req, res) => {
    const {comment, user_id, match_id,week_no, referee_id} = req.body;
    try {
        await Referee.findById(referee_id)
        .then(refData=>{
            //update correct week
            //console.log(refData);
            const PostRating = [...refData.postRating];
            PostRating[week_no][2] += 1;
            //update Total
            PostRating[0][2] += 1;
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
        console.log(e);
        res.status(400).json({ error: e.message });
    }
});

router.get("/getComments/:matchID", async(req, res) => {
    try {
        await Comment.aggregate(
            [
                {$lookup:
                    {
                        from:"users",
                        localField:"user_id",
                        foreignField:"_id",
                        as:"user_info"
                    }
                },
                {$lookup:
                    {
                        from:"referees",
                        localField:"referee_id",
                        foreignField:"_id",
                        as:"referee_info"
                    }
                },
                {$match: {match_id:mongoose.Types.ObjectId(req.params.matchID)}}
            ]
        )
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }}
);
router.get("/getUserComments/:userID", async(req, res) => {
    try {
        await Comment.aggregate(
            [
                {$lookup:
                    {
                        from:"matches",
                        localField:"match_id",
                        foreignField:"_id",
                        as:"match_infos"
                    }
                },
                {$lookup:
                    {
                        from:"referees",
                        localField:"referee_id",
                        foreignField:"_id",
                        as:"referee_info"
                    }
                },
                {$match: {user_id:mongoose.Types.ObjectId(req.params.userID)}}
            ]
        )
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }}
);
module.exports = router;