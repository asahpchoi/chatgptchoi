import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import "animate.css";

export function Toolbar({ addMessage }) {
  return (
    <TextField
      id="message"
      style={{ width: "90%" }}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          const msg = document.getElementById("message").value;
          document.getElementById("message").value = "";
          addMessage(msg);
        }
      }}
    />
  );
}
