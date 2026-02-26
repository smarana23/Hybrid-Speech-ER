import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [emotion, setEmotion] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });

      const formData = new FormData();
      formData.append("file", blob, "recording.webm");

      const response = await fetch("https://hybrid-ser-backend.onrender.com/predict", {   //http://localhost:5000/predict
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setEmotion(data.emotion);
      setIsRecording(false);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  return (
    <div className="container">
      <h1>🎤 Emotion Detection</h1>
      <p style={{ opacity: 0.8, marginBottom: "25px" }}>
        Speak naturally and let the model detect your emotional state.
      </p>

      {!isRecording && (
        <button className="button start-btn" onClick={startRecording}>
          Start Recording
        </button>
      )}

      {isRecording && (
        <button className="button stop-btn" onClick={stopRecording}>
          Stop Recording
        </button>
      )}

      {emotion && (
        <>
          <div className="result">
            Emotion Detected: <strong>{emotion}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
