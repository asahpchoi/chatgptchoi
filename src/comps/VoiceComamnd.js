import React, { Component } from "react";

import axios from "axios";
import Recorder from "react-mp3-recorder";

export function VoiceCommand({ addMessage }) {
  const _onRecordingComplete = async (blob) => {
    console.log("recording", blob);
    const formData = new FormData();
    var fileOfBlob = new File([blob], "sound.mp3");

    formData.append("file", fileOfBlob);
    formData.append("model", "whisper-1");
    formData.append("language", "en");

    console.log({
      fileOfBlob,
    });

    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    addMessage(data.text);
    console.log(data.text);
  };
  return (
    <>
      <Recorder onRecordingComplete={_onRecordingComplete} />
    </>
  );
}
