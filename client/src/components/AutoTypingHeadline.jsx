import React, { useEffect, useState } from "react";

const AutoTypingHeadline = () => {
  const texts = [
    "Welcome to Spark Build Estimate Project Estimate Your Dream Construction Budget",
   
    "Fast • Accurate • Smart Calculations",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100); // typing speed

  useEffect(() => {
    const currentText = texts[textIndex];
    const updateText = () => {
      if (!isDeleting) {
        // Typing
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        setSpeed(100);
        if (displayedText === currentText) {
          setTimeout(() => setIsDeleting(true), 1500); // pause before deleting
        }
      } else {
        // Deleting
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        setSpeed(50);
        if (displayedText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length); // loop to next text
        }
      }
    };

    const timer = setTimeout(updateText, speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex]);

  return (
    <h1 className=" font-bold text-center mt-16 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500">
      {displayedText}
      <span className="border-r-4 border-blue-500 animate-pulse ml-1"></span>
    </h1>
  );
};

export default AutoTypingHeadline;
