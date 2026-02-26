// import React, { useState, useRef } from "react";
// import "./App.css";

// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Radar } from "react-chartjs-2";

// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// function App() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [emotion, setEmotion] = useState(null);
//   const [probabilities, setProbabilities] = useState(null);

//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorderRef.current = mediaRecorder;
//     chunksRef.current = [];

//     mediaRecorder.ondataavailable = (event) => {
//       chunksRef.current.push(event.data);
//     };

//     mediaRecorder.onstop = async () => {
//       const blob = new Blob(chunksRef.current, { type: "audio/webm" });

//       const formData = new FormData();
//       formData.append("file", blob, "recording.webm");

//       try {
//         const response = await fetch(
//           "https://hybrid-ser-backend.onrender.com/predict",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         const data = await response.json();

//         setEmotion(data.emotion);
//         setProbabilities(data.probability);
//       } catch (error) {
//         console.error("Error:", error);
//         alert("Backend request failed. Please try again.");
//       }

//       setIsRecording(false);
//     };

//     mediaRecorder.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//   };

//   const radarData = probabilities && {
//     labels: [
//       "neutral",
//       "calm",
//       "happy",
//       "sad",
//       "angry",
//       "fearful",
//       "disgust",
//       "surprised",
//     ],
//     datasets: [
//       {
//         label: "Emotion Confidence",
//         data: probabilities,
//         backgroundColor: "rgba(0, 200, 255, 0.2)",
//         borderColor: "rgba(0, 200, 255, 1)",
//         borderWidth: 2,
//       },
//     ],
//   };

//   return (
//     <div className="container">
//       <h1>🎤 Emotion Detection</h1>
//       <p style={{ opacity: 0.8, marginBottom: "25px" }}>
//         Speak naturally and let the model detect your emotional state.
//       </p>

//       {!isRecording && (
//         <button className="button start-btn" onClick={startRecording}>
//           Start Recording
//         </button>
//       )}

//       {isRecording && (
//         <button className="button stop-btn" onClick={stopRecording}>
//           Stop Recording
//         </button>
//       )}

//       {emotion && (
//         <div className="result">
//           Emotion Detected: <strong>{emotion}</strong>
//         </div>
//       )}

//       {probabilities && (
//         <div style={{ marginTop: "30px", maxWidth: "500px" }}>
//           <Radar data={radarData} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState, useRef } from "react";
import "./App.css";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const [probabilities, setProbabilities] = useState(null);

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
      setIsLoading(true);

      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("file", blob, "recording.webm");

      try {
        const response = await fetch(
          "https://hybrid-ser-backend.onrender.com/predict",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setEmotion(data.emotion);
        setProbabilities(data.probability);
      } catch (error) {
        alert("Server error. Please try again.");
      }

      setIsLoading(false);
      setIsProcessing(false);
    };

    mediaRecorder.start();
    setEmotion(null);
    setProbabilities(null);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);     // stop pulse immediately
      setIsProcessing(true);     // show processing button
    }
  };

  const radarData = probabilities && {
    labels: [
      "neutral",
      "calm",
      "happy",
      "sad",
      "angry",
      "fearful",
      "disgust",
      "surprised",
    ],
    datasets: [
      {
        label: "Confidence",
        data: probabilities,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "#6366f1",
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        grid: {
          color: "rgba(0,0,0,0.2)"
        },
        angleLines: {
          color: "rgba(0,0,0,0.2)"
        },
        pointLabels: {
          color: "#111827"
        },
        ticks: {
          color: "#111827",
          backdropColor: "transparent"
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: "#111827"
        }
      }
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>🎤 Emotion AI</h1>
        <p className="subtitle">
          Speak naturally and let AI detect your emotion.
        </p>

        {/* Start Button */}
        {!isRecording && !isProcessing && !isLoading && (
          <button className="btn start" onClick={startRecording}>
            Start Recording
          </button>
        )}

        {/* Recording Button */}
        {isRecording && (
          <button className="btn stop pulse" onClick={stopRecording}>
            Recording...
          </button>
        )}

        {/* Processing Button */}
        {isProcessing && (
          <button className="btn stop">
            Processing...
          </button>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Analyzing emotion...</p>
          </div>
        )}

        {/* Result */}
        {emotion && !isLoading && (
          <div className="result">
            Emotion Detected:
            <span> {emotion.toUpperCase()}</span>
          </div>
        )}

        {/* Radar Chart */}
        {probabilities && !isLoading && (
          <div className="chart-box">
            <Radar data={radarData} options={radarOptions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



// import React, { useState, useRef } from "react";
// import "./App.css";

// function App() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [emotion, setEmotion] = useState(null);

//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorderRef.current = mediaRecorder;
//     chunksRef.current = [];

//     mediaRecorder.ondataavailable = (event) => {
//       chunksRef.current.push(event.data);
//     };

//     mediaRecorder.onstop = async () => {

//       const BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:5000"
//     : "https://hybrid-ser-backend.onrender.com";

//       const blob = new Blob(chunksRef.current, { type: "audio/webm" });

//       const formData = new FormData();
//       formData.append("file", blob, "recording.webm");

//       const response = await fetch(`${BASE_URL}/predict`, {   //http://localhost:5000/predict
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       setEmotion(data.emotion);
//       setIsRecording(false);
//     };

//     mediaRecorder.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//   };

//   return (
//     <div className="container">
//       <h1>🎤 Emotion Detection</h1>
//       <p style={{ opacity: 0.8, marginBottom: "25px" }}>
//         Speak naturally and let the model detect your emotional state.
//       </p>

//       {!isRecording && (
//         <button className="button start-btn" onClick={startRecording}>
//           Start Recording
//         </button>
//       )}

//       {isRecording && (
//         <button className="button stop-btn" onClick={stopRecording}>
//           Stop Recording
//         </button>
//       )}

//       {emotion && (
//         <>
//           <div className="result">
//             Emotion Detected: <strong>{emotion}</strong>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
