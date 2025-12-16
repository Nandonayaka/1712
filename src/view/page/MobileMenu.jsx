import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MobileDashboard() {
  const [typed, setTyped] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-quart" });

    const msg =
      "Selamat ulang tahun sayanggg! Semoga makin sukses!, ini hadiah kecil dari aku.., cobain deh game yang aku buat iseng-iseng aja hehe :p";
    let i = 0;
    const interval = setInterval(() => {
      setTyped(msg.slice(0, i));
      i++;
      if (i > msg.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-4 space-y-6 mb-20 h-screen overflow-y-auto bg-confetti">
      <style>{`
        .bg-confetti {
          background-image: url('/img/confetti.png');
          background-size: cover;
          background-repeat: repeat;
        }
        .balloon-float {
          animation: balloon 4s ease-in-out infinite;
        }
        @keyframes balloon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Banner */}
      <div
        className="w-full h-44 rounded-3xl p-5 text-white flex justify-between shadow-xl relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('image/boom/1.png')" }}
        data-aos="zoom-in"
      >
        <div>
          <h2 className="text-xl font-bold tracking-wide">
            Happy Birthday! 🎉
          </h2>
          <p className="text-sm opacity-90">Semoga harimu menyenangkan 🎂</p>
        </div>
        <img
          src="/image/balon.png"
          alt="balloon"
          className="h-28 w-auto object-contain opacity-95 drop-shadow-md balloon-float"
        />
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Nama", value: "Ailaa" },
          { label: "Umur", value: "18" },
          { label: "Tanggal", value: today },
        ].map((d) => (
          <div
            key={d.label}
            className="bg-white rounded-xl p-3 shadow text-center transition hover:shadow-md"
            data-aos="zoom-in"
          >
            <p className="text-xs text-gray-500">{d.label}</p>
            <p className="text-[12px] font-semibold">{d.value}</p>
          </div>
        ))}
      </div>

      {/* Greeting Card */}
      <div
        className="bg-white rounded-2xl shadow p-5 space-y-4"
        data-aos="fade-down"
      >
        <h3 className="text-lg font-semibold text-gray-900">Ucapan Selamat</h3>

        <div
          className="p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition"
          data-aos="fade-left"
        >
          <p className="text-sm font-semibold text-gray-800">Nando</p>
          <p className="text-sm text-gray-600 min-h-[20px]">
            {typed}
            <span className="inline-block w-[3px] ml-1 bg-gray-400 animate-pulse" />
          </p>
          <p className="text-xs text-gray-400 mt-1">2 menit lalu</p>
        </div>

        {/* Click Button */}
        <div className="flex justify-center mt-4">
      <button
        className="px-6 py-3 bg-pink-400 text-white rounded-xl shadow-lg hover:bg-pink-500 active:scale-95 transition"
        onClick={() => navigate("/success")}
      >
        Click Me 🎉
      </button>
    </div>
      </div>
      <div className="flex justify-between">
        <div className="h-36 w-36 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center shadow-lg p-2 space-y-2">
          <img
            src="/image/gm1.jpg"
            alt="Menu Icon"
            className="w-20 h-20 rounded-2xl"
          />
          <a href="/camera" className="w-full">
            <button className="w-full py-1 rounded-2xl text-[12px] bg-pink-300 text-white font-semibold hover:bg-pink-400 transition">
              Camera Game
            </button>
          </a>
        </div>

        <div className="h-36 w-36 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center shadow-lg p-2 space-y-2">
          <img
            src="/image/gm2.jpg"
            alt="Menu Icon"
            className="w-20 h-20 rounded-2xl object-cover"
          />
          <a href="/TTC" className="w-full">
            <button className="w-full py-1 rounded-2xl text-[12px] bg-pink-300 text-white font-semibold hover:bg-pink-400 transition">
              TIC TAC WLE
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
