import React, { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css";
import UpdateButton from "../UpdateButton/Index";

export default function RunnerTable() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row.id);
    setShowUpdateButton(true);
  };
  const columns = [
    { field: "runnerName", headerName: "Runner Name", width: 150 },
    { field: "radius", headerName: "Radius", type: "number", width: 100 },
    { field: "startTime", headerName: "Start Time", width: 180 },
    { field: "endTime", headerName: "End Time", width: 180 },
    {
      field: "numberOfLaps",
      headerName: "Number of Laps",
      type: "number",
      width: 150,
    },
    {
      field: "update",
      headerName: "update",
      width: 120,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRowClick(params.row)}
          >
            Update
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => {
        return <button>Delete</button>;
      },
    },
  ];

  const rows = [
    {
      id: 1,
      runnerName: "John",
      radius: 10,
      startTime: "2023-05-08T10:00:00",
      endTime: "2023-05-08T11:00:00",
      numberOfLaps: 5,
    },
    {
      id: 2,
      runnerName: "Jane",
      radius: 12,
      startTime: "2023-05-08T11:00:00",
      endTime: "2023-05-08T12:00:00",
      numberOfLaps: 4,
    },
    {
      id: 3,
      runnerName: "Bob",
      radius: 8,
      startTime: "2023-05-08T12:00:00",
      endTime: "2023-05-08T13:00:00",
      numberOfLaps: 6,
    },
    {
      id: 4,
      runnerName: "Alice",
      radius: 14,
      startTime: "2023-05-08T13:00:00",
      endTime: "2023-05-08T14:00:00",
      numberOfLaps: 3,
    },
    {
      id: 5,
      runnerName: "Mike",
      radius: 10,
      startTime: "2023-05-08T14:00:00",
      endTime: "2023-05-08T15:00:00",
      numberOfLaps: 7,
    },
  ];

  return (
    <div className="container">
      <div>
        <input type="text" id="search-input" />
        <select id="search-type"></select>
        <button id="search-button">Search</button>
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={5}
        sortingMode="server"
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
    </div>
  );
}
