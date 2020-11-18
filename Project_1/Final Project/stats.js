pitchers = []
hitters = []
api();

function api() {
    let url = "https://api.sportsdata.io/v3/mlb/stats/json/PlayerSeasonStats/2020?key=2dc0d9e775094518a3aed9b3e32919a1"
    axios.get(url)
    .then(response => {
        all = response.data;
        for (let i = 0; i < all.length; i++) {
            if (all[i]["PositionCategory"] == "P") { 
                pitchers.push(all[1])
            } else {
                hitters.push(all[i])
            }
        }
        console.log(all)
        console.log(pitchers)
        console.log(hitters)
    })
    .catch(error => {
        console.log(error); // debugging data
    })
}

function search() {
    var team = document.getElementById("team").value;
    document.getElementById("chosen").innerHTML = "You Have Selected: " + team
    if (team == "") {
        alert("Please Select A Team");
    } else {
        for (let i = 0; i < hitters.length; i++) {
            if (hitters[i]["Team"] == team) { // can use multiple filters at once, with && logical operator 
                console.log(hitters[i])
                row = roster.insertRow(-1);
                column1 = row.insertCell(0); // can create as many additional cells as needed by repeating this line of code
                column2 = row.insertCell(1);
                column3 = row.insertCell(2);
                column4 = row.insertCell(3);
                column5 = row.insertCell(4);
                column6 = row.insertCell(5);
                column7 = row.insertCell(6);
                column8 = row.insertCell(7);
                column9 = row.insertCell(8);
                column10 = row.insertCell(9);
                column11 = row.insertCell(10);
                column12 = row.insertCell(11);
                column13 = row.insertCell(12);
                column14 = row.insertCell(13);
                column15 = row.insertCell(14);
                column16 = row.insertCell(15);
                column17 = row.insertCell(16);
                column1.innerHTML = hitters[i]["Name"];
                column2.innerHTML = hitters[i]["Games"];
                column3.innerHTML = hitters[i]["AtBats"];
                column4.innerHTML = hitters[i]["Runs"];
                column5.innerHTML = hitters[i]["Hits"];
                column6.innerHTML = hitters[i]["Doubles"];
                column7.innerHTML = hitters[i]["Triples"];
                column8.innerHTML = hitters[i]["HomeRuns"];
                column9.innerHTML = hitters[i]["RunsBattedIn"];
                column10.innerHTML = hitters[i]["Walks"];
                column11.innerHTML = hitters[i]["Strikeouts"];
                column12.innerHTML = hitters[i]["StolenBases"];
                column13.innerHTML = hitters[i]["CaughtStealing"];
                column14.innerHTML = hitters[i]["BattingAverage"];
                column15.innerHTML = hitters[i]["OnBasePercentage"];
                column16.innerHTML = hitters[i]["SluggingPercentage"];
                column17.innerHTML = hitters[i]["OnBasePlusSlugging"];
            }
        }
        document.getElementById("chosen").style.display = "block";
        document.getElementById("reset").style.display = "block";
        document.getElementById("submit").style.display = "none";
        document.getElementById("team").style.display = "none";
    }
}