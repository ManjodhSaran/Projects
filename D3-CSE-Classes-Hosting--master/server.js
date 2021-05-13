const express = require('express');
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
 res.redirect('https://d3-classes.web.app/');
//     functionality();

//     res.render('index', {
//         elective_1: elective_1,
//         elective_2: elective_2,
//         elective_3: elective_3,
//         currentLecture: currentLecture,
//         lectureLink: lectureLink,
//         attendanceLink: attendanceLink,
//         currentTime: currentTime,
//         minutesIST: minutesIST,
//         day: day
//     })

});

function functionality() {
    // Variables

    date = new Date();
    currentOffset = date.getTimezoneOffset();
    ISTOffset = 330;   // IST offset UTC +5:30 
    ISTTime = new Date(date.getTime() + (ISTOffset + currentOffset) * 60000);

    // ISTTime now represents the time in IST coordinates

    currentTime = ISTTime.getHours()
    minutesIST = ISTTime.getMinutes()
    currentDate = ISTTime.getDay()
    // console.log(currentDate);
    // console.log(currentTime);

    currentLecture = "";
    lectureLink = "";
    attendanceLink = "";
    day = "";

    zoomLink = "https://gndec-ac-in.zoom.us/j/85714908654?pwd=bWVuZDN4OGwyTEoyNmJieWJpR2R5QT09";
    elective_1 = "https://guru.gndec.ac.in/mod/bigbluebuttonbn/view.php?id=11787";
    elective_2 = "https://guru.gndec.ac.in/mod/bigbluebuttonbn/view.php?id=11788";
    elective_3 = "https://guru.gndec.ac.in/mod/bigbluebuttonbn/view.php?id=11786";

    switch (currentDate) {
        case 0:
            day = "Sunday";
            currentLecture = "";
            break;
        case 1:
            day = "Monday";
            if (currentTime === 8) {
                currentLecture = "elective";
            } else if (currentTime === 9) {
                currentLecture = "DAA";
            } else if (currentTime === 10) {
                currentLecture = "FLAT";
            } else {
                currentLecture = "";
            }
            break;
        case 2:
            day = "Tuesday";
            if (currentTime === 8) {
                currentLecture = "AI";
            } else if (currentTime === 9) {
                currentLecture = "DBMS";
            } else if (currentTime === 10) {
                currentLecture = "COI";
            } else {
                currentLecture = "";
            }
            break;
        case 3:
            day = "Wednesday";
            if (currentTime === 8) {
                currentLecture = "elective";
            } else if (currentTime === 9) {
                currentLecture = "DAA";
            } else if (currentTime === 10) {
                currentLecture = "COI";
            } else {
                currentLecture = "";
            }
            break;
        case 4:
            day = "Thursday";
            if (currentTime === 8) {
                currentLecture = "AI";
            } else if (currentTime === 9) {
                currentLecture = "DBMS";
            } else if (currentTime === 10) {
                currentLecture = "FLAT";
            } else {
                currentLecture = "";
            }
            break;
        case 5:
            day = "Friday";
            if (currentTime === 8) {
                currentLecture = "elective";
            } else if (currentTime === 9) {
                currentLecture = "DAA";
            } else if (currentTime === 10) {
                currentLecture = "FLAT";
            } else {
                currentLecture = "";
            }
            break;
        case 6:
            day = "Saturday";
            if (currentTime === 8) {
                currentLecture = "";
            } else if (currentTime === 9) {
                currentLecture = "AI";
            } else if (currentTime === 10) {
                currentLecture = "DBMS";
            } else {
                currentLecture = "";
            }
            break;

        default:
            break;
    }

    switch (currentLecture) {
        case "elective": //1
            lectureLink = "";
            attendanceLink = "inClass";
            break;

        case "AI": //2
            lectureLink = zoomLink;
            attendanceLink = "https://guru.gndec.ac.in/mod/attendance/view.php?id=12644";
            break;

        case "COI": //3
            lectureLink = zoomLink;
            attendanceLink = "inClass";
            break;

        case "DAA": //4
            lectureLink = zoomLink;
            attendanceLink = "https://guru.gndec.ac.in/mod/attendance/view.php?id=12387";
            break;

        case "DBMS": //5
            lectureLink = zoomLink;
            attendanceLink = "https://guru.gndec.ac.in/mod/attendance/view.php?id=12461";
            break;

        case "FLAT": //6
            lectureLink = zoomLink;
            attendanceLink = "https://guru.gndec.ac.in/mod/attendance/view.php?id=12632";
            break;

    }
}
app.listen(port
    // , console.log(`server at ${port}`)
);
