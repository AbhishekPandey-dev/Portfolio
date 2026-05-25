"use client";

import dynamic from "next/dynamic";
import ClickSpark from "@/components/ClickSpark";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
type GradientT = any;

// Use dynamic imports with SSR disabled to prevent server-side canvas & WebGL errors
const ShaderGradientCanvas = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradientCanvas),
  { ssr: false },
);

const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false },
);

export default function Home() {
  return (
    <main
      className="relative h-screen w-screen min-h-screen bg-black overflow-x-hidden overflow-y-auto snap-y snap-mandatory scroll-smooth"
      id="home-main"
    >
      <section className="relative h-screen w-full snap-start">
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          {/* Fullscreen Moving Shader Gradient Component */}
          <ShaderGradientCanvas
            style={{
              position: "fixed",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.85,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <ShaderGradient
            {...({
              control: "props",
              animate: "on",
              axesHelper: "off",
              brightness: 1.5,
              cAzimuthAngle: 180,
              cDistance: 3.6,
              cPolarAngle: 90,
              cameraZoom: 1,
              color1: "#E43636",
              color2: "#000000",
              color3: "#e40000",
              destination: "onCanvas",
              embedMode: "off",
              envPreset: "city",
              frameRate: 10,
              gizmoHelper: "hide",
              grain: "on",
              lightType: "3d",
              positionX: 0,
              positionY: 0,
              positionZ: 0,
              range: "disabled",
              rangeEnd: 40,
              rangeStart: 0,
              reflection: 0.1,
              rotationX: 0,
              rotationY: 10,
              rotationZ: 50,
              shader: "defaults",
              type: "plane",
              uAmplitude: 1,
              uDensity: 0.4,
              uFrequency: 5.5,
              uSpeed: 0.4,
              uStrength: 2,
              uTime: 0,
              wireframe: false,
            } as unknown as GradientT)}
          />
          </ShaderGradientCanvas>

          {/* Premium Navigation Bar (Above background) */}
          <div className="relative z-10">
            <Navbar />
          </div>
        </ClickSpark>
      </section>

      <section className="h-screen w-full snap-start">
        <Footer />
      </section>
    </main>
  );
}
