var slider1 = document.getElementById("q1");
var output1 = document.getElementById("demo1");
output1.innerHTML = slider1.value;
slider1.oninput = function() {
    output1.innerHTML = this.value;
}

var slider2 = document.getElementById("q2");
var output2 = document.getElementById("demo2");
output2.innerHTML = slider2.value;
slider2.oninput = function() {
    output2.innerHTML = this.value;
}

function submit() {
    var database = firebase.database();
    var ref = database.ref("Feedback");
    var a1 = document.getElementById("q1").value;
    var a2 = document.getElementById("q2").value;
    var a3 = document.getElementById("q3").value;
    var a4 = document.getElementById("q4").value;
    var a5 = document.getElementById("q5").value;
    var data = 
    {
        q1: a1,
        q2: a2,
        q3: a3,
        q4: a4,
        q5: a5,
    };
    console.log(data);
    ref.push(data);
    reset();
    $('#form').html(`
        <h3>Your response has been submitted. Thank you!</h3>
        <button onclick="document.location='index.html'">Go back to home</button>
    `);
}

function reset() {
    document.getElementById("q1").value = 5;
    document.getElementById("q2").value = 5;
    document.getElementById("q3").value = "";
    document.getElementById("q4").value = "";
    document.getElementById("q5").value = "";
}