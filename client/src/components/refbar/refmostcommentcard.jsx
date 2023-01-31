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
import YasarKemal from  "../refbar/refImage/yasar-kemal.jpg"
import user_profile from"../refbar/user_profile.png"
import { useNavigate } from "react-router";
import "../refbar/refhighlightcard.css"

import "../refbar/refcard.css"
function RefMostCommentCard({Refdata,r_username,Refname,week}) {
  const navigate = useNavigate();
  const picname = r_username;
  const images = [
    { id: "mete_kalkavan", src: MeteKalkavan},
    { id: "ali_palabiyik", src: AliPalabiyik},
    { id: "enis_mert_kuzu", src: user_profile},
    { id:"volkan_bayarslan",src:VolkanBayarslan},
    { id:"mert_guzenge",src:MertGuzenge},
    { id:"arda_kardesler",src:ArdaKardesler},
    { id:"umit_ozturk",src:UmıtOzturk},
    { id:"bahattin_simsek",src:BahattinSimsek},
    { id:"mustafa_kursad_filiz",src:MustafaFiliz},
    { id:"zorbay_kucuk",src:ZorbayKucuk},
    { id:"ali_sansalan",src:AliSansalan},
    { id:"atilla_karaoglan",src:Atilla},
    { id:"huseyin_gocek",src:HuseyinGocek},
    { id:"suat_arslanboga",src:SuatArslanboga},
    { id:"cagdas_altay",src:CagdasAltay},
    { id:"sarper_baris_saka",src:Sarper},
    { id:"abdulkadir_bitigen",src:Bitigen},
    { id:"halil_umut_meler",src:HalilUmut},
    { id:"erkan_ozdamar",src:ErkanOzdamar},
    { id:"burak_seker",src:BurakSeker},
    { id:"yasin_kol",src:YasinKol},
    { id:"kadir_saglam",src:KadirSaglam },
    { id:"tugay_kaan_numanoglu",src:Tugay},
    { id:"yasar_kemal_ugurlu",src:YasarKemal},
  ]
  var result=(images.find(({id})=>id ===picname));
  if(result){
    result=result.src
  }
  else{
    result=user_profile;
  }

    return(
        
            <div className="bg-color rounded shadow-sm pt-2 pb-2 px-2 ref-box-feature">
              <div className="ref-box-inner-container row">
                <div className="ref-box-inner-left col-4">
                    <img style={{marginTop:"10px"}} src={result}  width="100px" height="100px"></img>
                    <div className="mt-2 refcomment-hover-effect">
                      <a href={`/referee/${r_username}`}>{Refname}</a>
                    </div>
                    <div className="justify-content-center">
                      <span className=" text-color small text-uppercase">Referee</span>
                    </div>
                </div>
                
                <div className="ref-box-inner-right col-8">
                      
                        <div style={{marginTop:"20px"}} className="row justify-content-center">
                           
                             <p style={{fontSize:"20px",textAlign:"center"}} ><b> Number of Comments {Refname} Get In Week {week}</b></p>
                             <div className="referee-display-point-circle-WH" style={{fontSize:"50px"}}>{Refdata.postRating[week][2]}</div>
                            
                        </div>
                     
                </div>
              </div>
            </div>
                      
    );
    
}
export default RefMostCommentCard;