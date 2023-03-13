import { useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export function Toolbar({ addMessage }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => {
    document.getElementById("message").value = transcript;

    resetTranscript();
    SpeechRecognition.stopListening({});
  };

  return (
    <>
      {" "}
      <div className="toolbar">
        <TextField
          id="message"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              const msg = document.getElementById("message").value;
              document.getElementById("message").value = "";
              addMessage(msg);
            }
          }}
          style={{ width: "70%" }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            const msg = document.getElementById("message").value;
            document.getElementById("message").value = "";
            addMessage(msg);
          }}
        >
          Send
        </Button>
        <Button
          variant="contained"
          onTouchStart={startListening}
          onMouseDown={startListening}
          onTouchEnd={stopListening}
          onMouseUp={stopListening}
        >
          Hold to talk
        </Button>
      </div>
    </>
  );
}
