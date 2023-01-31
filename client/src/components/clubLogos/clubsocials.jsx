//importing all club logos
function findSocialMedia(clubName){

     // declaring the logos dictionary
     const clubs = [
        { name: "Fenerbahçe", twitter:"https://twitter.com/Fenerbahce" ,instagram: "https://www.instagram.com/fenerbahce/"},
        { name: "Galatasaray", twitter:"https://twitter.com/GalatasaraySK" ,instagram: "https://www.instagram.com/galatasaray/"},
        { name: "Beşiktaş", twitter:"https://twitter.com/Besiktas",instagram: "https://www.instagram.com/galatasaray/"},
        { name: "Başakşehir", twitter:"https://twitter.com/ibfk2014",instagram: "https://www.instagram.com/ibfk2014/"},
        { name: "Adana Demirspor", twitter:"https://twitter.com/AdsKulubu",instagram: "https://www.instagram.com/adskulubu/"},
        { name: "Konyaspor", twitter:"https://twitter.com/konyaspor",instagram: "https://www.instagram.com/konyaspor/"},
        { name: "Hatayspor", twitter:"https://twitter.com/Hatayspor_FK",instagram: "https://www.instagram.com/hatayspor/"},
        { name: "Giresunspor", twitter:"https://twitter.com/Giresunspor",instagram: "https://www.instagram.com/giresunspor/"},
        { name: "Alanyaspor", twitter:"https://twitter.com/Alanyaspor",instagram: "https://www.instagram.com/alanyaspor/"},
        { name: "Sivasspor", twitter:"https://twitter.com/Sivasspor",instagram: "https://www.instagram.com/sivasspor/"},
        { name: "Antalyaspor", twitter:"https://twitter.com/Antalyaspor",instagram: "https://www.instagram.com/antalyaspor/"},
        { name: "Gaziantep FK", twitter:"https://twitter.com/GaziantepFK",instagram: "https://www.instagram.com/gaziantepfk/"},
        { name: "Ümraniyespor", twitter:"https://twitter.com/Umraniyespor",instagram: "https://www.instagram.com/umraniyespor/"},
        { name: "İstanbulspor", twitter:"https://twitter.com/istanbulspor",instagram: "https://www.instagram.com/istanbulspor/  "},
        { name: "Kasımpaşa", twitter:"https://twitter.com/kasimpasa",instagram: "https://www.instagram.com/kasimpasask/"},
        { name: "Ankaragücü", twitter:"https://twitter.com/Ankaragucu",instagram: "https://www.instagram.com/ankaragucu/"},
        { name: "Trabzonspor", twitter:"https://twitter.com/Trabzonspor",instagram: "https://www.instagram.com/trabzonspor/"},
        { name: "Karagümrük", twitter:"https://twitter.com/karagumruk_sk",instagram: "https://www.instagram.com/karagumruk_sk/"},
        { name: "Kayserispor", twitter:"https://twitter.com/KayserisporFK",instagram: "https://www.instagram.com/kayserisporfk/"},
      ]

     // logo = related image source
     var clubinfo=(clubs.find(({name})=>name === clubName ));
     
    return(clubinfo)

}

export default findSocialMedia