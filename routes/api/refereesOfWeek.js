const express = require("express");
const { response } = require("express");
const router = express.Router();
require("dotenv").config();
const RefereesOfWeek = require('../../models/refereesOfWeekModel');
const PreRating=require("../../models/preRatingModel")
const myReferee = require('../../models/refereemodel');
router.get("/getRefereesOfWeek/:weekNo", async(req, res) => {
    try {
       var result=await RefereesOfWeek.findOne({week_no:req.params.weekNo})
       var RefArray=[];
       for (let index = 0; index < result.referee_ids.length; index++) {
        const RefID = result.referee_ids[index];
        var oneRef= await myReferee.findById(RefID)
        RefArray.push(oneRef);
       }
       var mydata={
        week_no:req.params.weekNo,
        myarray:RefArray
       }
        res.json(mydata);
            } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/getpointsRefereesOfWeek/:referee_id/:currentweek", async(req, res) => {
    //console.log(req.params.referee_id);
    try {
       await PreRating.find(
        {
            referee_id:req.params.referee_id,
            week_no:req.params.currentweek
        }
            ).then(result=>{
                res.json(result);
            })
            } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;