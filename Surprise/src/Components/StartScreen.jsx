import React from "react";
import "../Style/StartScreen.css";
import "../index.css";

const StartScreen = ({ onStart }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 transition duration-1000">
      {/* Title */}
      <div
        className="absolute top-24 md:top-32 text-center z-60 text-[#b11a70] font-bold text-4xl md:text-6xl animate-birthdayText p-2 md:p-4"
        style={{ fontFamily: "Shadows Into Light, cursive" }}
      >
        <p>A SMALL TRY TO MAKE YOU HAPPY</p>
        <p>MY LOVE ❤️</p>
      </div>

      {/* Start Button */}
      <div className="fixed inset-0 flex justify-center items-center bg-opacity-70 z-50">
        <button
          onClick={onStart}
          className="backdrop-blur-none text-[#b11a70] px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-base md:text-lg shadow-lg hover:backdrop-blur-xs transition duration-300 cursor-pointer hover:shadow-[0_0_12px_#b11a70] pulse"
        >
          Chal Ab Jldi Click Kr
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
