import { useState } from "react";
import { motion } from "framer-motion";
import "../Style/SurpriseMessage.css";

const messages = [
  "You make my heart race every time I think about you.",
  "I wish I could hold you forever.",
  "Every moment with you feels like magic.",
  "You're the reason behind my smile.",
  "I can't stop thinking about you.",
  "You make my world feel complete.",
];

const fixedPositions = [
  { x: "53vw", y: "5vh" },
  { x: "14vw", y: "45vh" },
  { x: "30vw", y: "65vh" },
  { x: "4vw", y: "5vh" },
  { x: "45vw", y: "45vh" },
  { x: "30vw", y: "25vh" },
];

const SurpriseMessage = ({ onComplete }) => {
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const allShown = currentMessageIndex >= messages.length;

  const handleNextMessage = () => {
    if (currentMessageIndex < messages.length) {
      setDisplayedMessages((prev) => [
        ...prev,
        {
          text: messages[currentMessageIndex],
          position: fixedPositions[currentMessageIndex],
        },
      ]);
      setCurrentMessageIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-[88vw] h-[99vh] rounded-xl overflow-hidden">
      {displayedMessages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: msg.position.x,
            y: msg.position.y,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute p-4 rounded-lg text-[.8rem] md:text-2xl sm:text-2xl text-[#b11a70] glow h-[10vh] w-[35vw] md:h-[15vh] md:w-[20vw] sm:h-[12vh] sm:w-[17vw]"
          style={{
            fontFamily: "Pacifico, cursive",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {msg.text}
        </motion.div>
      ))}

      {!allShown && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: fixedPositions[currentMessageIndex].x,
            y: fixedPositions[currentMessageIndex].y,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute p-4 rounded-lg shadow-md text-[.8rem] md:text-2xl sm:text-2xl backdrop-blur-xs text-[#b11a70] w-[35vw] md:h-[25vh] md:w-[20vw] sm:h-[17vh] sm:w-[17vw]"
          style={{
            fontFamily: "Pacifico, cursive",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{messages[currentMessageIndex]}</p>
          <motion.button
            onClick={handleNextMessage}
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="backdrop-blur-none text-[#b11a70] px-4 md:px-6 mt-7 py-1 md:py-3 rounded-lg font-bold text-base md:text-lg shadow-[0_0_12px_#b11a70] hover:backdrop-blur-xs transition duration-300 cursor-pointer hover:shadow-[0_0_15px_#b11a70] pulse"
            style={{
              fontSize: "clamp(0.8rem, 1vw, 1rem)",
              padding: "clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)",
              fontFamily: "Dosis, sans-serif",
            }}
          >
            Next Message
          </motion.button>
        </motion.div>
      )}

      {/* Continue section — anchored to bottom, well below all scattered messages */}
      {allShown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col h-full justify-end items-center gap-5 z-50"
        >
          <p
            className="text-[#b11a70] text-lg md:text-2xl font-bold text-center drop-shadow-md"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            And there's one more thing for you... 🎵
          </p>
          <motion.button
            onClick={onComplete}
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="backdrop-blur-none text-[#b11a70] px-6 py-3 rounded-lg font-bold text-lg shadow-[0_0_12px_#b11a70] hover:backdrop-blur-xs transition duration-300 cursor-pointer hover:shadow-[0_0_15px_#b11a70] pulse"
            style={{ fontFamily: "Dosis, sans-serif" }}
          >
            Some Of Your Favorite Songs 🎵
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default SurpriseMessage;
