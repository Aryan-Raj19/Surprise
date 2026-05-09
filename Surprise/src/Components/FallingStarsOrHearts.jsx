import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FallingStarsOrHearts = ({ showHearts }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) => [
        ...prevItems,
        {
          id: Math.random(),
          left: Math.random() * 90,
          size: Math.random() * 20 + 10,
        },
      ]);
    }, 200); // Frequency of hearts/stars falling

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: "100vh", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            zIndex: 10,
            color: showHearts ? "#e91e63" : "#ffeb3b", // ❤️ for hearts, ⭐ for stars
          }}
        >
          {showHearts ? "❤️" : "⭐"}
        </motion.div>
      ))}
    </>
  );
};

export default FallingStarsOrHearts;
