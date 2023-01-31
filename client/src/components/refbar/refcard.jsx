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
import { useNavigate } from "react-router";


import "../refbar/refcard.css"
function RefCard({ Refdata, r_username, Refname }) {
  const navigate = useNavigate();
  const picname = r_username;
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
  var result = (images.find(({ id }) => id === picname));
  if (result) {
    result = result.src
  }
  else {
    result = user_profile;
  }

  return (
    <>
      <a className="ref-click-all w-100 m-1" href={`/referee/${r_username}`}>
        <div className="ref-box-outer-container bg-color rounded shadow-sm px-4 py-5 m-1 ref-box-feature">
          <div className="ref-box-inner-container">
            <div className="ref-box-inner-left">
              <img src={result} width="90" height="90"></img>
              <div className="mt-2 ref-hover-effect">
                <p className="refcard-ref-name" >{Refname}</p>
              </div>
              <div>
                <span className=" text-color small text-uppercase">Referee</span>
              </div>
              <div className="ref-box-inner-total-match">
                <p className="ref-box-items-size">Total Match</p>
                <p className="ref-box-items-size">{Refdata.totalMatch}</p>
              </div>
            </div>

            <div className="ref-box-inner-right">
              <div className="ref-box-right-row">
                <div className="ref-score-box">
                  <p className="ref-box-items-size">Total Yellow Card </p>
                  <p className="ref-box-items-size">{Refdata.yellowCard}</p>
                  <p className="ref-box-items-size">Avg Yellow Card </p>
                  <p className="ref-box-items-size">{Refdata.avgYellowCard}</p>
                </div>

                <div className="ref-score-box">
                  <p className="ref-box-items-size">Total Red Card </p>
                  <p className="ref-box-items-size">{Refdata.redCard}</p>
                  <p className="ref-box-items-size">Avg Red Card </p>
                  <p className="ref-box-items-size">{Refdata.avgRedCard} </p>
                </div>
              </div>
              <hr className="ref-box-divider"></hr>
              <div className="ref-box-right-row">
                <div className="ref-score-box">
                  <p className="ref-box-items-size">Total Yellow to Red </p>
                  <p className="ref-box-items-size">{(Refdata.yellowToRed)}</p>
                  <p className="ref-box-items-size">Avg Yellow to Red </p>
                  <p className="ref-box-items-size">{(Refdata.yellowToRed / Refdata.totalMatch).toFixed(1)} </p>
                </div>
                <div className="ref-score-box">
                  <p className="ref-box-items-size">Total Penalty </p>
                  <p className="ref-box-items-size">{Refdata.penalty}</p>
                  <p className="ref-box-items-size">Avg Penalty </p>
                  <p className="ref-box-items-size">{Refdata.avgPenalty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  );

}
export default RefCard;