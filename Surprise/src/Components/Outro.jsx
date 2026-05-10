import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FallingStarsOrHearts from "./FallingStarsOrHearts";

function Outro({ onComplete }) {
  const [chats, setChats] = useState(`I don't know if I'm a good poet or not.`);

  const messages = [
    "I don't know if I'm a good poet or not.",
    "But I know I'm a good lover.",
    "And beyond these poems,",
    "I want to say something from my heart.",
    "I've told you why I love you, when I fell in love with you,",
    "How much you mean to me, and how much I want you.",
    "It's true that I can't stop thinking about you",
    "No matter what I'm doing, no matter where I am,",
    "It's always you in my mind, and I don't want it to be any different.",
    "I love it, I love it that how much you occupy my thoughts, and how much I care about you.",
    "I know that you're going through a lot right now", 
    "And I wish I could do something to make it easier for you.",
    "Or at least, I wish I could be there for you in person, to hold you and comfort you.",
    "But since I can't, I just want you to know that I'm here for you in every way I can be.",
    "I want to be your support, your strength, your happiness, and your everything.",
    "I want to be the one who makes you smile when you're sad,",
    "The one who listens to you when you need to talk,",
    "The one who loves you unconditionally, no matter what.",
    "My Love, My Life, My Baby, My Cutie, My Sona, My Malkin",
    "You are the most precious thing in my life", 
    "And I will always cherish you and love you with all my heart.",
    "I hope these poems and messages made you feel a little bit of the love and affection I have for you.",
    "I guess that's a lot of talking…",
    "If I keep going like this,",
    "The slides will never end.",
    "With that said, it's time to say goodbye...",
    "I hope you liked it.",
    "And I hope I didn't make you cry.",
    "Once again,",
    "I Love You, Meri Ragini 😘❤️",
    "Wait… there's one more thing…",
  ];

  const [showHearts, setShowHearts] = useState(true);

  const handleNextMessage = () => {
    const nextIndex = messages.indexOf(chats) + 1;
    if (nextIndex < messages.length) {
      setChats(messages[nextIndex]);
    } else {
      onComplete();
    }
  };

  return (
    <>
      <FallingStarsOrHearts showHearts={showHearts} />

      <div className="relative flex justify-center items-center h-170 overflow-hidden">
        <div className="container backdrop-blur-xs py-12 px-4 m-4 max-w-2xl mx-auto rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={chats}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`text-[#b11a70] text-3xl mb-10 font-bold text-center`}
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              {chats}
            </motion.p>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleNextMessage}
              className="backdrop-blur-none text-[#b11a70] px-4 mx-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-base md:text-lg shadow-lg hover:backdrop-blur-xs transition duration-300 cursor-pointer hover:shadow-[0_0_12px_#b11a70] pulse"
            >
              Next Message
            </button>

            <button
              onClick={() => setShowHearts(!showHearts)}
              className="backdrop-blur-none text-[#b11a70] px-4 mx-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-base md:text-lg shadow-lg hover:backdrop-blur-xs transition duration-300 cursor-pointer hover:shadow-[0_0_12px_#b11a70] pulse"
            >
              {showHearts ? "Switch to Kisses" : "Switch to Hearts"}
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-screen h-12 bg-linear-to-br from-[#ed66b2] to-[#ffcdea] z-10"></div>
    </>
  );
}

export default Outro;
