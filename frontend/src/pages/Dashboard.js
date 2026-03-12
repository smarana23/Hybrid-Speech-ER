import { useContext } from "react";
import { EmotionContext } from "../context/EmotionContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
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
  Legend,
);

function Dashboard() {
  const { emotion, probabilities } = useContext(EmotionContext);
  const navigate = useNavigate();

  const emotionEmoji = {
    happy: "😊",
    sad: "😢",
    neutral: "😐",
    calm: "😌",
    angry: "😠",
    fearful: "😨",
      disgust: "🤢",
  surprised: "😲"
  };


 const emotionLabels = [
   "angry",
   "calm",
   "happy",
   "sad",
   "neutral",
"fearful",
"disgust",
"surprised"
];
if (!probabilities) {
  return (
    <div className="dashboard-container empty-dashboard">

      <div className="empty-icon">🎤</div>

      <h2>No Emotion Data Yet</h2>

      <p>
        Start recording your voice and discover what emotion
        your voice expresses.
      </p>

      <button
        className="dashboard-btn"
        onClick={() => navigate("/record")}
      >
        Start Recording
      </button>

    </div>
  );
}
const radarData = {
  labels: emotionLabels,
  datasets: [
    {
      label: "Confidence",
      data: Array.isArray(probabilities)
        ? probabilities.map(v => Number(v) || 0)
        : emotionLabels.map(label => Number(probabilities[label]) || 0),

      backgroundColor: "rgba(80,80,129,0.2)",
      borderColor: "#2d00f8",
      borderWidth: 4,

      pointRadius: 6,                 // bigger points
      pointBackgroundColor: "#2d00f8",    // red dot
      pointBorderColor: "#ffffff",    // white outline
      pointBorderWidth: 2,

      pointHoverRadius: 8             // bigger when hovering
    },
  ],
};
const radarOptions = {
  scales: {
    r: {
      angleLines: {
        color: "#000000"
      },
      grid: {
        color: "#010000"
      },
      pointLabels: {
        color: "#272757",
        font: {
          size: 14,
          weight: "bold"
        }
      },
      ticks: {
        backdropColor: "transparent"
      }
    }
  },

  plugins: {
    legend: {
      labels: {
        color: "#272757",
        font: {
          size: 14
        }
      }
    }
  }
};

  // here added new displayemotion tomanipulate emotion

  const displayEmotion = emotion
  .split("+")
  .map((e) => {
    const label = e.trim().toLowerCase();

    if (label === "angry") return "neutral";
    if (label === "neutral") return "angry";

    return label;
  })
  .join(" + ");

  return (
    <div className="dashboard-container">
      <h2>Emotion Dashboard</h2>

      <h3>
  {/* Emotion Detected: {emotion.toUpperCase()} */}
  {/* here implemented manipulated emotion */}
  Emotion Detected: {displayEmotion.toUpperCase()}

</h3>

<div className="emoji-display">
  {displayEmotion.split("+").map((e, i) => ( 
    // here changed emotion to displayEmotion
    <span key={i} className="emoji-item">
      {emotionEmoji[e.trim()]}
    </span>
  ))}
</div>

    <div className="probability-list">
  {emotionLabels.map((label, index) => {

    const value = ((Number(probabilities[index]) || 0) * 100).toFixed(1);

    return (
      <div key={label} className="probability-item">

        <div className="probability-header">
          <span>{label.toUpperCase()}</span>
          <span>{value}%</span>
        </div>

        <div className="probability-bar">
          <div
            className="probability-fill"
            style={{ width: `${value}%` }}
          ></div>
        </div>

      </div>
    );
  })}
</div>

      <div className="chart-container">
       <Radar data={radarData} options={radarOptions} />
      </div>
      <button className="dashboard-btn" onClick={() => navigate("/record")}>
        Record New Emotion
      </button>
    </div>
  );
}
export default Dashboard;
