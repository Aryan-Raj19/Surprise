import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { motion, AnimatePresence } from "framer-motion";

const playlist = [
  { title: "Desi Girl", artist: "Sunidhi Chauhan, Shekhar, Shankar, Vishal", src: "/src/assets/songs/Desigirl.mpeg" },
  { title: "Finding Her", artist: "Kushagra, Bharat Srinivasan, Saaheal", src: "/src/assets/songs/Findingher.mpeg" },
  { title: "Kl Chaudhavi Ka Chand", artist: "Jagjit Singh", src: "/src/assets/songs/Klchaudavikachand.mpeg" },
  { title: "O Re Piya", artist: "Rahat Fateh Ali Khan", src: "/src/assets/songs/Orepiya.mpeg" },
  { title: "Preety Woman", artist: "Ravi Khote, Shankar", src: "/src/assets/songs/PreetyWoman.mpeg" },
  { title: "Sahiba", artist: "Jasleen, Stebin Ben, Priya Saraiya, Aditya Sharma", src: "/src/assets/songs/sahiba.mpeg" },
  { title: "Saiyaan", artist: "Kailash Kher", src: "/src/assets/songs/Saiyaan.mpeg" },
  { title: "Sanu Pyar Wali", artist: "Noor Jehan", src: "/src/assets/songs/Sanupyarwali.mpeg" },
  { title: "Voh Dekhne Me", artist: "Ali Zafar", src: "/src/assets/songs/W0dekhneme.mpeg" },
  { title: "Tere Naina", artist: "Shafqat Amanat Ali", src: "/src/assets/songs/Terenaina.mpeg" },
  // Add more songs here
];

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [direction, setDirection] = useState(1);

  const howlRef = useRef(null);
  const seekIntervalRef = useRef(null);

  const loadSong = (index, autoplay = false) => {
    if (howlRef.current) {
      howlRef.current.stop();
      howlRef.current.unload();
    }
    clearInterval(seekIntervalRef.current);
    setSeek(0);
    setDuration(0);

    const sound = new Howl({
      src: [playlist[index].src],
      volume,
      html5: true,
      onload: () => setDuration(sound.duration()),
      onend: () => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % playlist.length;
          setDirection(1);
          loadSong(next, true);
          return next;
        });
      },
      onplay: () => {
        setIsPlaying(true);
        seekIntervalRef.current = setInterval(() => {
          setSeek(sound.seek() || 0);
        }, 500);
      },
      onpause: () => {
        setIsPlaying(false);
        clearInterval(seekIntervalRef.current);
      },
      onstop: () => {
        setIsPlaying(false);
        clearInterval(seekIntervalRef.current);
      },
    });

    howlRef.current = sound;
    if (autoplay) sound.play();
  };

  useEffect(() => {
    loadSong(currentIndex);
    return () => {
      howlRef.current?.stop();
      howlRef.current?.unload();
      clearInterval(seekIntervalRef.current);
    };
  }, []);

  const handlePlayPause = () => {
    if (!howlRef.current) return;
    isPlaying ? howlRef.current.pause() : howlRef.current.play();
  };

  const handleNext = () => {
    setDirection(1);
    const next = (currentIndex + 1) % playlist.length;
    setCurrentIndex(next);
    loadSong(next, isPlaying);
  };

  const handlePrev = () => {
    if (howlRef.current && howlRef.current.seek() > 3) {
      howlRef.current.seek(0);
      setSeek(0);
      return;
    }
    setDirection(-1);
    const prev = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prev);
    loadSong(prev, isPlaying);
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    setSeek(val);
    howlRef.current?.seek(val);
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    howlRef.current?.volume(val);
  };

  const handleSelectSong = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    loadSong(index, true);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const song = playlist[currentIndex];
  const progress = duration > 0 ? (seek / duration) * 100 : 0;

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-10 min-h-screen">

      {/* Page heading */}
      <p
        className="text-[#b11a70] text-2xl md:text-3xl font-bold text-center"
        style={{ fontFamily: "Shadows Into Light, cursive" }}
      >
        HER FAVORITE SONGS 🎵
      </p>

      {/* ── Player Card ── */}
      <div className="w-full max-w-sm flex flex-col items-center gap-5 px-6 py-8 rounded-3xl border border-[#b11a70]/20 shadow-[0_0_24px_rgba(177,26,112,0.15)] backdrop-blur-md">

        {/* Album art */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -40, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="w-36 h-36 rounded-full flex items-center justify-center text-5xl border-4 border-[#b11a70]/30 shadow-[0_0_20px_rgba(177,26,112,0.25)]"
            style={{
              background: "linear-gradient(135deg, #ffcdea, #ed66b2)",
              animation: isPlaying ? "albumSpin 8s linear infinite" : "none",
            }}
          >
            🎵
          </motion.div>
        </AnimatePresence>

        {/* Song info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + "info"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p
              className="text-[#b11a70] text-xl font-bold"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              {song.title}
            </p>
            <p
              className="text-[#b11a70]/60 text-sm mt-0.5"
              style={{ fontFamily: "Dosis, sans-serif" }}
            >
              {song.artist}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar visual */}
        <div className="w-full flex flex-col gap-1.5">
          <div className="relative w-full h-1.5 rounded-full bg-[#b11a70]/15">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, #ed66b2, #b11a70)",
              }}
            />
          </div>
          {/* Seek input layered over the bar */}
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.5}
            value={seek}
            onChange={handleSeek}
            className="w-full cursor-pointer accent-[#b11a70] h-1.5 -mt-3 opacity-0 relative z-10"
          />
          <div
            className="flex justify-between text-[#b11a70]/60 text-xs -mt-1"
            style={{ fontFamily: "Dosis, sans-serif" }}
          >
            <span>{formatTime(seek)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-7">
          <button
            onClick={handlePrev}
            className="text-2xl text-[#b11a70] hover:scale-125 active:scale-95 transition-transform duration-150 cursor-pointer"
          >
            ⏮
          </button>

          <button
            onClick={handlePlayPause}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-[0_0_16px_rgba(177,26,112,0.4)] hover:shadow-[0_0_24px_rgba(177,26,112,0.6)] hover:scale-110 active:scale-95 transition-all duration-150 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #ed66b2, #b11a70)" }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            onClick={handleNext}
            className="text-2xl text-[#b11a70] hover:scale-125 active:scale-95 transition-transform duration-150 cursor-pointer"
          >
            ⏭
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-sm">🔈</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="flex-1 cursor-pointer accent-[#b11a70]"
          />
          <span className="text-sm">🔊</span>
        </div>
      </div>

      {/* ── Playlist ── */}
      <div className="w-full max-w-sm rounded-2xl border border-[#b11a70]/20 shadow-[0_0_16px_rgba(177,26,112,0.1)] backdrop-blur-md overflow-hidden mb-10">
        <p
          className="text-[#b11a70] text-lg font-bold text-center py-3 border-b border-[#b11a70]/15 tracking-wide"
          style={{ fontFamily: "Shadows Into Light, cursive" }}
        >
          Playlist
        </p>

        <div className="flex flex-col divide-y divide-[#b11a70]/10">
          {playlist.map((track, index) => (
            <motion.div
              key={index}
              onClick={() => handleSelectSong(index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 ${
                index === currentIndex
                  ? "bg-[#b11a70]/10"
                  : "hover:bg-[#b11a70]/5"
              }`}
            >
              <span
                className="text-xs text-[#b11a70]/40 min-w-4.5 text-center"
                style={{ fontFamily: "Dosis, sans-serif" }}
              >
                {index + 1}
              </span>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold truncate ${
                    index === currentIndex ? "text-[#b11a70]" : "text-[#b11a70]/75"
                  }`}
                  style={{ fontFamily: "Dosis, sans-serif" }}
                >
                  {track.title}
                </p>
                <p
                  className="text-xs text-[#b11a70]/50 truncate"
                  style={{ fontFamily: "Dosis, sans-serif" }}
                >
                  {track.artist}
                </p>
              </div>

              {index === currentIndex && (
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-xs text-[#b11a70]"
                >
                  {isPlaying ? "▶" : "⏸"}
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Album spin keyframe — only one small @keyframes needed, not worth a CSS file */}
      <style>{`
        @keyframes albumSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;