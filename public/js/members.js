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
        $(".restaurantInfo").empty();

        fetch(
          `https://developers.zomato.com/api/v2.1/search?count=10&lat=${lat}&lon=${long}&cuisines=${cuisineID}&sort=rating`,

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
              let restaurantTime = result.restaurants[i].restaurant.timings;
              let restaurantURL = result.restaurants[i].restaurant.url;
              let restaurantID = result.restaurants[i].restaurant.R.res_id;
              console.log(restaurantID);
              console.log(result.restaurants[i]);
              console.log(restaurantName);
              console.log(address);
              
              $(`
              <div class="card" style="width: 100%;">
              <div class="card-body restInfo">
              <h5 class="card-title"><a href="${restaurantURL}" class="card-link" data-restaurantID="${restaurantID}">${restaurantName}</a></h5>
              <h6 class="card-subtitle mb-2 text-muted" id="address" data-address="${address}">${address}</h6>
              <p class="card-text">${restaurantTime}</p>
              </div>
              </div>
              `).appendTo(".restaurantInfo");
            }
          });
      });
    });
  });
  $(".restaurantInfo").on("click", ".restInfo", function() {
    let restaurantAddress = $(this)
      .find("h6")
      .attr("data-address");

    let nameOfRestaurant = $(this)
      .find("h5")
      .find("a")
      .attr("data-restaurantID");

    console.log(this);

    console.log(nameOfRestaurant);
    console.log(restaurantAddress);
    newPage(nameOfRestaurant);
  });

  function newPage(nameOfRestaurant) {
    window.location.href = `./restaurantReview?restaurant=${nameOfRestaurant}`;
  }
});
