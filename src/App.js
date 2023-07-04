import React, { useContext, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from './Components/Home';
import Register from './Registeration/Register';
import TopBar from './Components/TopBar';
import Post from './Posts/Post';
import Write from './Posts/Write';
import Profile from './Profile/Profile';
import UpdatePost from './Posts/UpdatePost';
import About from "./Components/About";
import Contact from "./Components/Contact";
import Search from "./search/Search";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "./Utility/Config";
import Footer from "./Components/Footer";
import Page404 from "./Components/Page404";
import { DialogContext } from "./ContextAPI/DialogContext";
import { SnackBarContext } from "./ContextAPI/SnackBar";

function URLs({ activeuser, setActiveUser }) {
  const navigate = useNavigate();
  const { handleClickOpen } = useContext(DialogContext);
  const { ActiveSnackBar } = useContext(SnackBarContext);
  const [firsttime, setFirstTime] = useState(true);

  useEffect(() => {
    async function verifyToken() {
      try {
        let config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
          }
        }
        const res = await axios.post(BASEURL + '/auth', '', config);
        const resData = await res.data;
        if (resData.success === true) {
          setActiveUser(true);
        }
        else {
          setActiveUser(false);
          if (resData.serverMsg)
          {
            console.log(resData.serverMsg);
            ActiveSnackBar(resData.serverMsg, 'error');
          }
          // navigate('/register');
        }
      }
      catch (err) {
        setActiveUser(false);
        if (firsttime) {
          setFirstTime(false);
          handleClickOpen(true);
        }
      }
    }
    verifyToken();
  }, [navigate])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/posts/:postid' element={<Post />}></Route>
        {
          activeuser && <Route path='/updatepost/:postid' element={<UpdatePost />}></Route>
        }
        {
          !activeuser && <Route path='/register' element={<Register />}></Route>
        }
        {
          activeuser && <Route path='/writepost' element={<Write />}></Route>
        }
        {
          activeuser && <Route path='/profile' element={<Profile />}></Route>
        }
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/*' element={<Page404 />}></Route>
      </Routes >
    </>
  )
}

function App() {
  const [activeuser, setActiveUser] = useState(false);
  return (
    <>
      <TopBar />
      <URLs activeuser={activeuser} setActiveUser={setActiveUser} />
      <Footer activeuser={activeuser} />
    </>

  );
}

export default App;
