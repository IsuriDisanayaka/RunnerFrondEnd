import React from "react";
import { Button } from "@mui/material";

const UpdateButton = ({ showUpdateButton }) => {
  return (
    <div>
      {showUpdateButton && (
        <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
          Update
        </Button>
      )}
    </div>
  );
};

export default UpdateButton;
