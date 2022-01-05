require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Note = require("./Models/NoteModel");
const User = require("./Models/UserModel");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();

mongoose.connect(
  process.env.DATABASE,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (e) => {
    if (e) console.log(e);
    else console.log("connect");
  }
);
const maxAge = 60 * 60 * 24 * 3;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
app.post("/create", async (req, res) => {
  try {
    // console.log(req);
    let note = new Note({
      name: req.body.name,
      description: req.body.description,
      user: req.body.user,
    });
    note = await note.save();
    // console.log(note);

    res.status(200).json({ note });
  } catch (e) {
    console.log(e);
    res.status(501).json({ error: e });
  }
});

app.post("/getAll", async (req, res) => {
  try {
    // console.log(req);
    let notes = await Note.find({ user: `${req.body.user}` });
    // console.log(notes);
    console.log(req.body.user);
    console.log(notes);
    res.status(200).json({ notes });
  } catch (e) {
    console.log(e);
    res.status(501).json({ error: e });
  }
});

app.post("/delete", async (req, res) => {
  try {
    // console.log(69);
    console.log(req);
    const id = req.body.id;
    let note = await Note.findByIdAndDelete(id);
    // console.log(note);
    res.status(200).json({ note });
  } catch (e) {
    console.log(e);
  }
});
app.post("/signUp", async (req, res) => {
  //fix the issue of duplicate usernames
  try {
    let user = new User({
      password: req.body.password,
      email: req.body.email,
      username: req.body.username,
    });
    user = await user.save();
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(501).json({ error: e });
  }
});
app.post("/login", async (req, res) => {
  //change this later
  try {
    let user = await User.findOne({ username: `${req.body.username}` });
    if (!user) {
      res.status(400).json({ error: "Username dosent exsist" });
      return;
    }
    //encrypt password using brycpt
    //fix this bcrypt issue
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).json({ error: "password is wrong" });
      return;
    }
    if (user.email != req.body.email) {
      res.status(400).json({ error: "email is wrong" });
      return;
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(501).json({ error: e });
  }
});
const jwtverify = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.json({ err: "This is a invalid user" });
    return;
  }
  const decodedToken = await jwt.verify(token, process.env.SECRET);
  if (!decodedToken) {
    res.json({ err: "This is a invalid user" });
    return;
  }
  console.log(decodedToken);
  req.user = await User.findById(decodedToken.id);
  next();
};
app.post("/fetchUser", jwtverify, (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
});
app.post("/userNotes", jwtverify, async (req, res) => {
  let notes = await Note.find({ user: `${req.user.username}` });
  console.log(notes);
  res.send(notes);
});
app.listen(3001, () => console.log("server running"));
