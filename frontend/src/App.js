// --------- Frontend ui ------------

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecordEmotion from "./pages/RecordEmotion";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

import { EmotionProvider } from "./context/EmotionContext";

function App() {
  return (
    <EmotionProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<RecordEmotion />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />

        </Routes>
      </BrowserRouter>
    </EmotionProvider>
  );
}

export default App;
