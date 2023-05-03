import React, { useState } from "react";
import { Grid } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import RunnerTable from "../../components/RunnerTable/index";
import UpdateButton from "../../components/UpdateButton/Index";

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
  const [runnerName, setRunnerName] = useState("");
  const [runnerNameError, setRunnerNameError] = useState(false);
  const [radius, setRadius] = useState("");
  const [radiusError, setRadiusError] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [startTimeError, setStartError] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [endTimeError, setEndTimeError] = useState(false);
  const [numberOfLap, setNumberOfLap] = useState("");
  const [numberOfLapError, setNumberOfLapError] = useState(false);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              ON START
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <Grid container spacing={2.4}>
            <Grid item xs={12} sm={2.3}>
              <TextField label="Runner Name" fullWidth value={runnerName} />
            </Grid>
            <Grid item xs={12} sm={2.3}>
              <TextField label="Radius(m)" fullWidth value={radius} />
            </Grid>
            <Grid item xs={12} sm={2.3}>
              <TextField label="Start Time" fullWidth value={startTime} />
            </Grid>
            <Grid item xs={12} sm={2.3}>
              <TextField label="End Time" fullWidth value={endTime} />
            </Grid>
            <Grid item xs={12} sm={2.3}>
              <TextField
                label="Number Of Lap"
                fullWidth
                type="number"
                value={numberOfLap}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
            Submit
          </Button>
          <UpdateButton/>

        </div>
      </div>
      <RunnerTable />
    </ThemeProvider>
  );
}
