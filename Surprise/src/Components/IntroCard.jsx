import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import Confetti from "react-confetti";

function IntroCard({ onComplete }) {
  const [chats, setChats] = useState("Aww... Meri motu... meri cutu baby");
  const [showConfetti, setShowConfetti] = useState(false);
  const [key, setKey] = useState(0); // forces Typewriter to re-mount on message change

  const messages = [
    "Aww... Meri motu... meri cutu baby",
    "My Love",
    "Meri Malkin",
    "Meri Ragini",
    "Meri Sona",
    "Let's come to the topic.",
    "And the topic is to make you happy",
    "Or try to make my baby feel a little special.",
    "Kasam se I thought a lot about what to do or how to do it",
    "And then maine socha ki kyu na apni bebu ke liye ke pyara sa site banau",
    "Phir Usme apni bebu ke liye sb kuch add kr du",
    "Jo bhi mujhe bolna h ya krna h sb ek jagha",
    "But I don't know ki tujhe ye sb pasand ayega ya nhi",
    "I'm just trying my best 😘❤️💋",
    "I mean kuch nhi to ek or nakam koshish",
    "Okay let's take an easy start",
    "Ye boring sa next next pe click krna band krte h"
  ];

  const handleNextMessage = () => {
    const currentIndex = messages.indexOf(chats);
    const nextIndex = (currentIndex + 1) % messages.length;

    if (messages[nextIndex] === `That means it's your birthday!`) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 17000);
    }

    if (nextIndex === 0) {
      onComplete();
    } else {
      setChats(messages[nextIndex]);
      setKey((prev) => prev + 1); // re-mount Typewriter for new message
    }
  };

  return (
    <div className="flex justify-center items-center h-100 px-4">
      {showConfetti && <Confetti />}
      <div className="flex flex-col justify-center gap-6 p-6 md:p-8 max-w-2xl w-full rounded-2xl shadow-lg drop-shadow-[0_0_7px_#ffcdea]">
        <AnimatePresence mode="wait">
          <motion.div
            key={chats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-[#b11a70] flex justify-center items-center text-xl sm:text-2xl md:text-3xl font-bold text-center leading-relaxed"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            <Typewriter
              key={key}
              options={{
                strings: [chats],
                autoStart: true,
                loop: false,
                delay: 40,
                deleteSpeed: Infinity, // prevents auto-deletion
                cursor: "|",
              }}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNextMessage}
          className="mt-4 mx-auto px-5 py-2 backdrop-blur-none text-[#b11a70] rounded-md hover:backdrop-blur-xs hover:scale-105 shadow-[0_0_12px_#b11a70] transition duration-300 font-medium text-sm sm:text-base md:text-lg pulse cursor-pointer"
        >
          Next Message
        </button>
      </div>
    </div>
  );
}

export default IntroCard;
