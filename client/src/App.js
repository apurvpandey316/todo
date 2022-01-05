import DashBoard from "./components/DashBoard";
import Notes from "./components/Notes";
import Modal from "./components/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cookies from "js-cookie";

function App() {
  const [notes, setnotes] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [openLogin, setopenLogin] = useState(false);
  const [openSignup, setopenSignup] = useState(false);
  const [curruser, setcurruser] = useState();
  const [data, setdata] = useState(false);
  //delete note function
  const addnote = () => setopenModal(true);
  const closeModel = () => setopenModal(false);
  const login = () => setopenLogin(true);
  const closeLogin = () => setopenLogin(false);
  const signup = () => setopenSignup(true);
  const closeSignup = () => setopenSignup(false);
  useEffect(() => {
    console.log(curruser);
    if (curruser != null)
      fetchAll(curruser).then((res) => setnotes(res.data.notes));
  }, [curruser]);
  useEffect(() => {
    fetchUserData().then(getUserData);
  }, []);
  const getUserData = async () => {
    try {
      const token = Cookies.get("jwt");
      if (!token) return;
      const res = await axios.post("/userNotes", {
        token,
      });
      // console.log(res.data.id);
      console.log(res.data);
      setnotes(res.data);
      // get the user
    } catch (e) {
      console.log(e);
    }
  };
  const fetchUserData = async () => {
    try {
      const token = Cookies.get("jwt");
      if (!token) return;
      const res = await axios.post("/fetchUser", {
        token,
      });
      // console.log(res.data.id);
      console.log(res.data);
      setcurruser(res.data.user.username);
      // setnotes(res.data);
      // get the user
    } catch (e) {
      console.log(e);
    }
  };
  const deleteNote = async (id) => {
    try {
      const res = await axios.post("/delete", {
        id,
      });
      console.log(res.data.note._id);
      console.log(notes);
      setnotes((notes) =>
        notes.filter((note) => note._id != res.data.note._id)
      );
      console.log(notes);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchAll = async (user) => {
    console.log();
    try {
      if (!curruser) return;
      const res = await axios.post("/getAll", { user });
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const userSignUp = async (e) => {
    e.preventDefault();
    try {
      const username = e.target.userName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const res = await axios.post("/signUp", {
        username,
        email,
        password,
      });
      setcurruser(res.data.user.username);
      setopenSignup(false);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const username = e.target.userName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const res = await axios.post("/login", {
        username,
        email,
        password,
      });
      setcurruser(res.data.user.username);
      console.log(res.data.user);
      setopenLogin(false);
    } catch (e) {
      console.log(e);
    }
  };
  const saveNote = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const description = e.target.description.value;
      const user = curruser;
      if (!user) return;
      const res = await axios.post("/create", {
        name,
        description,
        user,
      });
      setnotes((notes) => [...notes, res.data.note]);
      closeModel();
    } catch (e) {
      console.error(e);
    }
  };
  const logout = () => {
    Cookies.remove("jwt");
    setcurruser(null);
    setnotes([]);
    window.location.reload();
  };
  // if (!data) {
  //   getUserData();
  //   setdata(true);
  // }
  return (
    <div className="">
      {/* DashBoard at top */}
      {openModal && <Modal closeModel={closeModel} saveNote={saveNote} />}
      {openSignup && (
        <Signup closeSignup={closeSignup} userSignUp={userSignUp} />
      )}
      {openLogin && <Login closeLogin={closeLogin} userLogin={userLogin} />}
      <DashBoard
        addnote={addnote}
        login={login}
        signup={signup}
        user={curruser}
        logout={logout}
      />
      <div className="grid grid-cols-2 max-w-7xl mx-auto ">
        {notes.map((item, index) => (
          <Notes note={item} key={index} deleteNote={deleteNote} />
        ))}
      </div>
    </div>
  );
}

export default App;
