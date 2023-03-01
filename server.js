const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqueid = require('./Develop/helper/uniqueid')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

// get request for the index.html page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);


// GET request for notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
});

// POST request to add a note
app.post('api/notes', (req, res) => {

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uniqueid(),
    };

    // Obtain existing notes
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new Note
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          './Develop/db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated Notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);