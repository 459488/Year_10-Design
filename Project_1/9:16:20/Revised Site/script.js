//This is a stub for improving the code by using an array
items = document.getElementsByClassName('valueItem');
runGame();

function runGame() {
    console.log("test")
    //What would chanage below if the items array existed?
    term = Math.trunc(Math.random() * 10) + 1; // gets random number between 1 and 10
    document.getElementById('item1').innerHTML = term;
    missValue = Math.trunc(Math.random() * 4) + 2; // gets random number between 2 and 5
    operator = Math.round(Math.random()); // returns 0 or 1
    console.log(missValue + ", " + operator)
    for (i = 2; i < 7; i++) {
        if (operator == 0) {
            step = Math.trunc(Math.random() * 25) + 1;
            term += step;
            if (i != missValue) {
                (document.getElementById('item' + String(i))).innerHTML = term;
            } else {
                (document.getElementById('item' + String(i))).addEventListener('click', function() {
                    
                    response = prompt("Enter the missing value");
                    if (response == term) {
                        alert("Congratulations you answered correct");
                        (document.getElementById('item' + String(missValue))).innerHTML = response;
                    } else if (reponse == null || reponse !== Number) {
                        alert("Please check you entered a number.")
                    } else {
                        alert("Sorry, you are incorrect. Please try again.");
                    }
                });
            }
        } else {
            step = Math.trunc(Math.random() * 5) + 1;
            term += step;
            if (i != missValue) {
                (document.getElementById('item' + String(i))).innerHTML = term;
            } else {
                (document.getElementById('item' + String(i))).addEventListener('click', function() {
                    response = prompt("Enter the missing value");
                    if (response == term) {
                        alert("Congratulations you answered correct");
                        (document.getElementById('item' + String(missValue))).innerHTML = response;
                    } else if (reponse == null || reponse !== Number) {
                        alert("Please check you entered a number.")
                    } else {
                        alert("Sorry, you are incorrect. Please try again.");
                    }
                });
            }
        }
    }
}