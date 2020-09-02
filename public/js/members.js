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
            let cuisines = result.cuisines[i].cuisine.cuisine_id;

            let cuisineName = result.cuisines[i].cuisine.cuisine_name;

            $(
              `<li class="category" data-id ="${cuisines}">${cuisineName}</li><br>`
            ).appendTo(".cuisineType");
          }
        });

      $("#cuisineList").on("click", ".category", function() {
        let cuisineID = $(this).attr("data-id");
        console.log(cuisineID);
        console.log(lat);
        console.log(long);

        fetch(
          `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${long}&cuisines=${cuisineID}`,
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
            // result.map((result) => console.log(result.restaurants));
            for (let i = 0; i < result.restaurants.length; i++) {
              let address = result.restaurants[i].restaurant.location.address;
              let restaurantName = result.restaurants[i].restaurant.name;
              console.log(restaurantName);
              console.log(address);
            }
          });
      });
    });
  });
});
