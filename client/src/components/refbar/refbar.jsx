import React from "react";
import "../refbar/refbar.css";
import MeteKalkavan from "../refbar/refImage/mete-kalkavan.jpg";
import AliPalabiyik from "../refbar/refImage/ali-palabiyik.jpg";
import VolkanBayarslan from "../refbar/refImage/volkan-bayarslan.jpg"
import MertGuzenge from "../refbar/refImage/mert-güzenge.jpg"
import ArdaKardesler from "../refbar/refImage/arda-kardesler.png"
import UmıtOzturk from "../refbar/refImage/umit-öztürk.jpg"
import BahattinSimsek from "../refbar/refImage/bahattin-simsek.jpg"
import MustafaFiliz from "../refbar/refImage/kursad-filiz.jpg"
import ZorbayKucuk from "../refbar/refImage/zorbay-kucuk.jpg"
import AliSansalan from "../refbar/refImage/ali-sansalan.jpg"
import Atilla from "../refbar/refImage/atilla-karaoglan.jpg"
import HuseyinGocek from "../refbar/refImage/huseyin-gocek.jpg"
import SuatArslanboga from "../refbar/refImage/suat-arslanboga.jpg"
import CagdasAltay from "../refbar/refImage/cagdas-altay.jpg"
import Sarper from "../refbar/refImage/sarper.jpg"
import Bitigen from "../refbar/refImage/bitigen.jpg"
import HalilUmut from "../refbar/refImage/halil-umut.jpg"
import ErkanOzdamar from "../refbar/refImage/erkan-ozdamar.jpg"
import BurakSeker from "../refbar/refImage/burak-seker.jpg"
import YasinKol from "../refbar/refImage/yasin-kol.jpg"
import KadirSaglam from "../refbar/refImage/kadir-saglam.jpg"
import Tugay from "../refbar/refImage/tugay-numanoglu.jpg"
import YasarKemal from "../refbar/refImage/yasar-kemal.jpg"
import user_profile from "../refbar/user_profile.png"
import CommentBox from "../comment/commentbox";
import * as ReactBootstrap from "react-bootstrap";

import axios from "axios";
import { useState, useEffect } from "react";

function RefInfo({ refName }) {
  const [list, setList] = useState([]);
  const picname = refName.r_username;
  const images = [
    { id: "mete_kalkavan", src: MeteKalkavan },
    { id: "ali_palabiyik", src: AliPalabiyik },
    { id: "enis_mert_kuzu", src: user_profile },
    { id: "volkan_bayarslan", src: VolkanBayarslan },
    { id: "mert_guzenge", src: MertGuzenge },
    { id: "arda_kardesler", src: ArdaKardesler },
    { id: "umit_ozturk", src: UmıtOzturk },
    { id: "bahattin_simsek", src: BahattinSimsek },
    { id: "mustafa_kursad_filiz", src: MustafaFiliz },
    { id: "zorbay_kucuk", src: ZorbayKucuk },
    { id: "ali_sansalan", src: AliSansalan },
    { id: "atilla_karaoglan", src: Atilla },
    { id: "huseyin_gocek", src: HuseyinGocek },
    { id: "suat_arslanboga", src: SuatArslanboga },
    { id: "cagdas_altay", src: CagdasAltay },
    { id: "sarper_baris_saka", src: Sarper },
    { id: "abdulkadir_bitigen", src: Bitigen },
    { id: "halil_umut_meler", src: HalilUmut },
    { id: "erkan_ozdamar", src: ErkanOzdamar },
    { id: "burak_seker", src: BurakSeker },
    { id: "yasin_kol", src: YasinKol },
    { id: "kadir_saglam", src: KadirSaglam },
    { id: "tugay_kaan_numanoglu", src: Tugay },
    { id: "yasar_kemal_ugurlu", src: YasarKemal },
  ]
  const [loading, setLoading] = useState(false);
  var currentdate = new Date().getFullYear()
  const [refRatio, setRefRatio] = useState(0);
  const [fanRatio, setFanRatio] = useState(0);
  async function GetData() {
    await axios.all([
      axios.get(`${process.env.REACT_APP_URL}/api/referees/getComments/${refName._id}`),
      axios.get(`${process.env.REACT_APP_URL}/api/admin/getRefmesRatingWeights`)
    ]).then(
      axios.spread(
        (res1, res2) => {
          setList(res1.data); var wConstant = parseFloat(res2.data.wConstant)
          var wExperience = parseFloat(res2.data.wExperience)
          var wFan = parseFloat(res2.data.wFan)
          var wObserver = parseFloat(res2.data.wObserver)
          var mydate = refName.first_super_date.split(".")
          var experience = currentdate - parseInt(mydate[2])

          var observerRate = refName.observerRating[0][1] === 0 ? 0 : (refName.observerRating[0][0]) / (refName.observerRating[0][1])
          var FanRate = refName.preRating[0][1] === 0 ? 0 : (refName.preRating[0][0]) / (refName.preRating[0][1])
          var PostFan = refName.postRating[0][1] === 0 ? 0 : (refName.postRating[0][0]) / (refName.postRating[0][1])
          var total = (wConstant) + (observerRate*20) * wObserver + (FanRate*20) * wFan + (experience) * wExperience
          var ratio = (total /20).toFixed(2);
          setRefRatio(ratio);
          setFanRatio(PostFan.toFixed(2))
          setLoading(true)
        }
      )
    ).catch(err => console.log(err))


  }
  var result = (images.find(({ id }) => id === picname));
  if (result) {
    result = result.src
  }
  else {
    result = user_profile;
  }
  useEffect(() => {
    GetData();
  }, []);

  list.sort(function (a, b) {
    if (a.date < b.date) { return 1; }
    if (a.date > b.date) { return -1; }
    return 0;
  })
  //console.log(list);
  return (
    <div className="col">
      <div className="mt-5 row">
        <div className="col-sm-8 col-md-9">
          <div className="container d-flex justify-content-center">
            <div className="col-sm-8 col-md-11">
              <div className="card ">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 grad-color user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img src={result} className="img-radius" style={{ height: "80px" }} alt="User-Profile">
                        </img>
                      </div>
                      <h3 className="f-w-500">{refName.name}</h3>
                      <h6>Referee</h6>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-5 p-b-5 b-b-default f-w-500"> Personal Information </h6>
                      <div className="row">
                        <div className="col">
                          <p className="f-w-500 m-b-0">Place of birth:</p>
                          <h6 className="text-muted f-w-400">{refName.birth_place}</h6>
                        </div>
                        <div className="col">
                          <p className="f-w-500 m-b-0">Date of birth:</p>
                          <h6 className="text-muted f-w-400">{refName.birth_date}</h6>
                        </div>
                      </div>
                      <h6 className="m-b-10 p-b-5 p-t-15 b-b-default f-w-500">Referee information</h6>
                      <div className="row">
                        <div className="col">
                          <p className="f-w-500 m-b-0">FIFA referee:</p>
                          <h6 className="text-muted f-w-400">{refName.fifa_date}</h6>
                        </div>
                        <div className="col">
                          <p className="f-w-500 m-b-0" >First Super League Match:</p>
                          <h6 className="text-muted f-w-400">{refName.first_super_date}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-3 col-md-2">
          {loading ?
            <div className="d-flex justify-content-start">
              <div className="col-12">
                <div className="card">
                  <div className="refbar-header-background card-header t-center grad-color text-white">
                    REFMES Score
                  </div>
                  <div className="card-body">
                    <p className="card-text"></p>
                    <p className="f-w-700">{refRatio} / 5</p>
                    <footer className="text-muted text-center mt-1">machine learning-based score of the referee from ratings coming from the observers, and fans, plus the experience
                    </footer>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="d-flex justify-content-center">
              <ReactBootstrap.Spinner animation="border" />
            </div>
          }
        </div>
      </div>
      <div className="mt-3 row">
        <div className="col-sm-8 col-md-9">
          <div className="container d-flex justify-content-center">
            <div className="col-sm-8 col-md-11">
              <div className="card">
                <div className="refbar-header-background card-header t-center grad-color text-white f-w-500">
                  Short Biography
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {refName.biography}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-3 col-md-2">
          {loading ?
            <div className="d-flex justify-content-start">
              <div className="col-12">
                <div className="card">
                  <div className="refbar-header-background card-header t-center grad-color text-white">
                    Fans Rating
                  </div>
                  <div className="card-body">
                    <p className="card-text"></p>
                    <p className="f-w-700">{fanRatio} / 5</p>
                    <footer className="text-muted text-center mt-1">overall rating from the fans for the referee for the week
                    </footer>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="d-flex justify-content-center">
              <ReactBootstrap.Spinner animation="border" />
            </div>
          }
        </div>
      </div>
      <div className="padding-15 row">
        <div className="col-sm-8 col-md-9">
          <div className="container d-flex justify-content-center">
            <div className="col-sm-8 col-md-12">
              <div className="row">
                <h1 className="text-center">Latest Post-Match Comments</h1>
              </div>
              <div className="row">
                {list ?
                  (list.length > 0 ?
                    list.slice(0, 5).map((item) => {

                      return (
                        <div
                          key={item._id}
                        >
                          <div
                            className="container d-flex justify-content-center padding-b"
                          >
                            <CommentBox
                              commentPerson={item.user_info[0].full_name}
                              pComment={item.comment}
                              myDate={item.date}
                              MatchData={item.match_info}
                            >
                            </CommentBox>
                          </div>
                        </div>

                      );
                    }) : <div className="d-flex justify-content-center ref-no-comment-text"><p>No comment yet !!!</p></div>) :
                  <div className="d-flex justify-content-center">
                    <ReactBootstrap.Spinner animation="border" />
                  </div>

                }
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RefInfo;