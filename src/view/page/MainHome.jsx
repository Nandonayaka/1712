import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const CORRECT_CODE = "1712";
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("LOCKED");

  const press = (v) => {
    if (input.length >= 4) return;
    setInput((prev) => prev + v);
  };

  const clear = () => {
    setInput("");
    setStatus("LOCKED");
  };

  const enter = () => {
    if (input === CORRECT_CODE) {
      navigate("/menu");   // ⬅ pindah halaman
    } else {
      setStatus("ERROR");
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">

      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-6 border border-pink-100">

        {/* TOP BAR */}
        <div className="w-full h-8 bg-pink-200/50 rounded-xl mb-5"></div>

        {/* RESPONSIVE WRAPPER */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">

          {/* LEFT IMAGE */}
          <div>
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow">
              <img
                src="image/01.jpg"
                alt="avatarr"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex-1 w-full">

            {/* INPUT DISPLAY */}
            <input
              value={input}
              disabled
              placeholder="Enter Passcode"
              className={`w-full text-center text-lg font-medium p-2 mb-4 rounded-xl outline-none bg-white border shadow-inner
                ${status === "ERROR" ? "border-red-400" : "border-pink-300"}
              `}
            />

            {/* KEYPAD */}
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3,4,5,6,7,8,9].map((n) => (
                <button
                  key={n}
                  onClick={() => press(n.toString())}
                  className="bg-white hover:bg-pink-50 py-3 rounded-xl text-lg font-semibold shadow active:scale-95 transition border border-pink-200"
                >
                  {n}
                </button>
              ))}

              {/* Clear */}
              <button
                onClick={clear}
                className="bg-red-300/80 hover:bg-red-300 text-white py-3 rounded-xl text-lg shadow active:scale-95 transition"
              >
                C
              </button>

              {/* Zero */}
              <button
                onClick={() => press("0")}
                className="bg-white hover:bg-pink-50 py-3 rounded-xl text-lg font-semibold shadow active:scale-95 transition border border-pink-200"
              >
                0
              </button>

              {/* OK */}
              <button
                onClick={enter}
                className="bg-green-400/80 hover:bg-green-400 text-white py-3 rounded-xl text-lg shadow active:scale-95 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center mt-6 text-gray-600 text-xs tracking-wide">
          (made with love) <br />
          <span className="font-semibold text-gray-700">nandonayaka</span>
        </p>
      </div>
    </div>
  );
}
