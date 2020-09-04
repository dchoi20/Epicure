("#submitBtn").on("click", function(event){
    event.preventDefault();

    var newContactReq = {
        firstName: $("#fname").val().trim(),

        lastName: $("#lname").val().trim(),

        country: $("#country").val().trim(),

        subject: $("#subject").val().trim()
    };

    $.post("/api/", newContactReq)
    .then(function(data){
        console.log(data);

        console.log("Thank you for submitting");
    });

    $("#fname").val("");
    $("#lname").val("");
    $("#country").val("");
    $("#subject").val("");
});