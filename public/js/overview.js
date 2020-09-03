let params = new URL(document.location).searchParams;
let restaurantId = params.get("restaurant");
$(document).ready(() => {
  console.log(restaurantId);

  fetch(
    `https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurantId}`,
    {
      method: "get",
      headers: {
        Accept: "application/json",
        "user-key": "4319a1eed8d7dbe3e7050e70e4bcaf33",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      console.log(result.location.address);
      console.log(result.location.longitude);
      let long = result.location.longitude;
      console.log(result.location.latitude);
      let lat = result.location.latitude;
      let mapboxgl;
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZGNob2kyMCIsImEiOiJja2VpcmFyeXYxYTY5MnJzNHBmcGV2OW5rIn0.m4KpGy6Glb5cbcAeJowlkQ";
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [long, lat], // starting position [lng, lat]
        zoom: 15, // starting zoom
      });

      var marker = new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
    });
});
