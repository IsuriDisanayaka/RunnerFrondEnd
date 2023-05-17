import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { makeStyles } from "@mui/styles";
import RunnerTable from "../../components/RunnerTable/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAlert } from "react-alert";

import "./style.css";


const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
  },
});



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: "Arial",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  button: {
    color: "white",
  },
  content: {
    padding: "20px",
  },
  textField: {
    marginRight: "20px",
  },
  table: {
    marginTop: "20px",
  },
}));

export default function Runner() {

  const navigate = useNavigate();

  const [runnerId, setRunnerId] = useState("")
  const [runnerName, setRunnerName] = useState("");
  const [radius, setRadius] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numberOfLaps, setNumberOfLaps] = useState("");
  const [updateCount, setUpdateCount] = useState(0);
  const [count, setCount] = useState(0);


  useEffect(() => {
    localStorage.setItem("loginStatus", true);
  });

  const alert = useAlert();

  const classes = useStyles();

  const validationSchema = yup.object({
    runnerName: yup.string().required("Runner Name is required"),
    radius: yup.number().required("Radius is required").positive("Radius must be a positive number").max(400, "Radius must be less than or equal to 400"),
    startTime: yup.string().required("Start Time is requiredUse digtal format (00:00:00),",),
    endTime: yup.string().required("End Time is required,Use digtal format (00:00:00)"),
    numberOfLaps: yup.number().required("Number of Laps is required").integer("Number of Laps must be an integer").positive("Number of Laps must be a positive number"),
  });
  const formik = useFormik({
    initialValues: {
      runnerName: "",
      radius: "",
      startTime: "",
      endTime: "",
      numberOfLaps: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSaveRunner(values);
    },
  });
  const handleUpdateCount = () => {
    setCount(count + 1);
  };

  function clearText() {
    formik.resetForm();

  }
  const [showAnotherButton, setShowAnotherButton] = useState(false);
  const [runnerData, setRunnerData] = useState(null);

  const handleButtonClick = (runner) => {
    setRunnerData({ ...runner, runnerId: runner.runnerId });
    setRunnerId(runner.runnerId)
    formik.setValues({
      runnerName: runner.runnerName,
      radius: runner.radius,
      startTime: runner.startTime,
      endTime: runner.endTime,
      numberOfLaps: runner.numberOfLaps,
      runnerId: runner.runnerId
    });

    setShowAnotherButton(true);
  };
  const handleUpdateRunner = (event) => {

    console.log("test", runnerId)
    event.preventDefault();


    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const startDateTime = new Date(`${formattedDate} ${formik.values.startTime}`);
    const endDateTime = new Date(`${formattedDate} ${formik.values.endTime}`);
    const duration = endDateTime - startDateTime;

    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    const formattedDuration = `${minutes}:${String(seconds).padStart(2, '0')}`;

    const speed = (2 * Math.PI * formik.values.radius * formik.values.numberOfLaps) / (duration / 1000);
    const formattedSpeed = speed.toFixed(3);


    const data = {
      "runnerName": formik.values.runnerName,

      "radius": formik.values.radius,
      "startTime": `${formattedDate} ${formik.values.startTime}`,
      "endTime": `${formattedDate} ${formik.values.endTime}`,
      "numberOfLaps": formik.values.numberOfLaps,
      "duration": formattedDuration.toString(),
      "speed": formattedSpeed,
    };

    axios
      .put(`http://localhost:8080/runner/${runnerId}`, (data))
      .then((response) => {
        console.log('Successfully updated runner:', response.data);
        alert.success('Success');
        setShowAnotherButton(false);
        setUpdateCount((prevCount) => prevCount + 1);
        clearText();
      })
      .catch((error) => {
        console.error('Error updating:', error);
        alert.error('An error occurred. Please try again later.');
      });



  };

  const handleLogout = () => {
    localStorage.removeItem("loginStatus");
    navigate('/');
  };

  const handleSaveRunner = (event) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const startDateTime = new Date(`${formattedDate} ${formik.values.startTime}`);
    const endDateTime = new Date(`${formattedDate} ${formik.values.endTime}`);
    const duration = endDateTime - startDateTime;

    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    const formattedDuration = `${minutes}:${String(seconds).padStart(2, '0')}`;

    const speed = (2 * Math.PI * formik.values.radius * formik.values.numberOfLaps) / (duration / 1000);
    const formattedSpeed = speed.toFixed(3);

    const data = {
      "runnerName": formik.values.runnerName,
      "radius": formik.values.radius,
      "startTime": `${formattedDate} ${formik.values.startTime}`,
      "endTime": `${formattedDate} ${formik.values.endTime}`,
      "numberOfLaps": formik.values.numberOfLaps,
      "duration": formattedDuration.toString(),
      "speed": formattedSpeed,
    };

    axios
      .post('http://localhost:8080/runner/save', data)
      .then((response) => {
        console.log('Successfully saved runner:', response.data);
        toast.success('Sucess!');
        setUpdateCount((prevCount) => prevCount + 1);
        clearText();
      })
      .catch((error) => {
        console.error('Error saving:', error);
        alert.error('An error occurred. Please try again later.');
      });
  };



  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              ON START
            </Typography>
            <button >
              <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout} className="logout-icon" />

            </button>
          </Toolbar>

        </AppBar>
        <div className={classes.content}>
          <Grid container spacing={2.4}>
            <Grid item xs={12} sm={2.3}>
              <TextField
                label="Runner Name"
                value={runnerName} onChange={(e) => setRunnerName(e.target.value)} fullWidth
                {...formik.getFieldProps("runnerName")}
                error={formik.touched.runnerName && formik.errors.runnerName}
                helperText={formik.touched.runnerName && formik.errors.runnerName}
              />
            </Grid>
            <Grid item xs={12} sm={2.3}>

              <TextField
                label="Radius (m)"
                fullWidth
                {...formik.getFieldProps("radius")}
                error={formik.touched.radius && formik.errors.radius}
                helperText={formik.touched.radius && formik.errors.radius}
              />

            </Grid>
            <Grid item xs={12} sm={2.3}>
              <TextField
                label="Start Time"
                value={startTime} onChange={(e) => setStartTime(e.target.value)}
                fullWidth
                {...formik.getFieldProps("startTime")}
                error={formik.touched.startTime && formik.errors.startTime}
                helperText={formik.touched.startTime && formik.errors.startTime}
              />
            </Grid>
            <Grid item xs={12} sm={2.3}>
              <TextField
                label="End Time"
                value={endTime} onChange={(e) => setEndTime(e.target.value)}
                fullWidth
                {...formik.getFieldProps("endTime")}
                error={formik.touched.endTime && formik.errors.endTime}
                helperText={formik.touched.endTime && formik.errors.endTime}
              />
            </Grid>
            <Grid item xs={12} sm={2.3}>

              <TextField
                label="Number Of Lap"
                value={numberOfLaps} onChange={(e) => setNumberOfLaps(e.target.value)}
                fullWidth
                type="number"
                {...formik.getFieldProps("numberOfLaps")}
                error={formik.touched.numberOfLaps && formik.errors.numberOfLaps}
                helperText={formik.touched.numberOfLaps && formik.errors.numberOfLaps}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleSaveRunner}>
            Submit
          </Button >
          {showAnotherButton && <button className="update-button" onClick={handleUpdateRunner}>Update</button>}
          {runnerData && (
            <div>

            </div>
          )}
        </div>
      </div>
      <RunnerTable className="runner-table" onButtonClick={handleButtonClick} updateCount={handleUpdateCount} />

    </ThemeProvider>
  );
}