import { useState, useEffect } from "react";

const RandomWindow = ({ onComplete }) => {
  const [chats, setChats] = useState(
    `So from interesting, I meant just to move this window around.`
  );

  const messages = [
    `So from interesting, I meant just to move this window around.`,  
    `But hey, even this wasn't that easy.`,  
    `I had to write a bunch of code to make this work.`,  
    `But I'm happy that it worked.`,  
    `And I hope you liked it.`,  
    `Oh, and… I've written some poems for you.`,  
    `A little sensual, a little romantic… and very special.`,  
    `I hope they make you smile.`  
  ];

  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Function to handle random window positioning within screen bounds
  const setRandomPosition = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const maxTop = Math.max(windowHeight * 0.65 - 180, 0); // Reduced height for better mobile fitting
    const maxLeft = windowWidth <= 640 
      ? Math.max(windowWidth * 0.85 - 200, 0) // Smaller width for mobile screens
      : Math.max(windowWidth * 0.85 - 450, 0); // Regular width for larger screens

    setPosition({
      top: Math.random() * maxTop,
      left: Math.random() * maxLeft,
    });
  };

  useEffect(() => {
    setRandomPosition(); // Initial positioning when the component loads
    window.addEventListener("resize", setRandomPosition); // Adjust positioning on window resize
    return () => window.removeEventListener("resize", setRandomPosition);
  }, []);

  const handleNext = () => {
    const nextIndex = (messages.indexOf(chats) + 1) % messages.length;

    if (nextIndex === 0) {
      onComplete();
    } else {
      setChats(messages[nextIndex]);
      setRandomPosition(); // Set new random position after each message
    }
  };

  return (
    <div>
      <div
        className="absolute text-[#b11a70] p-4 sm:p-6 rounded-lg shadow-lg transition-transform duration-300"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          position: "absolute",
          width: "90%", // Responsive width
          maxWidth: window.innerWidth <= 640 ? "200px" : "450px", // Smaller window for mobile
          height: "auto",
          minHeight: "150px", // Minimum height to maintain content structure
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "12px",
        }}
      >
        <p
          className="font-bold sm:text-xl md:text-3xl md:font-extrabold"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          {chats}
        </p>

        <button
          onClick={handleNext}
          className="mt-4 mx-auto px-5 py-2 backdrop-blur-none text-[#b11a70] rounded-md hover:backdrop-blur-xs hover:scale-105 transition duration-300 font-medium text-sm sm:text-base md:text-lg pulse cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RandomWindow;
