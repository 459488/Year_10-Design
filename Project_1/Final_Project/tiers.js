function clearTiers() {
    $('#hitting1').html(`
    <div data-aos="fade-down" class="shape" id="tierH1">
    <h2>Tier 1 - High</h2>
    </div>
    <div data-aos="fade-down" class="shape" id="tierH2">
        <h2>Tier 2 - Average</h2>
    </div>
    <div data-aos="fade-down" class="shape" id="tierH3">
        <h2>Tier 3 - Low</h2>
    </div>
    `);
    $('#pitching1').html(`
    <div data-aos="fade-down" class="shape" id="tierH1">
    <h2>Tier 1 - High</h2>
    </div>
    <div data-aos="fade-down" class="shape" id="tierH2">
        <h2>Tier 2 - Average</h2>
    </div>
    <div data-aos="fade-down" class="shape" id="tierH3">
        <h2>Tier 3 - Low</h2>
    </div>
    `);
}

function filterTiers() {
    currentDisplay = [];
    var team = document.getElementById("team1").value;
    var position = document.getElementById("position1").value;
    var stat = document.getElementById("stat").value;
    var values = [];
    var sortedList = [];
    tier1 = [];
    tier2 = [];
    tier3 = [];
    console.log(team + ", " + position)
    if (activeTab == "hitting1") {
        for (let i = 0; i < hitters.length; i++) {
            if ((team == "All" || hitters[i]["Team"] == team) && (position == "All" || hitters[i]["Position"] == position)) {
                currentDisplay.push(hitters[i]);
            }
        }
    } else if (activeTab == "pitching1") {
        for (let i = 0; i < pitchers.length; i++) {
            if ((team == "All" || pitchers[i]["Team"] == team) && (position == "All" || pitchers[i]["Position"] == position)) {
                currentDisplay.push(pitchers[i]);
            }
        }
    }
    console.log(currentDisplay);
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
    console.log(sortedList);
    for (let i = 0; i < sortedList.length; i++) {
        if (i < (Math.floor((sortedList.length * 2) / 3))) {
            if (i < (Math.floor(sortedList.length / 3))) {
                tier1.push(sortedList[i]);
            } else {
                tier2.push(sortedList[i]);
            }
        } else {
            tier3.push(sortedList[i]);
        }
    }
    console.log(tier1);
    console.log(tier2);
    console.log(tier3);   
    printTier(stat);
}

function printTier(stat) {
    clearTiers();
    var blob;
    if (activeTab == "hitting1") {
        blob = "tierH"
    } else if (activeTab == "pitching1") {
        blob = "tierP"
    }
    var shown1 = [];
    var shown2 = [];
    var shown3 = [];
    var i1 = 0;
    var i2 = 0;
    var i3 = 0;
    while (i1 < tier1.length) {
        if (i1 < 10) {
            var a = Math.floor(Math.random() * tier1.length);
            for (let k = 0; k < tier1.length; k++) {
                if (k == a && shown1.includes(tier1[k]) == false) {
                    shown1.push(tier1[k]);
                    var view = document.createElement("p");
                    view.innerHTML = tier1[k]["Name"] + " - " + tier1[k][stat];
                    document.getElementById(blob + "1").appendChild(view);
                    i1++;
                }
            }
        } else {
            break;
        }
    }
    while (i2 < tier2.length) {
        if (i2 < 10) {
            var a = Math.floor(Math.random() * tier2.length);
            for (let k = 0; k < tier2.length; k++) {
                if (k == a && shown2.includes(tier2[k]) == false) {
                    shown2.push(tier2[k]);
                    var view = document.createElement("p");
                    view.innerHTML = tier2[k]["Name"] + " - " + tier2[k][stat];
                    document.getElementById(blob + "2").appendChild(view);
                    i2++;
                }
            }
        } else {
            break;
        }
    }
    while (i3 < tier3.length) {
        if (i3 < 10) {
            var a = Math.floor(Math.random() * tier3.length);
            for (let k = 0; k < tier3.length; k++) {
                if (k == a && shown3.includes(tier3[k]) == false) {
                    shown3.push(tier3[k]);
                    var view = document.createElement("p");
                    view.innerHTML = tier3[k]["Name"] + " - " + tier3[k][stat];
                    document.getElementById(blob + "3").appendChild(view);
                    i3++;
                }
            }
        } else {
            break;
        }
    }
    
        // var a = Math.floor(Math.random() * tier1.length);
        // for (let k = 0; k < tier1.length; k++) {
        //     if (k == a && shown1.includes(tier1[k]) == false) {
        //         shown1.push(tier1[k]);
        //         var view1 = document.createElement("p");
        //         view1.innerHTML = tier1[k]["Name"] + " - " + tier1[k][stat];
        //         document.getElementById(blob + "1").appendChild(view1);
        //     }
        // }
        // var b = Math.floor(Math.random() * tier2.length);
        // for (let k = 0; k < tier2.length; k++) {
        //     if (k == b && shown2.includes(tier2[k]) == false) {
        //         shown2.push(tier2[k]);
        //         var view2 = document.createElement("p");
        //         view2.innerHTML = tier2[k]["Name"] + " - " + tier2[k][stat];
        //         document.getElementById(blob + "2").appendChild(view2);
        //     }
        // }
        // var c = Math.floor(Math.random() * tier3.length);
        // for (let k = 0; k < tier3.length; k++) {
        //     if (k == c && shown3.includes(tier3[k]) == false) {
        //         shown3.push(tier3[k]);
        //         var view3 = document.createElement("p");
        //         view3.innerHTML = tier3[k]["Name"] + " - " + tier3[k][stat];
        //         document.getElementById(blob + "3").appendChild(view3);
        //     }
        // }
    console.log(shown1);
    console.log(shown2);
    console.log(shown3);
}