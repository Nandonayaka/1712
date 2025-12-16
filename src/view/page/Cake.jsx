"use client";
import { Pause, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BirthdayCake() {
  const [blown, setBlown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();




  const BASE = import.meta.env.BASE_URL;


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const seekAudio = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    audio.currentTime = (clickX / rect.width) * audio.duration;

    if (!playing) {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center relative overflow-hidden">
        <audio ref={audioRef} src={`${BASE}audio/01.mp3`} loop />


        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="sprinkle-fall absolute top-[-10px] w-1.5 h-3 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `fall ${2 + Math.random() * 2}s linear infinite`,
              background: randomColor(),
            }}
          />
        ))}

        <div className="flex flex-col items-center">
          <div className="relative cake-container w-[200px]">

            <div className="candle absolute left-1/2 -top-10 w-5 h-10 bg-white rounded-sm shadow-inner transform -translate-x-1/2">
              {!blown ? (
                <div className="flame absolute -top-5 w-4 h-5 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 animate-flame left-1/2 -translate-x-1/2" />
              ) : (
                <div className="smoke absolute -top-3 w-1.5 h-1.5 bg-gray-400 rounded-full animate-smoke left-1/2 -translate-x-1/2" />
              )}
            </div>

            <div className="cake relative w-full h-[140px]">
              <div className="layer h-[35px] rounded-md mb-1" style={{ background: "#ffb3c6" }} />
              <div className="layer h-[35px] rounded-md mb-1" style={{ background: "#ff8fab" }} />
              <div className="layer h-[35px] rounded-md" style={{ background: "#f15bb5" }} />
            </div>
          </div>

          {/* FIX: Modal trigger langsung dari sini */}
          <button
            onClick={() => {
              if (!blown) setBlown(true);   // lilin mati sekali
              setShowModal(true);           // modal muncul tiap klik
            }}
            className="mt-6 px-6 py-3 mb-10 bg-pink-500 text-white font-semibold rounded-xl active:scale-95 shadow"
          >
            Blow Candle 🎂
          </button>
        </div>

        <style jsx>{`
          @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(120vh) rotate(360deg); }
          }
          @keyframes flame {
            0% { transform: scale(1) opacity: 0.9; }
            100% { transform: scale(1.2) opacity: 1; }
          }
          @keyframes smoke {
            0% { opacity: 0.8; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-40px) scale(2); }
          }
          .animate-flame { animation: flame 0.12s infinite alternate; }
          .animate-smoke { animation: smoke 1.6s ease-out infinite; }
        `}</style>
      </div>

      {/* AUDIO PLAYER */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-80 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition ${
              playing ? "bg-pink-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {playing ? <Pause /> : <Play />}
          </button>

          <div
            className="flex-1 ml-4 h-2 bg-pink-100 rounded cursor-pointer"
            onClick={seekAudio}
          >
            <div
              className="h-2 bg-pink-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">

          <div className="bg-white w-80 rounded-2xl shadow-xl p-6 text-center">

            <h2 className="text-xl font-bold mb-4">Happy Birthday! 🎉</h2>
            <p className="text-gray-700 mb-6">
              Lilinnya sudah ditiup. Mau lanjut ke halaman berikutnya?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 bg-gray-200 rounded-lg font-semibold"
              >
                Tunggu Dulu
              </button>

              <button
                onClick={() => navigate("/menu")}
                className="w-full py-2 bg-pink-500 text-white rounded-lg font-semibold"
              >
                Lanjut
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

function randomColor() {
  const colors = ["#ff577f", "#ff884b", "#ffd384", "#9adcff", "#e09eff"];
  return colors[Math.floor(Math.random() * colors.length)];
}
