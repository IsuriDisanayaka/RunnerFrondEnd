import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css";
import axios from "axios";
import { useAlert } from "react-alert";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function RunnerTable({ onButtonClick, updateCount }) {
  const [data, setData] = useState([]);
  const alert = useAlert();
  const [tableKey, setTableKey] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [selectedRunner, setSelectedRunner] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedRow, setHighlightedRow] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };


  const handleUpdateClick = () => {
    if (selectedRunner) {
      onButtonClick(selectedRunner);
    }
    setShowUpdateButton(false);
  };

  const handleDelete = (params, action) => {
    if (action === "delete") {
      setSelectedRunner(params.row);
      setShowConfirmation(true);
    } else if (action === "update") {
      setSelectedRunner(params.row);
      handleUpdateClick();
    }
  };
  const handleSearchRunner = () => {
    const input = document.getElementById('search-input').value;
    const type = document.getElementById('search-type').value;

    console.log("Hello", input, type);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/runners/search?${type}=${input}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.request(config)
      .then((response) => {
        if (response.data) {
          const formattedData = response.data.map((runner, index) => {
            const startTime = new Date(runner.startTime).toLocaleTimeString();
            const endTime = new Date(runner.endTime).toLocaleTimeString();

            return {
              ...runner,
              id: index + 1,
              startTime,
              endTime,
            };
          });
          setData(formattedData);
        }
        alert.success("Sucess")
        setShowSearchResults(true);

      })
      .catch((error) => {
        console.log(error);
        alert.info("Not Match Values")
      });

  };
  function downloadRunnerPDF() {
    const doc = new jsPDF();

    doc.autoTable({
      head: [['Runner Name', 'Radius', 'Start Time', 'End Time', 'Duration', 'speed', 'Number Of Laps']],
      body: data.map((row) => [row.runnerName, row.radius, row.startTime, row.endTime, row.duration, row.speed, row.numberOfLaps]),
    });

    doc.save('Runner Deatils.pdf');
  }
  const columns = [
    { field: "runnerName", headerName: "Runner Name", width: 150 },
    { field: "radius", headerName: "Radius", type: "number", width: 100 },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 180,
      valueFormatter: (params) => params.value.split(" ")[0],
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 180,
      valueFormatter: (params) => params.value.split(" ")[0],
    },
    { field: "duration", headerName: "Duration", width: 150 },
    {
      field: "speed",
      headerName: "Speed",
      width: 120,
    },
    {
      field: "numberOfLaps",
      headerName: "Number of Laps",
      type: "number",
      width: 150,
    },
    {
      field: "update",
      headerName: "Update",
      width: 120,
      renderCell: (params) => {
        const handleUpdate = () => {
          handleDelete(params, "update");
        };

        if (params.field === "update") {
          return (
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          handleDelete(params, "delete");
        };

        return <Button variant="contained" color="primary" onClick={handleDeleteClick}>Delete</Button>;
      },
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8080/runner/all")
      .then((response) => {
        if (response.data) {
          const formattedData = response.data.map((runner, index) => {
            const startTime = new Date(runner.startTime).toLocaleTimeString();
            const endTime = new Date(runner.endTime).toLocaleTimeString();

            return {
              ...runner,
              id: index + 1,
              startTime,
              endTime,
            };
          });
          setData(formattedData);
          console.log(formattedData);
        } else {
          console.error("Invalid API response:", response);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [updateCount]);

  const handleResetTable = () => {
    axios.get("http://localhost:8080/runner/all")

      .then((response) => {
        if (response.data) {
          const formattedData = response.data.map((runner, index) => {
            const startTime = new Date(runner.startTime).toLocaleTimeString();
            const endTime = new Date(runner.endTime).toLocaleTimeString();

            return {
              ...runner,
              id: index + 1,
              startTime,
              endTime,
            };
          });
          setData(formattedData);
        }
        setShowSearchResults(false);
        setSearchTerm('');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteConfirmation = (confirmed) => {
    if (confirmed) {
      const { runnerId } = selectedRunner;
      axios
        .delete(`http://localhost:8080/runner/${runnerId}`)
        .then((response) => {
          alert.success('Runner deleted successfully!');
          console.log("Runner deleted successfully:", response.data);

          const updatedData = data.filter((runner) => runner.id !== runnerId);
          setData(updatedData);
        })
        .catch((error) => {
          alert.info('Deletion canceled.');
          console.error("Error deleting runner:", error);
        });
    }

    setShowConfirmation(false);
    setSelectedRunner(null);
  };


  return (
    <div className="container">
      <div>
        <input type="text" id="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select id="search-type">
          <option value="runnerName">Name</option>
          <option value="radius">Radius</option>
          <option value="startTime">Start Time</option>
          <option value="endTime">End Time</option>
          <option value="duration">Duration</option>
          <option value="speed">Speed</option>
          <option value="numberOfLaps">Number Of Laps</option>
        </select>
        <button onClick={handleSearchRunner} id="search-button">Search</button>
        {showSearchResults ? (
          <button onClick={handleResetTable} id="reset-button">Reset</button>
        ) : null}
      </div>

      <DataGrid
        key={tableKey}
        rows={data}
        columns={columns}
        pageSize={5}
        sortingMode="server"
        disableSelectionOnClick
        onRowClick={handleRowClick}
        getRowClassName={(params) =>
          highlightedRow === params.rowIndex ? 'highlighted-row' : ''
        }
      />

      {showUpdateButton && (
        <Button
          className="update"
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Update
        </Button>
      )}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Do you want to delete this runner?</p>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDeleteConfirmation(true)}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteConfirmation(false)}
            >
              No
            </Button>
          </div>
        </div>
      )}

      <button onClick={downloadRunnerPDF}>Download PDF</button>

    </div>
  );
}