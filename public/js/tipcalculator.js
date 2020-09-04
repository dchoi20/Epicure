window.onload = function() {

    document.getElementById("tipCalc").onclick = function() {
        calculateTip();
    };
}


function calculateTip() {

    let totalCost = document.getElementById("totalCost").value();
    let service = document.getElementById("service").value();
    let numPeople = document.getElementById("people").value();

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
    console.log(total);
    document.getElementById("totalTip").innerText = total;
    $('#exampleModal').modal('toggle');
}
















