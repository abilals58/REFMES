const express = require("express");
const { response } = require("express");
const router = express.Router();
require("dotenv").config();
const Week = require('../../models/weekModel');

router.get("/getPreWeek", async(req, res) => {
    try {
        await Week.findOne({type: "pre-week"}).then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }}
);

router.get("/getPostWeek", async(req, res) => {
    try {
        await Week.findOne({type: "post-week"}).then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }}
);

router.post("/setWeek", async(req, res) => {
    const{ weekno,start_Date,end_Date}=req.body;
    try {
        const newWeek=new Week({week_no:weekno,start_date:start_Date,end_date:end_Date});
        const savedweek=await newWeek.save();
        res.status(200).json({
            savedweek: {
                week_no:savedweek.week_no,
                start_date:savedweek.start_date,
                end_date:savedweek.end_date
            }});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/getCurrentYear", async(req, res) => {
    try {
        var currentYear = new Date().getFullYear();
        res.json({currentYear});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;