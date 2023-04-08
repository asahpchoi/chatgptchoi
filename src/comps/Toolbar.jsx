import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import "animate.css";

export function Toolbar({ addMessage }) {
  const send = () => {
    const msg = document.getElementById("message").value;
    document.getElementById("message").value = "";
    addMessage(msg);
  };
  return (
    <>
      <TextField
        id="message"
        multiline
        maxRows={4}
        fullWidth
        sx={{ m: 1 }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            send();
          }
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          send();
        }}
      >
        Send
      </Button>
    </>
  );
}
