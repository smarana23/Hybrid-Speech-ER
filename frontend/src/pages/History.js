import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmotionContext } from "../context/EmotionContext";
import "./History.css";
function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("emotion_history")) || [];
    setHistory(stored);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("emotion_history");
    setHistory([]);
  };

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
  const navigate = useNavigate();

  const { setEmotion, setProbabilities, setAudioURL } =
    useContext(EmotionContext);
  const viewDashboard = (item) => {
    setEmotion(item.emotion);

    setProbabilities(item.probabilities);

    setAudioURL(item.audio);

    navigate("/dashboard");
  };
  return (
    <div className="history-container">
     <div className="history-header">
        <h2>Emotion History</h2>

        <button className="clear-btn" onClick={clearHistory}>Clear All</button>
      </div>

     <div className="history-table-header">
        <span>Recording</span>
        <span>Timestamp</span>
        <span>Emotion</span>
        <span>View Dashboard</span>
      </div>
      <div className="history-list">

      {history.map((item, index) => (
      <div key={index} className="history-row">
          <audio controls src={item.audio}></audio>
          <span>{item.timestamp}</span>
          <span className="history-emotion">
         
  {(() => {
  const displayEmotion = item.emotion
    .split("+")
    .map((e) => {
      const label = e.trim().toLowerCase();

      if (label === "angry") return "neutral";
      if (label === "neutral") return "angry";

      return label;
    })
    .join(" + ");

  return (
    <>
      {displayEmotion.split("+").map((e, i) => (
        <span key={i}>
          {emotionEmoji[e.trim()]}
        </span>
      ))}
      {displayEmotion}
    </>
  );
})()}
</span>
          

          <button className="history-btn" onClick={() => viewDashboard(item)}>View Dashboard</button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default History;
