import { useState } from "react";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";

import MicOffIcon from "@mui/icons-material/MicOff";
import "animate.css";

export function Toolbar({ addMessage }) {
  const [isListening, setIsListening] = useState(false);

  return (
    <>
      {" "}
      <div className="toolbar">
        <TextField
          id="message"
          style={{ width: "100%" }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              const msg = document.getElementById("message").value;
              document.getElementById("message").value = "";
              addMessage(msg);
            }
          }}
        />
      </div>
    </>
  );
}
