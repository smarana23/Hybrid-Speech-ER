import { createContext, useState } from "react";

export const EmotionContext = createContext();

export const EmotionProvider = ({ children }) => {

  const [emotion, setEmotion] = useState(null);
  const [probabilities, setProbabilities] = useState(null);

  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  return (
    <EmotionContext.Provider
      value={{
        emotion,
        setEmotion,
        probabilities,
        setProbabilities,
        audioURL,
        setAudioURL,
        audioBlob,
        setAudioBlob
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};