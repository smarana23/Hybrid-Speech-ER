export const predictEmotion = async (audioBlob) => {

  const formData = new FormData();
  formData.append("file", audioBlob, "recording.webm");

  const response = await fetch(
    "https://hybrid-ser-backend.onrender.com/predict",
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
};