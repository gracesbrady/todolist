// ---------------------- LOCAL STORAGE SETUP ----------------------
let notesArray = JSON.parse(localStorage.getItem("notes")) || [];

// ---------------------- CREATE BACKGROUND & CONTAINER ----------------------
const notesBackground = document.createElement("div");
document.body.appendChild(notesBackground);

const notesContainer = document.createElement("div");
notesBackground.appendChild(notesContainer);

// ---------------------- TITLE ----------------------
const title = document.createElement("h1");
title.textContent = "To-Do List";
notesContainer.appendChild(title);

// ---------------------- RENDER EXISTING NOTES ----------------------
notesArray.forEach(function(text) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.style.fontFamily = "Courier New, Courier, monospace";
    note.style.color = "white";
    note.style.width = "100%";
    note.style.textAlign = "center";
    note.appendChild(document.createTextNode(text));
    notesContainer.appendChild(note);
    noteEvents(note, text);
});

// ---------------------- ADD NOTE INPUT & BUTTON ----------------------
const addButton = document.createElement("button");
addButton.textContent = "+";

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Add a new task...";

addButton.addEventListener("click", function() {
    const text = input.value.trim();
    if (!text) return;

    const note = document.createElement("div");
    note.classList.add("note");
    note.style.fontFamily = "Courier New, Courier, monospace";
    note.style.color = "white";
    note.appendChild(document.createTextNode(text));
    notesContainer.appendChild(note);

    notesArray.push(text);
    localStorage.setItem("notes", JSON.stringify(notesArray));

    input.value = "";
    noteEvents(note, text);
});

const addingContainer = document.createElement("div");
addingContainer.appendChild(input);
addingContainer.appendChild(addButton);
notesBackground.appendChild(addingContainer);

// ---------------------- STYLING ----------------------
Object.assign(title.style, {
    color: "white",
    fontSize: "3em",
    fontFamily: "Courier New, Courier, monospace",
});

Object.assign(notesBackground.style, {
    backgroundColor: "rgb(34, 49, 29)",
    width: "90%",
    maxWidth: "400px",
    minHeight: "400px",
    marginTop: "100px",
    borderRadius: "10px",
    borderColor: "black",
    borderWidth: "2px",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    position: "relative",
    top: "75px",
    left: "auto",
});

Object.assign(addButton.style, {
    fontSize: "2em",
    backgroundColor: "transparent",
    color: "white",
    borderRadius: "20px",
    fontFamily: "Courier New, Courier, monospace",
    cursor: "pointer",
});

Object.assign(input.style, {
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    borderBottom: "2px solid white",
    padding: "5px",
    fontFamily: "Courier New, Courier, monospace",
    marginTop: "5px",
});

Object.assign(addingContainer.style, {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20px",
    gap: "20px",
    position: "absolute",
    bottom: "20px",
});

Object.assign(document.body.style, {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    height: "100vh",
    margin: 0,
    backgroundColor: "rgb(74, 103, 65)",
});

// ---------------------- NOTE EVENTS ----------------------
function noteEvents(note, text) {
    // Delete note on click
    note.addEventListener("click", function() {
        notesContainer.removeChild(note);
        const index = notesArray.indexOf(text);
        if (index > -1) {
            notesArray.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notesArray));
        }
    });

    // Strike-through on hover
    note.addEventListener("mouseenter", function() {
        note.style.textDecoration = "line-through"; 
        note.style.textDecorationThickness = "4px";
        note.style.textDecorationColor = "#822626";
    });

    note.addEventListener("mouseleave", function() {
        note.style.textDecoration = "none";
    });
}

// ---------------------- POMODORO TIMER ----------------------
const pomodoroBackground = document.createElement("div");
const pomodoroTimer = document.createElement("p");
const resetButton = document.createElement("button");
const breakButton = document.createElement("button");

pomodoroTimer.style.cursor = "pointer";
resetButton.style.cursor = "pointer";
breakButton.style.cursor = "pointer";
addButton.style.cursor = "pointer";

resetButton.textContent = "↩";
breakButton.textContent = "☕";
pomodoroTimer.textContent = "25:00";

pomodoroBackground.appendChild(pomodoroTimer);
pomodoroBackground.appendChild(resetButton);
pomodoroBackground.appendChild(breakButton);

// Styling Pomodoro background
Object.assign(pomodoroBackground.style, {
    backgroundColor: "rgb(34, 49, 29)",
    borderRadius: "10px",
    borderColor: "black",
    borderWidth: "2px",
    borderStyle: "solid",
    display: "flex",
    position: "relative",
    width: "90%",
    maxWidth: "350px",
    height: "200px",
    marginTop: "175px",
});

Object.assign(pomodoroTimer.style, {
    fontSize: "3em",
    fontFamily: "Courier New, Courier, monospace",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    height: "100px",
    width: "350px",
});

Object.assign(resetButton.style, {
    fontSize: "2em",
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "white",
    borderColor: "transparent",
    fontFamily: "Courier New, Courier, monospace",
    width: "100px",
    height: "50px",
    margin: "2px",
    position: "absolute",
    bottom: "10px",
    right: "10px",
});

Object.assign(breakButton.style, {
    fontSize: "2em",
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "white",
    borderColor: "transparent",
    fontFamily: "Courier New, Courier, monospace",
    width: "100px",
    height: "50px",
    margin: "2px",
    position: "absolute",
    bottom: "10px",
    left: "10px",
});

// Timer functionality
let timerClicked = false;
let timerBreak = false;
let timerInterval;
let nextTokenIndex = 0;

pomodoroTimer.addEventListener("click", function() {
    if (!timerClicked) {
        startTimer();
    } else {
        clearInterval(timerInterval);
        timerClicked = false;
    }
});

function startTimer() {
    timerClicked = true;
    let timeLeft = pomodoroTimer.textContent.split(":").reduce((acc, time) => acc * 60 + parseInt(time), 0);

    timerInterval = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        pomodoroTimer.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

        if (timeLeft <= 0 && !timerBreak) {
            clearInterval(timerInterval);
            pomodoroTimer.textContent = "00:00";
            timerClicked = false;
        } else if (timeLeft <= 0 && timerBreak) {
            clearInterval(timerInterval);
            pomodoroTimer.textContent = "00:00";
            timerClicked = false;
            timerBreak = false;
        }
        timeLeft--;
    }, 1000);
}

resetButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    pomodoroTimer.textContent = "25:00";
    timerClicked = false;
    timerBreak = false;
});

breakButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    pomodoroTimer.textContent = "5:00";
    timerClicked = false;
    timerBreak = true;
});

// ---------------------- STUDY SESSIONS ----------------------
const studySessions = document.createElement("div");
const pomodoroWrapper = document.createElement("div");

pomodoroWrapper.appendChild(pomodoroBackground);
pomodoroWrapper.appendChild(studySessions);
document.body.appendChild(pomodoroWrapper);

Object.assign(studySessions.style, {
    backgroundColor: "rgb(34, 49, 29)",
    borderRadius: "10px",
    borderColor: "black",
    borderWidth: "2px",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    position: "relative",
    width: "90%",
    maxWidth: "350px",
    height: "25px",
    marginTop: "10px",
});

Object.assign(pomodoroWrapper.style, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

const sessionsInput = document.createElement("input");
sessionsInput.type = "text";
sessionsInput.placeholder = "Enter # of sessions...";
sessionsInput.style.backgroundColor = "transparent";
sessionsInput.style.color = "white";
sessionsInput.style.border = "none";
sessionsInput.style.borderBottom = "2px solid white";
sessionsInput.style.padding = "5px";
sessionsInput.style.fontFamily = "Courier New, Courier, monospace";

studySessions.appendChild(sessionsInput);

sessionsInput.addEventListener("blur", function () {
    const sessions = parseInt(sessionsInput.value);
    if (sessions > 0) {
        for (let i = 0; i < sessions; i++) {
            const sessionToken = document.createElement("p");
            sessionToken.textContent = "○";
            sessionToken.style.fontSize = "1.5em";
            sessionToken.style.color = "white";
            studySessions.appendChild(sessionToken);
        }
        sessionsInput.remove();
    }
});

const tokenReset = document.createElement("button");
tokenReset.textContent = "↩";
studySessions.appendChild(tokenReset);

Object.assign(tokenReset.style, {
    fontSize: "1em",
    backgroundColor: "transparent",
    color: "white",
    borderColor: "transparent",
    fontFamily: "Courier New, Courier, monospace",
    cursor: "pointer",
    position: "absolute",
    right: "10px",
});

tokenReset.addEventListener("click", function() {
    const tokens = studySessions.querySelectorAll("p");
    tokens.forEach(function(token) {
        studySessions.removeChild(token);
    });
    studySessions.appendChild(sessionsInput);
    sessionsInput.value = "";
    nextTokenIndex = 0;
});
