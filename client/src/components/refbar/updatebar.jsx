import "../refbar/updatebar.css"
import MeteKalkavan from "../refbar/refImage/mete-kalkavan.jpg";
import AliPalabiyik from "../refbar/refImage/ali-palabiyik.jpg";
import VolkanBayarslan from "../refbar/refImage/volkan-bayarslan.jpg"
import MertGuzenge from "../refbar/refImage/mert-güzenge.jpg"
import ArdaKardesler from "../refbar/refImage/arda-kardesler.png"
import UmitOzturk from "../refbar/refImage/umit-öztürk.jpg"
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

function UpdateRefBar({referee}){

    const picname = referee.r_username;
    const images = [
        { id: "mete_kalkavan", src: MeteKalkavan},
        { id: "ali_palabiyik", src: AliPalabiyik},
        { id: "enis_mert_kuzu", src: user_profile},
        { id:"volkan_bayarslan",src:VolkanBayarslan},
        { id:"mert_guzenge",src:MertGuzenge},
        { id:"arda_kardesler",src:ArdaKardesler},
        { id:"umit_ozturk",src:UmitOzturk},
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

      var picture=(images.find(({id})=>id === picname )).src;

    return(

        <div className="row ref-update-bar">
            <div className="col">

                <div className ="card ref-update-bar-card">
                <div className=" row ref-update-bar-card-row">
                <div className="ref-update-bar-card-img"> <img src= {picture} className="card-img-top ref-update-bar-img" alt={referee.name}/> </div>
                <div className="card-body">
                    <h5 className="card-title" style = {{textAlign:"center"}}>{referee.name}</h5>
                </div>
                </div>
                </div>

            </div>
        
            <div className="col ref-update-bar-ref-info">
                <h4 className="ref-update-bar-total-match-header">Total match</h4>
                <h1 className="ref-update-bar-total-match-num">{referee.totalMatch}</h1>

            </div>
            <div className="col"> 
                <div className="row ref-update-bar-ref-info">
                    <h5 className="ref-update-bar-ref-info-head">Yellow Card</h5> 
                    <h1 className="ref-update-bar-ref-info-num">{referee.yellowCard}</h1>
                    </div> 
                <div className="row ref-update-bar-ref-info">
                    <h5 className="ref-update-bar-ref-info-head">Avg Yellow Card</h5> 
                    <h1 className="ref-update-bar-ref-info-num">{referee.avgYellowCard}</h1>
                    </div>
            </div>
            <div className="col"> 

                <div className="row ref-update-bar-ref-info">
                    <h5 className="ref-update-bar-ref-info-head">Red Card</h5> 
                    <h1 className="ref-update-bar-ref-info-num">{referee.redCard}</h1>
                </div> 
                <div className="row ref-update-bar-ref-info">
                    <h5 className="ref-update-bar-ref-info-head">Avg Red Card</h5> 
                    <h1 className="ref-update-bar-ref-info-num">{referee.avgRedCard}</h1>
                </div>
            
            </div>
            <div className="col"> 

                <div className="row ref-update-bar-ref-info">
                    <h5 className="ref-update-bar-ref-info-head">Penalty</h5> 
                    <h1 className="ref-update-bar-ref-info-num">{referee.penalty}</h1>
                </div> 
                <div className="row ref-update-bar-ref-info">
                    <h5 className="ref-update-bar-ref-info-head">Avg Penalty</h5> 
                    <h1 className="ref-update-bar-ref-info-num">{referee.avgPenalty}</h1>    
                    
                </div>
            
            </div>
        </div>

        

    ) 

}
export default UpdateRefBar