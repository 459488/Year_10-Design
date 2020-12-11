function filterTiers() {
    currentDisplay = [];
    var team = document.getElementById("team1").value;
    var position = document.getElementById("position1").value;
    if (team == "All") {
        alert("Please Select A Team");
    } else if (activeTab == "hitting") {
        for (let i = 0; i < hitters.length; i++) {
            if (hitters[i]["Team"] == team && (position == "All" || hitters[i]["Position"] == position)) {
                currentDisplay.push(hitters[i]);
            }
        }
    } else if (activeTab == "pitching") {
        for (let i = 0; i < pitchers.length; i++) {
            if (pitchers[i]["Team"] == team && (position == "All" || pitchers[i]["Position"] == position)) {
                currentDisplay.push(pitchers[i]);
            }
        }
    }
    console.log(currentDisplay);
}

function tiers() {
    var stat = document.getElementById("stat").value;
    var values = [];
    var sortedList = [];
    for (let i = 0; i < currentDisplay.length; i++) {
        values.push(currentDisplay[i][stat]);
    }
    values.sort((a,b) => b-a);
    console.log(values);
    for (let i = 0; i < values.length; i++) {
        for (let k = 0; k < currentDisplay.length; k++) {
            if (currentDisplay[k][stat] == values[i] && sortedList.includes(currentDisplay[k]) == false) {
                sortedList.push(currentDisplay[k]);
            }
        }
    }
    console.log(sortedList)
    for (let i = 0; i < sortedList.length; i++) {
        if (i < (math.floor((sortedList * 2) / 3))) {
            if (i < (math.floor(sortedList / 3))) {
                tier1.push(sortedList[i]);
                tier1.push(sortedList[i]);
            } else {
                tier3.push(sortedList[i]);
            }
        }
    }
    printTier();
}

function printTier() {
    for (let i = 0; i < 10; i++) {
        a = math.floor(math.random() * tier1.length) ;
        for (let k = 0; i < tier1.length; i++) {
            if (k == a && currentDisplay.includes(tier1[k]) == false) {
                currentDisplay.push(tier1[k]);
            }
        }
        b = math.floor(math.random() * tier2.length) ;
        for (let k = 0; i < tier2.length; i++) {
            if (k == a && currentDisplay.includes(tier2[k]) == false) {
                currentDisplay.push(tier2[k]);
            }
        }
        c = math.floor(math.random() * tier3.length) ;
        for (let k = 0; i < tier3.length; i++) {
            if (k == a && currentDisplay.includes(tier3[k]) == false) {
                currentDisplay.push(tier3[k]);
            }
        }
    }
}