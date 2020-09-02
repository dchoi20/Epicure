window.onload = function() {

    document.getElementById("tipCalc").onclick = function() {
        calculateTip();
    };
}


function calculateTip() {

    let totalCost = document.getElementById("totalCost").nodeValue;
    let service = document.getElementById("service").nodeValue;
    let numPeople = document.getElementById("people").nodeValue;

    // validate input
    if (totalCost == "") {
        alert("Hey you forgot the total cost!");
        return;
    }

    // Calculate the Tip
    let total = (totalCost * service) / numPeople;
    // Output 2 decimal places
    total = total.toFixed(2);
    // Display the tip
    document.getElementById("totaltip").innerText = total;
    $('#exampleModal').modal('toggle');
}
















