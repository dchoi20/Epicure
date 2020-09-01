$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });

  let coords = document.querySelector("#get-location");
  // let categoryBtn = document.querySelector(".category");
  coords.addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      console.log(lat);
      console.log(long);

      fetch(
        `https://developers.zomato.com/api/v2.1/cuisines?lat=${lat}&lon=${long}`,
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
          for (let i = 0; i < result.cuisines.length; i++) {
            console.log(result.cuisines[i]);
            console.log(result.cuisines[i].cuisine.cuisine_name);
            $(
              `<li class="category">${result.cuisines[i].cuisine.cuisine_name}</li><br>`
            ).appendTo(".cat");
          }
        });
    });
  });
});
