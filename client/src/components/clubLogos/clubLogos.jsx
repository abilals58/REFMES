//importing all club logos
import logoFenerbahce from '../../logos/fenerbahce.png';
import logoGalatasaray from '../../logos/galatasaray.png';
import logoBesiktas from '../../logos/besiktas.png';
import logoBasaksehir from '../../logos/basaksehir.png';
import logoAdanaDemirspor from '../../logos/adana_demirspor.png';
import logoKonyaspor from '../../logos/konyaspor.png';
import logoHatayspor from '../../logos/hatayspor.png';
import logoGiresunspor from '../../logos/giresunspor.png';
import logoAlanyaspor from '../../logos/alanyaspor.png';
import logoSivasspor from '../../logos/sivasspor.png';
import logoAntalyaspor from '../../logos/antalyaspor.png';
import logoGaziantepFK from '../../logos/gaziantep_fk.png';
import logoUmraniyespor from '../../logos/umraniyespor.png';
import logoIstanbulspor from '../../logos/istanbulspor.png';
import logoKasimpasa from '../../logos/kasimpasa.png';
import logoAnkaragucu from '../../logos/ankaragucu.png';
import logoTrabzonspor from '../../logos/trabzonspor.png';
import logoKaragumruk from '../../logos/karagumruk.png';
import logoKayserispor from '../../logos/kayserispor.png';


function findLogo(clubName){

     // declaring the logos dictionary
     const clubs = [
        { name: "Fenerbahçe", src: logoFenerbahce},
        { name: "Galatasaray", src: logoGalatasaray},
        { name: "Beşiktaş", src: logoBesiktas},
        { name: "Başakşehir", src: logoBasaksehir},
        { name: "Adana Demirspor", src: logoAdanaDemirspor},
        { name: "Konyaspor", src: logoKonyaspor},
        { name: "Hatayspor", src: logoHatayspor},
        { name: "Giresunspor", src: logoGiresunspor},
        { name: "Alanyaspor", src: logoAlanyaspor},
        { name: "Sivasspor", src: logoSivasspor},
        { name: "Antalyaspor", src: logoAntalyaspor},
        { name: "Gaziantep FK", src: logoGaziantepFK},
        { name: "Ümraniyespor", src: logoUmraniyespor},
        { name: "İstanbulspor", src: logoIstanbulspor},
        { name: "Kasımpaşa", src: logoKasimpasa},
        { name: "Ankaragücü", src: logoAnkaragucu},
        { name: "Trabzonspor", src: logoTrabzonspor},
        { name: "Karagümrük", src: logoKaragumruk},
        { name: "Kayserispor", src: logoKayserispor},
      ]

     // logo = related image source
     var logo=(clubs.find(({name})=>name === clubName )).src;
     
    return( logo)

}

export default findLogo