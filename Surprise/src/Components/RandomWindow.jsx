import { useState, useEffect } from "react";

const RandomWindow = ({ onComplete }) => {
  const [chats, setChats] = useState("Isko thora udate h");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [maxWidth, setMaxWidth] = useState("450px"); // moved out of inline style

  const messages = [
    `Isko thora udate h`,
    `Are ye to already udane lga`,
    `Idher baby, idher hu main, idher click kr`,
    `You might be thinking ki ye kya hai`,
    `Bus chat window ko ider udher kr rha h`,
    `But baby ye easy nhi tha, bahut dimag lagana pda`,
    `Or dheer sara code likhna pda iske liye`,
    `But I'm happy ki mehnat kaam kr gyi and it's working!`,
    `And I hope you liked it.`,
    `Oh, and… I've written some poems for you.`,
    `A little sensual, a little romantic… and very special.`,
    `I hope they make you smile.`,
  ];

  const setRandomPosition = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth <= 640;

    setMaxWidth(isMobile ? "200px" : "450px"); // update reactively

    const maxTop = Math.max(windowHeight * 0.65 - 180, 0);
    const maxLeft = isMobile
      ? Math.max(windowWidth * 0.85 - 200, 0)
      : Math.max(windowWidth * 0.85 - 450, 0);

    setPosition({
      top: Math.random() * maxTop,
      left: Math.random() * maxLeft,
    });
  };

  useEffect(() => {
    setRandomPosition();
    window.addEventListener("resize", setRandomPosition);
    return () => window.removeEventListener("resize", setRandomPosition);
  }, []);

  const handleNext = () => {
    const nextIndex = (messages.indexOf(chats) + 1) % messages.length;
    if (nextIndex === 0) {
      onComplete();
    } else {
      setChats(messages[nextIndex]);
      setRandomPosition();
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
          width: "90%",
          maxWidth, // clean — no window access at render time
          height: "auto",
          minHeight: "150px",
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
