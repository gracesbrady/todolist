const cors = require('cors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, '/')));

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});

// Get notes
app.get('/notes', (req, res) => {

    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    res.json(data);
});

// post
app.post('/notes', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

    const newNote = {
        id: Date.now(),
        text: req.body.text
    };

    data.push(newNote);
    
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json(newNote);


});

// delete note
app.delete("/notes/:id", (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

        const id = req.params.id;

        const filtered = data.filter(note => String(note.id) !== String(id));

        fs.writeFileSync("data.json", JSON.stringify(filtered, null, 2));

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Delete failed" });
    }
});

