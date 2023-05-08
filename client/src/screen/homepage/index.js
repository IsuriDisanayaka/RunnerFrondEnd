import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import closeIcon from "../../assets/img/close.png";
import "./style.css";

const runnerImage = require("../../assets/img/runner.jpg");
const logo = require("../../assets/img/logo.png");

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
  },
});

export default function HomePage() {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setemail] = useState("");

  const handleSignUpClick = () => {
    setSignUpClicked(true);
    setSignInClicked(false);
  };

  const handleSignInClick = () => {
    setSignUpClicked(false);
    setSignInClicked(true);
  };

  const handleClose = () => {
    setSignUpClicked(false);
    setSignInClicked(false);
  };

  const handleSubmit = () => {
    console.log({ name, age, nicNumber, contact, address });
    handleClose();
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
                    <img
                      src={closeIcon}
                      className="close-button"
                      onClick={() => setShowPopup(false)}
                    />
                    <h1 style={{ color: " #12047A" }}>Sign In</h1>
                    <input type="email" placeholder="email" />
                    <input type="text" placeholder="Password" />
                    <button>Submit</button>
                  </div>
                </div>
              )}

              <Button
                variant="contained"
                className={`button ${signUpClicked ? "clicked" : ""}`}
                onClick={handleSignUpButtonClick}
              >
                Sign In
              </Button>

              {showPopup && (
                <div className="overlay">
                  <div className="popup">
                    <img
                      src={closeIcon}
                      className="close-button"
                      onClick={() => setShowPopup(false)}
                    />
                    <h1 style={{ color: " #12047A" }}>Sign Up</h1>
                    <input type="text" placeholder="Name" />
                    <input type="number" placeholder="Age" />
                    <input type="text" placeholder="NIC Number" />
                    <input type="text" placeholder="Contact" />
                    <input type="text" placeholder="Address" />
                    <input type="email" placeholder="email" />
                    <input type="text" placeholder="Password" />
                    <input type="text" placeholder="Re-Enter Password" />
                    <button>Submit</button>
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

              {/* <p className='mainParagraph'>Lace Up Your Shoes: ONStart is Calling All Runners</p> */}
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
