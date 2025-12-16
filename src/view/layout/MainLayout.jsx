import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div
      className="
        fixed inset-0 w-full h-full overflow-hidden
        bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100
        relative
      "
    >
      {/* Noise overlay biar ga flat banget */}
      <div
        className="
          absolute inset-0
          bg-[url('https://www.transparenttextures.com/patterns/soft-circle-scales.png')]
          opacity-20 pointer-events-none
        "
      />

      <Outlet />
    </div>
  );
}
