const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
  deleteById,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const fs = require("fs");

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
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("note added successfully");
  } else {
    res.error("Error in tip");
  }
});

notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request recived to delete a note`);

  const idToRemove = req.params.id;
  console.log(idToRemove);
  deleteById("./db/db.json", idToRemove);
  res.json("note deleted")
});

module.exports = notes;
