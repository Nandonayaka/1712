"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MemeInteraction() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [phase, setPhase] = useState("camera"); 
  const [answer, setAnswer] = useState(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png");
    setPhoto(data);

    video.srcObject.getTracks().forEach((t) => t.stop());

    setPhase("show-photo");

    setTimeout(() => setPhase("meme"), 1200);
  };

  return (
    <div className="w-full min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">

      {/* CAMERA */}
      {phase === "camera" && (
        <>
          <video
            ref={videoRef}
            className="w-64 h-48 rounded-xl bg-black object-cover"
          />

          <button
            onClick={startCamera}
            className="mt-4 w-48 bg-blue-600 text-white py-2 rounded-xl shadow active:scale-95"
          >
            Hidupkan Kamera..
          </button>

          <button
            onClick={takePhoto}
            className="mt-2 w-48 bg-green-600 text-white py-2 rounded-xl shadow active:scale-95"
          >
            Cekrek
          </button>
        </>
      )}

      {/* PHOTO ANIMATION */}
      <AnimatePresence>
        {phase === "show-photo" && (
          <motion.img
            key="photo"
            src={photo}
            alt="foto"
            className="w-56 h-56 rounded-xl object-cover shadow-xl"
            initial={{ opacity: 0, scale: 0.7, rotate: -7 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* MEME INTERACTION */}
      <AnimatePresence mode="wait">
        {phase === "meme" && (
          <motion.div
            key="meme-phase"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xs bg-white rounded-2xl shadow p-4 text-center"
          >
            {!answer && (
              <>
                <p className="text-sm mb-4 font-medium">
                  Habis lat fotomu tadi..  
                  jawab jujur ya:
                  <br />
                  <span className="font-semibold">
                    Kamu itu cakep atau emang kameranya aja?
                  </span>
                </p>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => setAnswer("kamu")}
                    className="flex-1 bg-pink-600 text-white py-2 rounded-xl active:scale-95"
                  >
                    Ya aku lah
                  </button>
                  <button
                    onClick={() => setAnswer("kamera")}
                    className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-xl active:scale-95"
                  >
                    Kayaknya kamera…
                  </button>
                </div>
              </>
            )}

            {answer === "kamu" && (
              <motion.p
                key="kamu"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm font-semibold mt-4"
              >
                Pantes aja {"<3"}.
              </motion.p>
            )}

            {answer === "kamera" && (
              <motion.p
                key="kamera"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm font-semibold mt-4"
              >
                Apa Kamu? Owalah Pantes Aja.
              </motion.p>
            )}

            {answer && (
              <button
                onClick={() => navigate("/menu")}
                className="w-full mt-5 bg-red-600 text-white py-2 rounded-xl active:scale-95"
              >
                Lanjut
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
