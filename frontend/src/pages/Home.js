import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="home-container">

      <h1 className="main-title">
        A Hybrid Neural Network Model for Efficient Emotion Classification Using Speech Signals
      </h1>

      <p className="tagline">
        Understanding human emotions through voice intelligence.
      </p>


      {/* INTRO CARD */}
      <div className="intro-card">

        <div className="intro-image">
          <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="AI Emotion Robot"/>
        </div>

        <div className="intro-text">
          <p>
          Hybrid Speech Emotion Recognition is an AI-powered system designed to understand human emotions through voice signals.
          The system analyzes speech patterns, tone, and acoustic features to identify emotional states such as happiness,
          sadness, anger, fear, and neutrality.

          By combining machine learning techniques with audio signal processing, the model can interpret human emotions in real time.
          This technology can be used in areas such as virtual assistants, mental health monitoring,
          human-computer interaction, and intelligent customer support systems.
          </p>
        </div>

      </div>


      {/* BUTTON */}
      <button
        className="start-btn"
        onClick={() => navigate("/record")}
      >
        Get Started
      </button>



      {/* FEATURES */}

      <div className="features">

        <h2>Features</h2>

        <div className="feature-container">

          <div className="feature-card">
            <h3>Real-Time Detection</h3>
            <p>Analyze speech instantly and detect emotional states from voice signals.</p>
          </div>

          <div className="feature-card">
            <h3>AI-Powered Model</h3>
            <p>Uses hybrid neural network techniques to classify emotions accurately.</p>
          </div>

          <div className="feature-card">
            <h3>Emotion Dashboard</h3>
            <p>Visualize detected emotions using charts and analytics.</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;

// #6A89A7
// #BDDDFC
// #88BDF2
// #384959

// #272757
// #8686AC
// #505081
// #0F0E47