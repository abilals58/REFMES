const express = require("express");
const { response } = require("express");
const router = express.Router();
require("dotenv").config();
const Match = require('../../models/matchModel');
const Club = require('../../models/clubModel');
const Standings=require("../../models/standingsModel")

router.post("/addMatch", async(req, res) => {
    const {week_no, referee_id, club1_id, club2_id, club1_goals, club2_goals} = req.body;
    const newMatch = new Match({ week_no, referee_id, club1_id, club2_id, club1_goals, club2_goals });

    try {
        const match = await Match.findOne({ week_no: week_no, club1_id: club1_id, club2_id: club2_id });
        if (match) throw Error('This match already exists');

        const savedMatch = await newMatch.save();
        if (!savedMatch) throw Error('Something went wrong while saving the match');

    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get("/getMatchDetailss/:matchID", async(req, res) => {
    try {
        await Match.find({_id: req.params.matchID}).then((result) => {
            res.json(result[0]);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/getMatchDetails/:weekNo", async(req, res) => {
    try {
       await Match.aggregate(
            [{$lookup:
                {
                    from:"referees",
                    localField:"referee_id",
                    foreignField:"_id",
                    as:"ref_info"
                }
            },
            {$lookup:
                {
                    from:"clubs",
                    localField:"club1_id",
                    foreignField:"_id",
                    as:"club1_info"
                }
            },
            {$lookup:
                {
                    from:"clubs",
                    localField:"club2_id",
                    foreignField:"_id",
                    as:"club2_info"
                }
            },
                {$match:{week_no:req.params.weekNo}}
            ]
            ).then(result=>{
                res.json(result);
            })
            } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/getSingleMatchDetails/:matchID", async(req, res) => {
    try {
       await Match.aggregate(
            [{$lookup:
                {
                    from:"referees",
                    localField:"referee_id",
                    foreignField:"_id",
                    as:"ref_info"
                }
            },
            {$lookup:
                {
                    from:"clubs",
                    localField:"club1_id",
                    foreignField:"_id",
                    as:"club1_info"
                }
            },
            {$lookup:
                {
                    from:"clubs",
                    localField:"club2_id",
                    foreignField:"_id",
                    as:"club2_info"
                }
            },
            { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: req.params.matchID} ] } } }
            ]
            ).then(result=>{
                res.json(result);
            })
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/getstandings", async(req, res) => {
    try {
        await Standings.find({}).then((result) => {
            res.json(result[0].allData);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/getWeekMatchDetails/:weekNo", async(req, res) => {
    try {
       await Match.aggregate(
            [
            {$lookup:
                {
                    from:"clubs",
                    localField:"club1_id",
                    foreignField:"_id",
                    as:"club1_info"
                }
            },
            {$lookup:
                {
                    from:"clubs",
                    localField:"club2_id",
                    foreignField:"_id",
                    as:"club2_info"
                }
            },
                {$match:{week_no:req.params.weekNo}}
            ]
            ).then(result=>{
                res.json(result);
            })
            } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
