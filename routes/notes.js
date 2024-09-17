const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("note added successfully");
  } else {
    res.error("Error in tip");
  }
});

module.exports = notes
