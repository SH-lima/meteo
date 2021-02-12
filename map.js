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

