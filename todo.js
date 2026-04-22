let timerClicked = false;
let timerBreak = false;
let timerInterval;

/*
   ----- CREATING ELEMENTS -----
*/

// TO DO LIST SECTION
// Background holding notes and title
const notesBackground = document.createElement("div");
document.body.appendChild(notesBackground);

// title
const title = document.createElement("h1");
title.textContent = "To-Do List";
notesBackground.appendChild(title);

// creating a notes container
const notesContainer = document.createElement("div");
notesBackground.appendChild(notesContainer);

// creating add button
const addButton = document.createElement("button");
addButton.textContent = "+";

// creating input field
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Add a new task...";

const addingContainer = document.createElement("div");
addingContainer.appendChild(input);
addingContainer.appendChild(addButton);
notesBackground.appendChild(addingContainer);

// creating notes
const notesList = document.createElement("div");
notesContainer.appendChild(notesList);

// POMODORO TIMER SECTION
// creating pomodoro timer elements
const pomodoroBackground = document.createElement("div");
const pomodoroTimer = document.createElement("p");
const resetButton = document.createElement("button");
const breakButton = document.createElement("button");

// adding sessions tracker
const studySessions = document.createElement("div");
const pomodoroWrapper = document.createElement("div");

pomodoroWrapper.appendChild(pomodoroBackground);
pomodoroWrapper.appendChild(studySessions);
document.body.appendChild(pomodoroWrapper);

// adding input for sessions tracker
const sessionsInput = document.createElement("input");
sessionsInput.type = "text";
sessionsInput.placeholder = "Enter # of sessions...";
studySessions.appendChild(sessionsInput);
// setting text content for pomodoro timer elements
resetButton.textContent = "↩";
breakButton.textContent = "☕";
pomodoroTimer.textContent = "25:00";

// appending pomodoro timer elements to the background
pomodoroBackground.appendChild(pomodoroTimer);
pomodoroBackground.appendChild(resetButton);
pomodoroBackground.appendChild(breakButton);

// adding token reset button
const tokenReset = document.createElement("button");
tokenReset.textContent = "↩";
studySessions.appendChild(tokenReset);

/* 
   ----- STYLING -----
*/

// title 
const titleStyle = document.querySelector("h1");
Object.assign(titleStyle.style, {
    color: "white",
    fontSize: "3em",
    fontFamily: "Courier New, Courier, monospace",
    textAlign: "center",

});

// background
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

// add button
Object.assign(addButton.style, {
    fontSize: "2em",
    backgroundColor: "transparent",
    color: "white",
    borderRadius: "20px",
    fontFamily: "Courier New, Courier, monospace",
    cursor: "pointer",
});

// input box
Object.assign(input.style, {

    backgroundColor: "transparent",
    color: "white",
    border: "none",
    borderBottom: "2px solid white",
    padding: "5px",
    fontFamily: "Courier New, Courier, monospace",

    marginTop: "5px",

});

// Container including input and add button
Object.assign(addingContainer.style, {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20px",

    gap: "20px",
    position: "absolute",
    bottom: "20px",
});

// body
Object.assign(document.body.style, {
    display: "flex",             
    justifyContent: "center",    
    alignItems: "flex-start",        
    gap: "20px",
    height: "100vh",           
    margin: 0,                   
    backgroundColor: "rgb(74, 103, 65)",
});

// notes container
Object.assign(notesContainer.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    marginTop: "20px",
});

// POMDORO TIMER STYLES
// background style
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

// timer style
Object.assign(pomodoroTimer.style, {
    cursor: "pointer",
    fontSize: "3em",
    fontFamily: "Courier New, Courier, monospace",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    height: "100px",
    width: "350px",
});

// reset button style
Object.assign(resetButton.style, {
    cursor: "pointer",
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

// break button style
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
    cursor: "pointer",
});

// study session container style
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

// sessions input style
Object.assign(sessionsInput.style, {
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    borderBottom: "2px solid white",
    padding: "5px",
    fontFamily: "Courier New, Courier, monospace",
});

// session token reset button style
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

// styles for notes list
Object.assign(notesList.style, {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    gap: "2px",
});

/*
    ----- EVENT LISTENERS -----
*/

// POMODRO TIMER EVENT LISTENERS
// sets timer to break time
breakButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    pomodoroTimer.textContent = "05:00";
    timerClicked = false;
    timerBreak = true;
});

// stops timer if running, starts timer if not running
pomodoroTimer.addEventListener("click",function () {
    if (timerClicked == false) {
        startTimer();
    } else {
        clearInterval(timerInterval);
        timerClicked = false;
    }
});

// resets timer
resetButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    pomodoroTimer.textContent = "25:00";
    timerClicked = false;
    timerBreak = false;
});

// updates sessions tracker based on input
sessionsInput.addEventListener("blur", function () {
    const sessions = sessionsInput.value;
    if (sessions > 0) {
        for (let i = 0; i < sessions; i++) {
            const sessionToken = document.createElement("p");
            sessionToken.textContent = "○";
            sessionToken.style.fontSize = "1.5em";
            sessionToken.style.color = "white";
            sessionsInput.remove();
            studySessions.appendChild(sessionToken);
        }
    }
});

// resets sessions tracker
tokenReset.addEventListener("click", function() {
    const tokens = studySessions.querySelectorAll("p");
    tokens.forEach(function(token) {
        studySessions.removeChild(token);
    });
    studySessions.appendChild(sessionsInput);
    sessionsInput.value = "";
    nextTokenIndex = 0;
});


// add notes from storage and update storage with new note
addButton.addEventListener("click", async function() {
    const text = input.value;

    if (!text) return;
    await fetch('/notes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });

    input.value = "";
    loadNotes();
});

/*
    ----- FUNCTIONS -----
*/
// TIMER FUNCTION
let nextTokenIndex = 0;
function startTimer() {
    if (timerClicked == false) {
        timerClicked = true;
        let timeLeft = pomodoroTimer.textContent.split(":").reduce((acc, time) => acc * 60 + parseInt(time), 0);
        timerInterval = setInterval(function() {

            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            pomodoroTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            if (timeLeft <= 0 && timerBreak == false) {

                clearInterval(timerInterval);
                pomodoroTimer.textContent = "00:00";
                const tokens = studySessions.querySelectorAll("p");
                if(nextTokenIndex < tokens.length) {
                    tokens[nextTokenIndex].textContent = "●";
                    nextTokenIndex++;

                }

                timerClicked = false;
            } else if (timeLeft <= 0 && timerBreak == true) {
                clearInterval(timerInterval);
                pomodoroTimer.textContent = "00:00";
                timerClicked = false;
                timerBreak = false;
            }
            timeLeft--;
        }, 1000);

        

} else {
        clearInterval(timerInterval);
        timerClicked = false;
}

}

// INCORPORATING APIS
async function loadNotes() {

    const response = await fetch('/notes');
    const notes = await response.json();

    notesList.innerHTML = "";

    notes.forEach(note => {

        const noteElement = document.createElement("div");
        noteElement.textContent = note.text;

        noteElement.classList.add("note");
        noteElement.dataset.id = note.id;

        noteEvents(noteElement);

        notesList.appendChild(noteElement);
    });
}

// adds event listeners to note elements
function noteEvents(noteElement) {
    noteElement.addEventListener("click", async function () {

        await fetch(`/notes/${noteElement.dataset.id}`, {
            method: "delete"
        });

        loadNotes();
    });

    noteElement.addEventListener("mouseenter", function() {
        noteElement.style.textDecoration = "line-through";
        noteElement.style.textDecorationColor = "#7E2E31";
        noteElement.style.textDecorationThickness = "4px";
    });

    noteElement.addEventListener("mouseleave", function() {
        noteElement.style.textDecoration = "none";
    });

    Object.assign(noteElement.style, {
        fontFamily: "Courier New, Courier, monospace",
        color: "white",
        fontSize: "17px",
        cursor: "pointer",
    });

}

loadNotes();
















