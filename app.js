const url="https://places-dsn.algolia.net/1/places/query";
const APIkey ="cda591f223fc1aec5adf0498d5ca1a7c"
const listCity = document.querySelector("#listCity")
const keyword = document.querySelector("#keyword");
const windowResults = document.querySelector(".windowResults")
const city = document.querySelector("#city")
const temp = document.querySelector("#temp") 
const meteoDescription = document.querySelector("#meteoDescreption")
let localeName



//   appeller l'auto-completion en taper une ville  
keyword.addEventListener("keyup",(event)=>{
    // si la bar de recherche est vide, cacher la fenetre 
    if(!keyword.value){
        event.preventDefault();
        windowResults.style="display:none;";
        listCity.innerHTML=""; 
        // si non, afficher la fenetre    
    }else{
        windowResults.style="display:block;";
        // récuperer les resultats de l'autocomplete selon la ville 
        getCity(keyword.value)
    }   
})

// recuper la valeur une fois est envoyé 
document.querySelector("#searchBar").addEventListener("submit",(event)=>{
    event.preventDefault();
    getMeteoOfToday(keyword.value)
    getMeteoInfoOfFivedays(keyword.value)
    keyword.value=""     
})


getMeteoOfToday("marseille")
getMeteoInfoOfFivedays("marseille")






