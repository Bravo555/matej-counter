const MATEJS_START = 32;

function weeks_elapsed_since(date1, date2) {
    let oneday = 24 * 60 * 60 * 1000;
    let timeDiff = Math.abs((date2.getTime() - date1.getTime()) / (oneday));
    let dayDiff = Math.floor(timeDiff);

    return Math.floor(dayDiff / 7);
}

function matejs_passed(today) {
    let lessons = [
        new Date(2019, 1, 25, 12, 40),
        new Date(2019, 1, 21, 8, 15),
        new Date(2019, 1, 21, 10, 55),
        new Date(2019, 1, 21, 11, 50)
    ];

    let hours_passed = lessons.reduce((hours, lesson) => hours += weeks_elapsed_since(lesson, today), 0);
    return hours_passed;
}

let today = new Date();
document.getElementById('xd').innerHTML = (MATEJS_START - matejs_passed(today));
