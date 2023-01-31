const express = require("express");
const { response } = require("express");
const router = express.Router();
require("dotenv").config();
const Referee = require('../../models/refereemodel');
const Comments=require('../../models/commentModel');
const mongoose=require("mongoose");
const axios = require('axios')

const cheerio =require("cheerio");
  
router.get("/getref/:rUsername", async(req, res) => {
    try {
        await Referee.findOne({r_username: req.params.rUsername}).then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }}
);
router.get("/getrefbyId/:refid", async(req, res) => {
    try {
        await Referee.findById(req.params.refid).then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }}
);
router.get("/getAllref", async(req, res) => {
    //console.log("in backend");
    try {
        await Referee.find({}).then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }}
);
router.get("/getAllUpdatedref", async(req, res) => {
    try {
        await Referee.find({}).then((result) => {
            res.json(result);
        }).catch((err) => {
            throw err;
        });
    } catch (err) {
        res.status(500).json(err);
    }}
);
router.get("/getComments/:refid", async(req, res) => {
    try {
        await Comments.aggregate(
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
                        from:"matches",
                        localField:"match_id",
                        foreignField:"_id",
                        as:"match_info"
                    }
                
                },
                {$match:
                    {
                        referee_id:mongoose.Types.ObjectId(req.params.refid)
                    }
                }
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

router.get("/updateRef", async(req, res) => {
    try {
        const url = 'https://www.transfermarkt.com.tr/super-lig/schiedsrichter/wettbewerb/TR1/saison_id/2022/plus/1'
        var allRef=[];
        const getRef= async()=>{
        await axios(url)
        .then((response) => {
        const html=response.data;
        //console.log(html)
        const $=cheerio.load((html))
        const items=$('.grid-view');
        const alltr=items.find("tbody").find("tr");
        alltr.each((i,element)=>{
            let refName=$(element).find(".inline-table").find(".hauptlink").children("a").text();
            //console.log(name)
            const data=$(element).find(".zentriert")
            const Data=[];
            if(refName!="")
            {
                data.each((i,element)=>{
                    const refdata= $(element).text();
                    Data.push(refdata);
                    })
                
                allRef.push(
                    {refName,
                    firstMatch:Data[0],
                    totalMatch:Data[1],
                    yellowCard:(Data[2]=="-" ? 0:Data[2]),
                    avgYellowCard:(Data[3]=="-" ? 0:Data[3]),
                    yellowToRed:(Data[4]=="-" ? 0:Data[4]),
                    avgYellowToRed:(Data[5]=="-" ? 0:Data[5]),
                    redCard:(Data[6]=="-" ? 0:Data[6]),
                    avgRedCard:(Data[7]=="-" ? 0:Data[7]),
                    penalty:(Data[8]=="-" ? 0:Data[8]),
                    avgPenalty:(Data[9]=="-" ? 0:Data[9])
                });
            }
        })
        //console.log(ALL[14].Data[2]);
        
    }).catch((err) => {});
 }
    async function UpdateDatabase(item){
        try {
            var transfer_name=item.refName;
            updated_item = {

                username:transfer_name,
                totalMatch:item.totalMatch,
                yellowCard:item.yellowCard,
                avgYellowCard:item.avgYellowCard,
                redCard:item.redCard,
                avgRedCard:item.avgRedCard,
                penalty:item.penalty,
                avgPenalty:item.avgPenalty

            }
            
            const updatedRef=await Referee.findOneAndUpdate({t_name:transfer_name},{totalMatch:item.totalMatch, yellowCard:item.yellowCard, avgYellowCard:item.avgYellowCard,
                 redCard:item.redCard, avgRedCard:item.avgRedCard, penalty:item.penalty, avgPenalty:item.avgPenalty});

            // updatedReferee.findOneAndUpdate({t_name:username},{totalMatch:item.totalMatch}, {yellowCard:item.yellowCard}, {avgYellowCard:item.avgYellowCard},
            //      {redCard:item.redCard}, {avgRedCard:item.avgRedCard}, {penalty:item.penalty}, {avgPenalty:item.avgPenalty},
            //      function(err, ref){
            //         if(err){

            //             console.log(err);
            //         }
            //         else{
            //             console.log(ref);
            //         }
            // });
            
        } catch (error) {

        }
    }
    async function UpdateRef() {
        await getRef();
        allRef.forEach(UpdateDatabase);
        res.status(200).json(allRef);

    }
    UpdateRef();

    
    } catch (err) {
        res.status(500).json(err);
        }
    }
);



module.exports = router;