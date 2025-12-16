"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BirthdayCard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const messages = [
    {
      title: "A Message For You 🎀",
      content:
        "Selamat Ulang Tahun Sayangg, maap ya aku cuma bisa kasih ini, Btw udah 18 aja ini..",
    },
    {
      title: "Second Step ✨",
      content:
        "Semoga jadi Orang yang Hebat dan Suksaess semoga makin sayang akuu :p",
    },
    {
      title: "Final Step 🎉",
      content:
        "Terus Senyum Ya sayang walaupun banyak cobaan yang menerjang Tetep Semangatt, Aku bakal Terus Support Kamuuu..",
    },
  ];

  const nextStep = () => {
    if (step < messages.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-5 border border-pink-200 animate-bounce-slow">
        {/* Header */}
        <h2 className="text-center text-pink-500 font-bold text-xl mb-4 tracking-wide animate-pulse">
          🎉 Happy Birthday! 🎉
        </h2>

        {/* Envelope & Collect */}
        <div className="flex justify-center mb-4 animate-bounce cursor-pointer">
          <img
            src="image/05.png"
            alt="envelope"
            className="w-40 drop-shadow hover:scale-110 transition-transform duration-300"
            onClick={() => {
              setOpen(true);
              setStep(0);
            }}
          />
        </div>

        <button
          onClick={() => {
            setOpen(true);
            setStep(0);
          }}
          className="w-full bg-pink-400 hover:bg-pink-500 transition text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 animate-pulse"
        >
          COLLECT 💌
        </button>
      </div>

      {/* Popup Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white w-80 rounded-2xl p-6 shadow-2xl text-center transform scale-90 animate-scale-up">
            <h3 className="text-xl font-bold text-pink-500 mb-2 animate-pulse">
              {messages[step].title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-6 animate-fade-in">
              {messages[step].content}
            </p>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mb-4">
              {messages.map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === step ? "bg-pink-500" : "bg-pink-200"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              {step > 0 && (
                <button
                  onClick={prevStep}
                  className="flex-1 bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 rounded-lg shadow-lg active:scale-95 transition"
                >
                  Prev
                </button>
              )}
              {step < messages.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-lg shadow-lg active:scale-95 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => navigate("/cake")}
                  className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 rounded-lg shadow-lg active:scale-95 transition"
                >
                  Next
                </button>
              )}
            </div>
           
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.3s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
