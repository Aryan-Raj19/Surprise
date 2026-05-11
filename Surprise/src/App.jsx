import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence added
import { Volume2, VolumeX } from "lucide-react";
import "./App.css";

const IntroCard = lazy(() => import("./Components/IntroCard"));
const Poems = lazy(() => import("./Components/Poems"));
const Outro = lazy(() => import("./Components/Outro"));
const StartScreen = lazy(() => import("./Components/StartScreen"));
const RandomWindow = lazy(() => import("./Components/RandomWindow"));
const SurpriseMessage = lazy(() => import("./Components/SurpriseMessage"));

function App() {
  const [phase, setPhase] = useState("start");
  const [isMuted, setIsMuted] = useState(false);
  const bgMusic = useRef(new Audio("/videoplayback.m4a"));

  useEffect(() => {
    if (bgMusic.current) {
      bgMusic.current.loop = true;
      bgMusic.current.volume = 0.5;
      bgMusic.current.muted = isMuted;
    }
  }, [isMuted]);

  const fadeVolume = (targetVolume, duration) => {
    if (!bgMusic.current) return;
    const steps = 10;
    const stepTime = duration / steps;
    const diff = targetVolume - bgMusic.current.volume;
    let step = 0;
    const interval = setInterval(() => {
      if (!bgMusic.current) { clearInterval(interval); return; }
      step++;
      bgMusic.current.volume += diff / steps;
      if (step >= steps) clearInterval(interval);
    }, stepTime);
  };

  const handleStart = () => {
    if (!bgMusic.current) {
      bgMusic.current = new Audio("/videoplayback.m4a");
      bgMusic.current.loop = true;
      bgMusic.current.volume = 0;
      bgMusic.current.muted = isMuted;
    }
    fadeVolume(0.5, 1000);
    bgMusic.current
      .play()
      .then(() => setPhase("intro"))
      .catch((e) => console.log("Autoplay blocked:", e));
  };

  const handleToggleMute = () => {
    bgMusic.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleIntroComplete = () => setPhase("random");
  const handleRandomWindowComplete = () => setPhase("poems");
  const handlePoemComplete = () => setPhase("outro");
  const handleOutroComplete = () => setPhase("messages");

  return (
    <>
      {phase !== "start" && (
        <button
          onClick={handleToggleMute}
          className="fixed top-4 right-4 z-50 backdrop-blur-none text-[#b11a70] md:px-6 mt-7 py-1 md:py-3 rounded-full font-bold text-base md:text-lg shadow-lg hover:backdrop-blur-xs cursor-pointer hover:shadow-[0_0_12px_#b11a70] active:scale-90"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      {/* AnimatePresence needed here for exit animations to actually fire */}
      <Suspense>
        <AnimatePresence mode="wait">
          {phase === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StartScreen onStart={handleStart} />
            </motion.div>
          )}

          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              exit={{ x: "100vw" }}
              transition={{ duration: 0.5 }}
            >
              <IntroCard onComplete={handleIntroComplete} />
            </motion.div>
          )}

          {phase === "random" && (
            <motion.div
              key="random"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RandomWindow onComplete={handleRandomWindowComplete} />
            </motion.div>
          )}

          {phase === "poems" && (
            <motion.div
              key="poems"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Poems onComplete={handlePoemComplete} />
            </motion.div>
          )}

          {phase === "outro" && (
            <motion.div
              key="outro"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Outro onComplete={handleOutroComplete} />
            </motion.div>
          )}

          {phase === "messages" && (
            <motion.div
              key="messages"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <SurpriseMessage />
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default App;