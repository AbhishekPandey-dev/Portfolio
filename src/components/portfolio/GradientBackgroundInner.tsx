"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export default function GradientBackgroundInner() {
  return (
    <ShaderGradientCanvas
      pixelDensity={1}
      fov={45}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
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
          format: "gif",
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
        } as any)}
      />
    </ShaderGradientCanvas>
  );
}
