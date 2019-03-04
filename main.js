const MATEJS_START = 32;

const LESSONS = [
    new Date(2019, 1, 25, 12, 40),
    new Date(2019, 1, 21, 8, 15),
    new Date(2019, 1, 21, 10, 55),
    new Date(2019, 1, 21, 11, 50)
];

function weeks_elapsed_since(date1, date2) {
    let oneday = 24 * 60 * 60 * 1000;
    let timeDiff = Math.abs((date2.getTime() - date1.getTime()) / (oneday));
    let dayDiff = Math.floor(timeDiff);

    return Math.floor(dayDiff / 7);
}

function matejs_passed(today, lessons) {
    let hours_passed = lessons.reduce((hours, lesson) => hours += weeks_elapsed_since(lesson, today), 0);
    return hours_passed;
}

function find_next_matej(today, lessons) {
    let nextmatej = lessons.filter(date => date.getDay() > today.getDay())
        .reduce((prev, next) => prev = today - next > today - prev ? next : prev);
    nextmatej = new Date(nextmatej);

    let week = 7 * 24 * 60 * 60 * 1000;
    let weeks_passed = Math.floor((today.getTime() - nextmatej.getTime()) / week)
    nextmatej.setDate(nextmatej.getDate() + (weeks_passed + 1) * 7);
    return nextmatej;
}

function time_until_next_matej(today, lessons) {
    return find_next_matej(today, lessons).getTime() - today.getTime();
}

function formatTime(duration) {
    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;

    let days = Math.floor(duration / _day);
    let hours = Math.floor((duration % _day) / _hour);
    let minutes = Math.floor((duration % _hour) / _minute);
    let seconds = Math.floor((duration % _minute) / _second);

    return `${days} dni, ${hours} godzin, ${minutes} minut, ${seconds} sekund`;
}

let today = new Date();

document.getElementById('matejsleft').innerHTML = (MATEJS_START - matejs_passed(today, LESSONS));
document.getElementById('when').innerHTML = find_next_matej(today, LESSONS).toLocaleString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
document.getElementById('timeuntil').innerHTML = formatTime(time_until_next_matej(today, LESSONS));

function updateTime() {
    let today = new Date();
    document.getElementById('timeuntil').innerHTML = formatTime(time_until_next_matej(today, LESSONS));
}

setInterval(updateTime, 1000);
