import { Outlet } from "react-router-dom";
import Silk from "../animation/Prism";

export default function MainLayout() {
  return (
    <div className="relative w-full  overflow-hidden">

      {/* PRISM FULL WIDTH, HEIGHT FOLLOW CONTENT
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Silk
          speed={5}
          scale={1}
          color="#F576E9"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div> */}

      {/* CONTENT */}
      <div className="relative z-10">
        <Outlet />
      </div>

    </div>
  );
}
