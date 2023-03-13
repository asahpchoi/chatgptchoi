import { useState } from "react";
import TextField from "@mui/material/TextField";
import MicIcon from "@mui/icons-material/Mic";
import { Button } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicOffIcon from "@mui/icons-material/MicOff";
import "animate.css";

export function Toolbar({ addMessage }) {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true });
  };
  const stopListening = () => {
    setIsListening(false);
    addMessage(transcript);
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
          onClick={isListening ? stopListening : startListening}
          className={
            isListening
              ? "animate__animated animate__fadeIn animate__slow animate__infinite"
              : ""
          }
        >
          {!isListening ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </div>
    </>
  );
}
