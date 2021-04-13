var latitude
var longitude
var search=document.getElementById("search")
var radius=document.getElementById("radius")
var price=document.getElementById("price")
var next=document.getElementById("next")
var previous=document.getElementById("previous")
var marker;

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
      console.log(position.coords.latitude)
        latitude=position.coords.latitude
        longitude=position.coords.longitude
        initMap()
    })
}
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 12,
  });
}


search.addEventListener("click",async function(){
  initMap()
  console.log(latitude,longitude)
  var request ={
    location: new google.maps.LatLng(32.9777152,-117.10300159999998),
    radius: `${radius.value*1609.34}`,
    type: ['restaurant'],
    rankBy: google.maps.places.RankBy.Distance ,
    keyword: "restaurant"
  };
  service = new
  google.maps.places.PlacesService(map);
  service.nearbySearch(request,callback);
  function callback(response,status){
    console.log(response)
    response=response.filter(restaurant=>restaurant.price_level<=price.value)
    console.log(response)
    console.log(response[0].geometry.location.lat())
  marker = new google.maps.Marker({
    position: {lat: response[0].geometry.location.lat(), lng: response[0].geometry.location.lng()},
    map,
    title: response[0].name
  });
  var index = 0
  next.addEventListener("click", function(){
    console.log("NEXT")
    if (index==response.length-1){
      alert("Max length reached")
      return
    }
    index = index + 1
    marker.setMap(null)
    marker = new google.maps.Marker({
      position: {lat: response[index].geometry.location.lat(), lng: response[index].geometry.location.lng()},
      map,
      title: response[index].name
    });
  })
  
  previous.addEventListener("click", function(){
    console.log("PREVIOUS")
    if (index==0){
      alert("First restaurant reached")
      return
    }
    index = index-1
    marker.setMap(null)
    marker = new google.maps.Marker({
      position: {lat: response[index].geometry.location.lat(), lng: response[index].geometry.location.lng()},
      map,
      title: response[index].name
    });
  })
  }
}) 

























