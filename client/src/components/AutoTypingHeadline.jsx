import React, { useEffect, useState } from "react";
import axios from "axios";

const AutoTypingHeadline = () => {
  const [texts, setTexts] = useState([]);        // dynamic texts
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  const token = localStorage.getItem("token");   // if token is stored

  // Fetch headline data from API
const fetchHeadline = async () => {
  try {
    const response = await axios.get(
      "https://estimate-project.dentalguru.software/api/headline",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Convert API response objects into array of strings
    const headlines = response.data.map(item => item.hl_text);

    setTexts(headlines);
    
  } catch (error) {
    console.error("Error fetching headline:", error);
  }
};


  useEffect(() => {
    fetchHeadline();
  }, []);

  // Typing animation (runs only when texts are loaded)
  useEffect(() => {
    if (texts.length === 0) return; // Wait for API

    const currentText = texts[textIndex];

    const updateText = () => {
      if (!isDeleting) {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        setSpeed(100);

        if (displayedText === currentText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        setSpeed(50);

        if (displayedText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(updateText, speed);
    return () => clearTimeout(timer);

  }, [displayedText, isDeleting, textIndex, texts]);

  return (
    <h1 className="font-bold text-center mt-16 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500">
      {displayedText}
      <span className="border-r-4 border-blue-500 animate-pulse ml-1"></span>
    </h1>
  );
};

export default AutoTypingHeadline;
