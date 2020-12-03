var all = [];
var pitchers = [];
var hitters = [];
var currentDisplay = [];
var activeTab = undefined;
dataToDropdown();
api();

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

function goTab(tab) {
    $('.tab').addClass("hidden");
    $(`#${tab}`).removeClass('hidden');
}

function toggleStatus(tab) {
    $('.tab').addClass("hidden");
    $(`#${tab}`).removeClass('hidden');
}

function toggleType(tab) {
    activeTab = tab;
    $('.tab2').addClass("hidden");
    $(`#${tab}`).removeClass('hidden');
    if (tab == "hitting") {
        $('#position').html(`
            <option>All</option>
            <option value="C">Catcher (C)</option>
            <option value="1B">First Baseman (1B)</option>
            <option value="2B">Second Baseman (2B)</option>
            <option value="3B">Third Basemen (3B)</option>
            <option value="SS">Shortstop (SS)</option>
            <option value="LF">Left Field (LF)</option>
            <option value="CF">Center Field (CF)</option>
            <option value="RF">Right Field (RF)</option>
        `);
    } else {
        $('#position').html(`
            <option>All</option>
            <option value="SP">Starting Pitcher (SP)</option>
            <option value="RP">Relief Pitcher (RP)</option>
        `);
    }
}

async function dataToDropdown() {
    response = await axios.get("https://api.sportsdata.io/v3/mlb/scores/json/TeamSeasonStats/2020?key=2dc0d9e775094518a3aed9b3e32919a1")
    teams = response.data;
    console.log(teams);
    for (let i = 0; i < teams.length; i++) {
        var a = document.createElement('option');
        // <option></option>
        a.innerHTML = teams[i]["Name"];
        // <option>Name</option>
        a.value = teams[i]["Team"];
        // <option value="AAA">Name</option>
        document.getElementById('team').appendChild(a);
    }
}

async function api() {
    var year = $('#season').val()
    response = await axios.get(`https://api.sportsdata.io/v3/mlb/stats/json/PlayerSeasonStats/${year}?key=2dc0d9e775094518a3aed9b3e32919a1`)    
    all = response.data;
    for (let i = 0; i < all.length; i++) {
        
        if (all[i]["PositionCategory"] == "P") {
            pitchers.push(all[i]);
        } else {
            hitters.push(all[i]);
        }
    }
    console.log(all);
    console.log(pitchers);
    console.log(hitters);
}

function filter() {
    clearTable();
    currentDisplay = [];
    var team = document.getElementById("team").value;
    var position = document.getElementById("position").value;
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
        printTable(i, sortedList);
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