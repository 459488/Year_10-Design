var names = [];

function clearTable() {
    $('#table1').html(`
    <tr>
    <th class="fieldNames"><button onclick="sortStat('Name')">Name</button></th>
    <th class="fieldNames"><button onclick="sortStat('Games')">G</button></th>
    <th class="fieldNames"><button onclick="sortStat('AtBats')">AB</button></th>
    <th class="fieldNames"><button onclick="sortStat('Runs')">R</button></th>
    <th class="fieldNames"><button onclick="sortStat('Hits')">H</button></th>
    <th class="fieldNames"><button onclick="sortStat('Doubles')">2B</button></th>
    <th class="fieldNames"><button onclick="sortStat('Triples')">3B</button></th>
    <th class="fieldNames"><button onclick="sortStat('HomeRuns')">HR</button></th>
    <th class="fieldNames"><button onclick="sortStat('RunsBattedIn')">RBI</button></th>
    <th class="fieldNames"><button onclick="sortStat('Walks')">BB</button></th>
    <th class="fieldNames"><button onclick="sortStat('Strikeouts')">SO</button></th>
    <th class="fieldNames"><button onclick="sortStat('StolenBases')">SB</button></th>
    <th class="fieldNames"><button onclick="sortStat('CaughtStealing')">CS</button></th>
    <th class="fieldNames"><button onclick="sortStat('BattingAverage')">AVG</button></th>
    <th class="fieldNames"><button onclick="sortStat('OnBasePercentage')">OBP</button></th>
    <th class="fieldNames"><button onclick="sortStat('SluggingPercentage')">SLG</button></th>
    <th class="fieldNames"><button onclick="sortStat('OnBasePlusSlugging')">OPS</button></th>
    </tr>
    `);
    $('#table2').html(`
    <tr>
    <th class="fieldNames"><button onclick="sortStat('Name')">Name</button></th>
    <th class="fieldNames"><button onclick="sortStat('Wins')">W</button></th>
    <th class="fieldNames"><button onclick="sortStat('Losses')">L</button></th>
    <th class="fieldNames"><button onclick="sortStat('EarnedRunAverage')">ERA</button></th>
    <th class="fieldNames"><button onclick="sortStat('Games')">G</button></th>
    <th class="fieldNames"><button onclick="sortStat('Started')">GS</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingCompleteGames')">CG</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingShutOuts')">SHO</button></th>
    <th class="fieldNames"><button onclick="sortStat('Saves')">SV</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingBlownSaves')">BS</button></th>
    <th class="fieldNames"><button onclick="sortStat('InningsPitchedDecimal')">IP</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingHits')">H</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingRuns')">R</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingEarnedRuns')">ER</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingHomeRuns')">HR</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingHitByPitch')">HB</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingWalks')">BB</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingStrikeouts')">SO</button></th>
    <th class="fieldNames"><button onclick="sortStat('WalksHitsPerInningsPitched')">WHIP</button></th>
    <th class="fieldNames"><button onclick="sortStat('PitchingBattingAverageAgainst')">AVG</button></th>
    </tr>
    `);
}

function filterTable() {
    clearTable();
    currentDisplay = [];
    var team = document.getElementById("team2").value;
    var position = document.getElementById("position2").value;
    if (team == "All") {
        alert("Please Select A Team");
    } else if (activeTab == "hitting") {
        for (let i = 0; i < hitters.length; i++) {
            if (hitters[i]["Team"] == team && (position == "All" || hitters[i]["Position"] == position)) {
                currentDisplay.push(hitters[i]);
                printTable(i, hitters);
            }
        }
    } else if (activeTab == "pitching") {
        for (let i = 0; i < pitchers.length; i++) {
            if (pitchers[i]["Team"] == team && (position == "All" || pitchers[i]["Position"] == position)) {
                currentDisplay.push(pitchers[i]);
                printTable(i, pitchers);
            }
        }
    }
    console.log(currentDisplay);
}

function sortStat(stat) {
    clearTable();
    var values = [];
    var nameList = [];
    var sortedList = [];
    if (stat == "Name") {
        for (let i = 0; i < currentDisplay.length; i++) {
            fullName = currentDisplay[i]["Name"];
            lastName = fullName.substring(fullName.indexOf(" ") + 1, fullName.length);
            nameList.push(lastName);
        }
        nameList.sort();
        console.log(nameList);
        for (let i = 0; i < nameList.length; i++) {
            for (let k = 0; k < currentDisplay.length; k++) {
                if (currentDisplay[k]["Name"].substring(currentDisplay[k]["Name"].indexOf(" ") + 1, currentDisplay[k]["Name"].length) == nameList[i] && sortedList.includes(currentDisplay[k]) == false) {
                    sortedList.push(currentDisplay[k]);
                }
            }
        }
    } else {
        for (let i = 0; i < currentDisplay.length; i++) {
            values.push(currentDisplay[i][stat]);
        }
        values.sort(function(a, b) {return b - a});
        console.log(values);
        for (let i = 0; i < values.length; i++) {
            for (let k = 0; k < currentDisplay.length; k++) {
                if (currentDisplay[k][stat] == values[i] && sortedList.includes(currentDisplay[k]) == false) {
                    sortedList.push(currentDisplay[k]);
                }
            }
        }
    }
    console.log(sortedList)
    for (let i = 0; i < currentDisplay.length; i++) {
        printTable(i, sortedList);
    }
}

function autocomplete(inp, arr) {
    // the autocomplete function takes two arguments, the text field element and an array of possible autocompleted values
    var currentFocus;
    // execute a function when someone writes in the text field:
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        // close any already open lists of autocompleted values
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        // create a DIV element that will contain the items (values):
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "search-list");
        a.setAttribute("class", "search-items");
        // append the DIV element as a child of the autocomplete container:
        this.parentNode.appendChild(a);
        //for each item in the array...
        for (i = 0; i < arr.length; i++) {
            // check if the item starts with the same letters as the text field value:
            if (arr[i].toUpperCase().includes(val.toUpperCase())) {
            // create a DIV element for each matching element:
            b = document.createElement("DIV");
            // make the matching letters bold:
            b.innerHTML = arr[i].substr(0, val.length);
            b.innerHTML += arr[i].substr(val.length);
            // insert a input field that will hold the current array item's value:
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            // execute a function when someone clicks on the item value (DIV element):
            b.addEventListener("click", function(e) {
                // insert the value for the autocomplete text field:
                inp.value = this.getElementsByTagName("input")[0].value;
                // close the list of autocompleted values, or any other open lists of autocompleted values:
                closeAllLists();
            });
            a.appendChild(b);
            }
        }
    });
    //execute a function presses a key on the keyboard:
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "search-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            // If the arrow DOWN key is pressed, increase the currentFocus variable:
            currentFocus++;
            // and and make the current item more visible:
            addActive(x);
        } else if (e.keyCode == 38) { //up
            // If the arrow UP key is pressed, decrease the currentFocus variable:
            currentFocus--;
            // and and make the current item more visible:
            addActive(x);
        } else if (e.keyCode == 13) {
            // If the ENTER key is pressed, prevent the form from being submitted,
            e.preventDefault();
            if (currentFocus > -1) {
            // and simulate a click on the "active" item:
            if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        // a function to classify an item as "active":
        if (!x) return false;
        // start by removing the "active" class on all items:
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        // add class "search-active":
        x[currentFocus].classList.add("search-active");
    }
    function removeActive(x) {
        // a function to remove the "active" class from all autocomplete items:
        for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("search-active");
        }
    }
    function closeAllLists(elmnt) {
        // close all autocomplete lists in the document, except the one passed as an argument:
        var x = document.getElementsByClassName("search-items");
        for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
        }
        }
    }
    // execute a function when someone clicks in the document:
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
});
}

function search() {
    for (let i = 0; i < all.length; i++) {
        if (all[i]["Name"] == document.getElementById("find").value) {
            printTable(i, all);
            break
        } if (i == (all.length - 1) && all[i]["Name"] != document.getElementById("find").value) {
            alert("Player Not Found");
        }
    }
}

function printTable(i, thingy) {
    if (activeTab == "hitting") {
        var row = table1.insertRow(-1);
        column1 = row.insertCell(0);
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
        column1.innerHTML = thingy[i]["Name"];
        column2.innerHTML = thingy[i]["Games"];
        column3.innerHTML = thingy[i]["AtBats"];
        column4.innerHTML = thingy[i]["Runs"];
        column5.innerHTML = thingy[i]["Hits"];
        column6.innerHTML = thingy[i]["Doubles"];
        column7.innerHTML = thingy[i]["Triples"];
        column8.innerHTML = thingy[i]["HomeRuns"];
        column9.innerHTML = thingy[i]["RunsBattedIn"];
        column10.innerHTML = thingy[i]["Walks"];
        column11.innerHTML = thingy[i]["Strikeouts"];
        column12.innerHTML = thingy[i]["StolenBases"];
        column13.innerHTML = thingy[i]["CaughtStealing"];
        column14.innerHTML = thingy[i]["BattingAverage"];
        column15.innerHTML = thingy[i]["OnBasePercentage"];
        column16.innerHTML = thingy[i]["SluggingPercentage"];
        column17.innerHTML = thingy[i]["OnBasePlusSlugging"];
    } else if (activeTab == "pitching") {
        var row = table2.insertRow(-1);
        column1 = row.insertCell(0);
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
        column18 = row.insertCell(17);
        column19 = row.insertCell(18);
        column20 = row.insertCell(19);
        column1.innerHTML = thingy[i]["Name"];
        column2.innerHTML = thingy[i]["Wins"];
        column3.innerHTML = thingy[i]["Losses"];
        column4.innerHTML = thingy[i]["EarnedRunAverage"];
        column5.innerHTML = thingy[i]["Games"];
        column6.innerHTML = thingy[i]["Started"];
        column7.innerHTML = thingy[i]["PitchingCompleteGames"];
        column8.innerHTML = thingy[i]["PitchingShutOuts"];
        column9.innerHTML = thingy[i]["Saves"];
        column10.innerHTML = thingy[i]["PitchingBlownSaves"];
        column11.innerHTML = thingy[i]["InningsPitchedDecimal"];
        column12.innerHTML = thingy[i]["PitchingHits"];
        column13.innerHTML = thingy[i]["PitchingRuns"];
        column14.innerHTML = thingy[i]["PitchingEarnedRuns"];
        column15.innerHTML = thingy[i]["PitchingHomeRuns"];
        column16.innerHTML = thingy[i]["PitchingHitByPitch"];
        column17.innerHTML = thingy[i]["PitchingWalks"];
        column18.innerHTML = thingy[i]["PitchingStrikeouts"];
        column19.innerHTML = thingy[i]["WalksHitsPerInningsPitched"];
        column20.innerHTML = thingy[i]["PitchingBattingAverageAgainst"];
    }
}