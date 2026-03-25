
// create a second background element to hold the notes
const notesBackground = document.createElement("div");
notesBackground.classList.add("notes-background");
document.body.appendChild(notesBackground);
// title
const title = document.createElement("h1");
title.textContent = "To-Do List";
notesBackground.appendChild(title);

// creating button and input field
const addButton = document.createElement("button");
addButton.textContent = "+";

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Add a new task...";

// add input as a note when button is clicked
addButton.addEventListener("click", function() {
    const note = document.createElement("div");
    note.classList.add("note");
    note.textContent = input.value;
    note.style.fontFamily = "Courier New, Courier, monospace";
    note.style.color = "white";
    notesBackground.appendChild(note);
    input.value = "";

    note.addEventListener("click", function() {
        note.remove();
    });

    note.addEventListener("mouseover", function() {
        note.style.textDecoration = "line-through";
        note.style.textDecorationThickness = "4px";
        note.style.textDecorationColor = "#822626";
    });

    note.addEventListener("mouseout", function() {
        note.style.textDecoration = "none";
    });
});

const addingContainer = document.createElement("div");
addingContainer.appendChild(input);
addingContainer.appendChild(addButton);
notesBackground.appendChild(addingContainer);

// styling

const titleStyle = document.querySelector("h1");
Object.assign(titleStyle.style, {
    color: "white",
    fontSize: "3em",
    fontFamily: "Courier New, Courier, monospace",

});

// notes background styling

Object.assign(notesBackground.style, {
    backgroundColor: "rgb(34, 49, 29)",
    width: "400px",
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

// button styling
Object.assign(addButton.style, {

    fontSize: "2em",
    backgroundColor: "transparent",
    color: "white",
    borderRadius: "20px",
    fontFamily: "Courier New, Courier, monospace",
});

// input styling
Object.assign(input.style, {

    backgroundColor: "transparent",
    color: "white",
    border: "none",
    borderBottom: "2px solid white",
    padding: "5px",
    fontFamily: "Courier New, Courier, monospace",

    marginTop: "5px",

});

// formats add button and input
Object.assign(addingContainer.style, {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20px",

    gap: "20px",
    position: "absolute",
    bottom: "20px",
}
);

// body styling

Object.assign(document.body.style, {
    display: "flex",             
    justifyContent: "center",    
    alignItems: "flex-start",        
    height: "100vh",           
    margin: 0,                   
    backgroundColor: "rgb(74, 103, 65)",
});

