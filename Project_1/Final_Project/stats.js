pitchers = [];
hitters = [];
currentDisplay = hitters;
api();
dataToDropdown();

function clearTable() {
    $('#players').html(`
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
    `)
}

function goTab(tab) {
    $('.tab').addClass("hidden")
    $(`#${tab}`).removeClass('hidden')
}

async function dataToDropdown() {
    response = await axios.get("https://api.sportsdata.io/v3/mlb/scores/json/TeamSeasonStats/2020?key=2dc0d9e775094518a3aed9b3e32919a1")
    teams = response.data
    for (let i = 0; i < teams.length; i++) {
        var a = document.createElement('option')
        // <option></option>
        a.innerHTML = teams[i]["Name"]
        // <option>Name</option>
        a.value = teams[i]["Team"]
        // <option value="AAA">Name</option>
        document.getElementById('team').appendChild(a)
    }
    console.log(teams)
}

async function api() {
    var year = $('#season').val()
    response = await axios.get(`https://api.sportsdata.io/v3/mlb/stats/json/PlayerSeasonStats/${year}?key=2dc0d9e775094518a3aed9b3e32919a1`)    
    all = response.data;
    for (let i = 0; i < all.length; i++) {
        if (all[i]["PositionCategory"] == "P") {
            pitchers.push(all[i])
        } else {
            hitters.push(all[i])
        }
    }
    console.log(all)
    console.log(pitchers)
    console.log(hitters)
}

function search() {
    clearTable();
    currentDisplay = [];
    var team = document.getElementById("team").value;
    var position = document.getElementById("position").value;
    if (team == "All") {
        alert("Please Select A Team");
    } else {
        for (let i = 0; i < hitters.length; i++) {
            if (hitters[i]["Team"] == team && position == "All") {
                currentDisplay.push(hitters[i]);
                row = players.insertRow(-1);
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
            } else if (hitters[i]["Team"] == team && hitters[i]["Position"] == position) {
                currentDisplay.push(hitters[i]);
                row = players.insertRow(-1);
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
    }
    console.log(currentDisplay);
}

function sortStat(stat) {
    clearTable();
    values = [];
    nameList = [];
    sortedList = [];
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
        values.sort((a,b) => a-b);
        values.reverse();
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
        row = players.insertRow(-1);
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
        column1.innerHTML = sortedList[i]["Name"];
        column2.innerHTML = sortedList[i]["Games"];
        column3.innerHTML = sortedList[i]["AtBats"];
        column4.innerHTML = sortedList[i]["Runs"];
        column5.innerHTML = sortedList[i]["Hits"];
        column6.innerHTML = sortedList[i]["Doubles"];
        column7.innerHTML = sortedList[i]["Triples"];
        column8.innerHTML = sortedList[i]["HomeRuns"];
        column9.innerHTML = sortedList[i]["RunsBattedIn"];
        column10.innerHTML = sortedList[i]["Walks"];
        column11.innerHTML = sortedList[i]["Strikeouts"];
        column12.innerHTML = sortedList[i]["StolenBases"];
        column13.innerHTML = sortedList[i]["CaughtStealing"];
        column14.innerHTML = sortedList[i]["BattingAverage"];
        column15.innerHTML = sortedList[i]["OnBasePercentage"];
        column16.innerHTML = sortedList[i]["SluggingPercentage"];
        column17.innerHTML = sortedList[i]["OnBasePlusSlugging"];
    }
}