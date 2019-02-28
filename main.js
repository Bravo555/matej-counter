const MATEJS_START = 32;

let today = new Date();

function weeks_elapsed_since(date1, date2) {
    let oneday = 24 * 60 * 60 * 1000;
    let dayDiff = Math.round(Math.abs((date2.getTime() - date1.getTime()) / (oneday)));

    return Math.floor(dayDiff / 7);
}

function matejs_passed(today) {
    let thursday = new Date(2019, 1, 21);
    let monday = new Date(2019, 1, 25);

    let thursdays_passed = weeks_elapsed_since(thursday, today)
    let mondays_passed = weeks_elapsed_since(monday, today)

    return MATEJS_START - (mondays_passed + 3 * thursdays_passed);
}

document.getElementById('xd').innerHTML = matejs_passed(today);
