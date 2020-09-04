let params = new URL(document.location).searchParams;
let restaurantId = params.get("restaurant");
let nameOfRestaurant = params.get("restaurantName");
$(document).ready(() => {
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
      let restaurantAddress = result.location.address;
      let restaurantHours = result.timings;
      let averageCost = result.average_cost_for_two;
      let phoneNumber = result.phone_numbers;
      let userRating = result.user_rating.aggregate_rating;
      let restaurantWebsite = result.url;

      let restaurantName = result.name;
      $(
        `<h1 class="restaurantName"><a href="${restaurantWebsite}">${restaurantName}</a></h1>`
      ).appendTo(".restaurantTitle");

      $(`
      <li class="list-group-item"><strong>Address:</strong><a href="https://maps.google.com/?q=${restaurantAddress}"> ${restaurantAddress}</a></li>
      <li class="list-group-item"><strong>Hours of Operation:</strong> ${restaurantHours}</li>
      <li class="list-group-item"><strong>Contact:</strong> <a href="tel:${phoneNumber}">${phoneNumber}</a></li>
      <li class="list-group-item"><strong>Average Cost for two:</strong> $${averageCost}</li>
      <li class="list-group-item"><strong>Rating:</strong> ${userRating}</li>
      
      
      `).appendTo(".infoAboutRestaurant");
    });
  $("#review").on("submit", function(event) {
    event.preventDefault();
    let reviewInfo = $("#restaurantReviews").val();
    console.log(reviewInfo);

    let newReview = {
      name: nameOfRestaurant,
      review: $("#restaurantReviews")
        .val()
        .trim(),
    };

    $.post("/api/review", newReview).then(function(data) {
      console.log(data);
    });

    $("#restaurantReviews").val("");
  });
});
