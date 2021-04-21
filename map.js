// une fonction qui affiche  des cartes en prenant latitude et logitude en paramètres  
const getMap = (lat, lon)=>{
var mapId = document.querySelector('#mapid');
mapId.innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
var container = L.DomUtil.get('mapid');
      if(container != null){
        container._leaflet_id = null;
      }
var mymap = L.map('mapid').setView([lat, lon], 11);
const key ="pk.eyJ1Ijoic2gtbGltYSIsImEiOiJja2wwd252OTcwOWhhMzB0N2RqcGRtbGNmIn0._48UE55V0LpiYMC7iw_0XQ"
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2gtbGltYSIsImEiOiJja2wwd252OTcwOWhhMzB0N2RqcGRtbGNmIn0._48UE55V0LpiYMC7iw_0XQ`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:'pk.eyJ1Ijoic2gtbGltYSIsImEiOiJja2wwd252OTcwOWhhMzB0N2RqcGRtbGNmIn0._48UE55V0LpiYMC7iw_0XQ'
}).addTo(mymap);
}


// creer une requete pour recuperer des donnees pour l'auto-complete
const getCity = (info)=>{
  fetch(url, {
      method:"POST",
      body:JSON.stringify({
          query:info,
          type:'city',
          hitsPerPage: '10'
      })
  })
  .then(response => response.json())
  .then( (data) => {
       console.log(data)
      //  pour enlever les resultats precedentes 
      listCity.innerHTML="";
      data.hits.forEach(element => {
          // changer le style de bar de recherche
          localeName = element.locale_names.default[0] 
          keyword.classList.add("borderBottom")
          // inserer les resultats de auto-completion dans une fenetre 
          listCity.insertAdjacentHTML("beforeend", 
          `<button class="elementOfListCity">${element.locale_names.default[0]}</button>`
          ) 
      });
          const elementsOfListCity = document.querySelectorAll(".elementOfListCity")
          for (let index = 0; index < elementsOfListCity.length; index++) {
              const elementCity = elementsOfListCity[index];
              // afficher le meteo et la carte en cliquant sur une de résultats de l'autocomplete
              elementCity.addEventListener("click", ()=>{
                   getMeteoOfToday(elementCity.textContent)
                   getMeteoInfoOfFivedays(elementCity.textContent)
                  windowResults.style="display:none;";
                  keyword.value=""
              })
          }
      // revenir sur le style initienl 
      keyword.classList.remove("borderBottom")
  })
}



// une fonction pour recuper le meteo de aujourd'hui
const getMeteoOfToday = (nameCity)=>{
  // effacer  les infos precedentes 
  city.innerHTML="";
  temp.innerHTML="";
  meteoDescription.innerHTML="";
  // creer une requet
  const urlAPI = `https://api.openweathermap.org/data/2.5/find?q=${nameCity}&units=metric&APPID=cda591f223fc1aec5adf0498d5ca1a7c`
  fetch(urlAPI)   
  .then(response => response.json())
  .then((data)=>{
      city.insertAdjacentHTML("beforeend", `<h3>${data.list[0].name}</h3>`)
      temp.insertAdjacentHTML("beforeend", `<h3>${data.list[0].main.temp}</h3>`)
      meteoDescription.insertAdjacentHTML("beforeend",
       `<h3>${data.list[0].weather[0].main}</h3>
       <i ${data.list[0].weather[0].icon}></i>
       `)
      getMap(data.list[0].coord.lat, data.list[0].coord.lon)
      console.log(meteoDescription.textContent) 
      temperature=temp.textContent;
      if (temperature <= 6){
        document.body.style='background-image: url(img/hiver.jpg)'
      }else if (temperature >= 20){
        document.body.style='background-image: url(img/ete.jpg)'
      }else{
        document.body.style='background-image: url(img/printemps.jpg)'
      }
       
  })}



  // regrouper les infos meteo et le graphique dans une fonction 
const getMeteoInfoOfFivedays = (nameCity)=>{
  // creer une requet pour recuperer le meteo dans 5 prochain jour 
  const dateFiveDays =[]
  const tempFiveDays =[];    
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&units=metric&appid=${APIkey}`)
  .then(response => response.json())
  .then((data) => {
      console.log(data);
      data.list.forEach((element)=>{
          if(element.dt_txt.includes("12:00:00")){
          dateFiveDays.push(element.dt_txt)
          tempFiveDays.push(element.main.temp)   
          }
      })
      getChart(tempFiveDays, dateFiveDays)
  });
  }
  
  
  // creer un graphique 
  const getChart = (tempFiveDays, dateFiveDays)=>{
      var ctx = document.getElementById('myChart').getContext('2d');
      const config = {
          type: 'line',
          data: {
              labels: [dateFiveDays[0].replace("12:00:00", ""), dateFiveDays[1].replace("12:00:00", ""), dateFiveDays[2].replace("12:00:00", ""), dateFiveDays[3].replace("12:00:00", ""), dateFiveDays[4].replace("12:00:00", "")],
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


