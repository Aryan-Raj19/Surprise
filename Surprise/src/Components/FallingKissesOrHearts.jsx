import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_ITEMS = 30; // cap so DOM never bloats

const FallingStarsOrHearts = ({ showHearts }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newItem = {
          id: Date.now() + Math.random(), // more unique than Math.random() alone
          left: Math.random() * 90,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 2 + 2,
        };
        // keep only last MAX_ITEMS to avoid unbounded growth
        const updated = [...prev, newItem];
        return updated.length > MAX_ITEMS ? updated.slice(-MAX_ITEMS) : updated;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // remove item from state once its animation completes
  const handleAnimationComplete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AnimatePresence>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: "100vh", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: item.duration, ease: "easeInOut" }}
          onAnimationComplete={() => handleAnimationComplete(item.id)}
          style={{
            position: "fixed", // fixed instead of absolute so it's always viewport-relative
            left: `${item.left}%`,
            top: 0,
            fontSize: `${item.size}px`,
            zIndex: 10,
            pointerEvents: "none", // so falling items don't block clicks
          }}
        >
          {showHearts ? "❤️" : "💋"}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default FallingStarsOrHearts;