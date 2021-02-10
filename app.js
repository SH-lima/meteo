const url="https://places-dsn.algolia.net/1/places/query";
const APIkey ="cda591f223fc1aec5adf0498d5ca1a7c"
const listCity = document.querySelector("#listCity")
const keyword = document.querySelector("#keyword");
const windowResults = document.querySelector(".windowResults")
const city = document.querySelector("#city")
const temp = document.querySelector("#temp") 
const meteoDescription = document.querySelector("#meteoDescreption")

// creer un requet pour recuper des donnees pour l'auto-complete
const getCity = (info)=>{
    fetch(url, {
        method:"POST",
        body:JSON.stringify({
            query:info
        })
    })
    .then(response => response.json())
    .then( (data) => {
         console.log(data)
        //  pour enlever les resultats precedentes 
        listCity.innerHTML="";
        data.hits.forEach(element => {

            // changer le style de bar de recherche 
            keyword.classList.add("borderBottom")
            // inserer les resultats de auto-completion dans une fenetre 
            listCity.insertAdjacentHTML("beforeend", 
            `<button>${element.locale_names.default[0]}</button>`
            )    
        });
        // revenir sur le style initienl 
        keyword.classList.remove("borderBottom")
    })
}

//   appeller l'auto-completion en taper une ville  
keyword.addEventListener("keyup",(event)=>{
    // si la bar de recherche est vide, cacher la fenetre 
    if(!keyword.value){
        event.preventDefault();
        windowResults.style="display:none;";
        listCity.innerHTML=""; 
        // si non afficher la fenetre    
    }else{
        windowResults.style="display:block;";
        getCity(keyword.value)
    }   
})
// recuper la valeur une fois est envoyé 
document.querySelector("#searchBar").addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log(keyword.value)
    getMeteoOfToday()
    getMeteoInfoOfFivedays()
    keyword.value=""     
})

// recuper la meteo de aujourd'hui
const getMeteoOfToday = ()=>{
    // effacer  les infos precedentes 
    city.innerHTML="";
    temp.innerHTML="";
    meteoDescription.innerHTML="";
    city.insertAdjacentHTML("beforeend", `<h3>${keyword.value}</h3>`)
    // creer une requet
    const urlAPI = `http://api.openweathermap.org/data/2.5/find?q=${keyword.value}&units=metric&APPID=cda591f223fc1aec5adf0498d5ca1a7c`
    fetch(urlAPI)   
    .then(response => response.json())
    .then((data)=>{
        // console.log(data)
        temp.insertAdjacentHTML("beforeend", `<h3>${data.list[0].main.temp}</h3>`)
        meteoDescription.insertAdjacentHTML("beforeend",
         `<h3>${data.list[0].weather[0].main}</h3>
         <i ${data.list[0].weather[0].icon}></i>
         `)
    })}


// regrouper les infos meteo et le graphique dans une fonction 
const getMeteoInfoOfFivedays = ()=>{
    // creer une requet pour recuper le meteo de 5 prochain jour 
    const dateFiveDays =[]
    const tempFiveDays =[];    
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${keyword.value}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        data.list.forEach((element)=>{
            if(element.dt_txt.includes("12:00:00")){
            dateFiveDays.push(element.dt_txt)
            tempFiveDays.push(element.main.temp)   
            }
        })
        console.log(dateFiveDays)
        console.log(tempFiveDays)
        getChart()
    });
    // creer un graphique 
    const getChart = ()=>{
        var ctx = document.getElementById('myChart').getContext('2d');
        const config = {
            type: 'line',
            data: {
                labels: ['jour1', 'jour2', 'jour3', 'jour4', 'jour5'],
                datasets: [{
                    label: 'la Temperature dans les cinqs prochains jours',
                    data:tempFiveDays,
                    backgroundColor: "transparent",
                    borderColor: "red",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
            }};
        var myChart = new Chart(ctx,config)    
        }    
}


    











// function addData(chart, newdata) {
//     chart.data.datasets[0].data = newdata
//     chart.update();
// }


// addData(config, [2, 15, -0.9, -4, 9 ])