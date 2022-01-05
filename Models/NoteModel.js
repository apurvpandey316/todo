const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a title"],
    },
    description: {
      type: String,
      require: [true, "Please provide a decription"],
    },
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
