import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import closeIcon from "../../assets/img/close.png";
import runnerImage from "../../assets/img/runner.jpg";
import logo from "../../assets/img/logo.png";

import "./style.css";


const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
  },
});

export default function HomePage() {
  const navigate = useNavigate();
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterpassword, setReEnterPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleSignUpClick = () => {
    setSignUpClicked(true);
    setSignInClicked(false);
  };


  const handleSignInClick = () => {
    setSignUpClicked(false);
    setSignInClicked(true);
  };

  function clearTextUser() {
    setName('');
    setAge('');
    setNicNumber('');
    setAddress('');
    setContact('');
    setEmail('');
    setNicNumber('');
    setPassword('');
    setReEnterPassword('');
  }
  function clearAdminText() {
    setAdminEmail('');
    setAdminPassword('');
  }
  const handleSaveUser = (event) => {
    event.preventDefault();

    const data = {
      name,
      age,
      nicNumber,
      contact,
      address,
      email,
      password,
      reEnterpassword,
    };

    console.log(data);

    axios.post('http://localhost:8080/user/save', data)
      .then(response => {
        console.log('Successfully saved customer:', response.data);
        alert('Your account has been created.');

        clearTextUser();
      })
      .catch(error => {
        console.error('Error saving:', error);
        alert('An error occurred. Please try again later.');

      });
  };
  const handlAdminLogin = (event) => {
    event.preventDefault();

    const data = {
      password: adminPassword,
      email: adminEmail,
    };

    console.log(data);
    localStorage.setItem("loginStatus", false);

    axios.post('http://localhost:8080/login', data)
      .then(response => {
        localStorage.setItem("loginStatus", (true))
        console.log('Successfull login:', response.data);
        navigate('/runner');
        toast.success('Welcome!');
        clearAdminText();
      })
      .catch(error => {
        console.error('Error saving:', error);
        alert('An error occurred. Please try again later.');

      });
  };

  const handleSignUpButtonClick = () => {
    handleSignUpClick();
    toggleSignInPopup(true);
  };

  const handleSignInButtonClick = () => {
    handleSignInClick();
    togglePopup(true);
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const toggleSignInPopup = () => {
    setShowSignInPopup(!showSignInPopup);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <AppBar position="static" className="appBar">
          <Toolbar>
            <img className="logo" src={logo} alt="" />
            <Typography variant="h6" className="title">
              ON START
            </Typography>
            <div className="button-container">
              <Button
                variant="contained"
                className={`button ${signInClicked ? "clicked" : ""}`}
                onClick={handleSignInButtonClick}
              >
                Sign Up
              </Button>
              {showSignInPopup && (
                <div className="overlay">
                  <div className="popup">
                    <img src={closeIcon} className="close-button" alt="" onClick={() => setShowSignInPopup(false)} />
                    <h1 style={{ color: " #12047A" }}>Sign In</h1>
                    <input type="email" placeholder="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                    <input type="text" placeholder="Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                    <button onClick={handlAdminLogin}>Login</button>
                  </div>
                </div>
              )}

              <Button variant="contained" className={`button ${signUpClicked ? "clicked" : ""}`} onClick={handleSignUpButtonClick} >  Sign In </Button>

              {showPopup && (
                <div className="overlay">
                  <div className="popup">
                    <img src={closeIcon} className="close-button" alt="" onClick={() => setShowPopup(false)} />
                    <h1 style={{ color: " #12047A" }}>Sign Up</h1>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    <input type="text" placeholder="NIC Number" value={nicNumber} onChange={(e) => setNicNumber(e.target.value)} />
                    <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="Re-Enter Password" value={reEnterpassword} onChange={(e) => setReEnterPassword(e.target.value)} />
                    <button onClick={handleSaveUser}>Submit</button>
                  </div>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <div className="content">
          <Grid container spacing={2.4}>
            <Grid item xs={12} sm={2.3}>
              <p className="welcome">Welcome</p>
              <p className="mainParagraph">
                Lace Up Your Shoes: ONStart is Calling All Runners
              </p>

              <img className="runnerImg" src={runnerImage} alt="" />
            </Grid>
            <Grid item xs={12} sm={2.3}></Grid>
          </Grid>
        </div>
        <footer>
          <Box p={2} bgcolor="primary.main" color="primary.contrastText">
            <Typography className="footer" variant="body2">
              © 2023 ONSTART. All Rights Reserved.
            </Typography>
          </Box>
        </footer>
      </div>
    </ThemeProvider>
  );
}