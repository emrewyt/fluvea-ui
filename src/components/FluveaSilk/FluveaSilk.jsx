/* eslint-disable react/no-unknown-property */
import React, { forwardRef, useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Color } from 'three';

const colorToNormalizedRGB = (color) => {
  if (typeof color !== 'string') return [0.42, 0.28, 0.53];
  
  // rgb(r, g, b) format
  if (color.startsWith('rgb')) {
    const matches = color.match(/\d+/g);
    if (matches && matches.length >= 3) {
      return [
        Math.min(255, Math.max(0, parseInt(matches[0], 10))) / 255,
        Math.min(255, Math.max(0, parseInt(matches[1], 10))) / 255,
        Math.min(255, Math.max(0, parseInt(matches[2], 10))) / 255,
      ];
    }
  }

  // hex format
  const hex = color.replace('#', '');
  if (hex.length === 6) {
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  } else if (hex.length === 3) {
    return [
      parseInt(hex[0] + hex[0], 16) / 255,
      parseInt(hex[1] + hex[1], 16) / 255,
      parseInt(hex[2] + hex[2], 16) / 255,
    ];
  }
  return [0.42, 0.28, 0.53];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform float uLightMode;

uniform float uWaveAmp;
uniform float uFoldDepth;
uniform float uWaveTurbulence;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uTime;

  // Dinamik Dalgalanma & Kumaş Kırışıklığı (Doğal, ipeksi ve sakin akış)
  tex.y += uWaveAmp * sin(6.0 * tex.x - tOffset * 0.6);
  tex.x += (uWaveAmp * 0.6) * cos(5.0 * tex.y - tOffset * 0.45);

  float pattern = 0.55 +
                  uFoldDepth * sin((4.5 + uWaveTurbulence) * (tex.x + tex.y +
                                   cos(3.0 * tex.x + (4.5 + uWaveTurbulence) * tex.y) +
                                   0.08 * tOffset) +
                           sin((16.0 + uWaveTurbulence * 6.0) * (tex.x + tex.y - 0.12 * tOffset)));

  float grain = rnd / 15.0 * uNoiseIntensity;
  vec3 result = uColor * pattern - vec3(grain);

  if (uLightMode > 0.5) {
    float fold = smoothstep(0.25, 0.92, pattern);
    float specular = smoothstep(0.70, 0.98, pattern);
    vec3 shadowColor = uColor * 0.68;
    vec3 bodyColor = min(uColor * 1.22, vec3(1.0));
    vec3 lightBase = mix(shadowColor, bodyColor, fold);
    lightBase = mix(lightBase, vec3(1.0), specular * 0.95);
    float fineNoise = noise(gl_FragCoord.xy * 0.63 + vec2(17.0, 41.0));
    float grainSignal = (rnd + fineNoise - 1.0);
    float grainStrength = clamp(uNoiseIntensity * 0.038, 0.0, 0.16);
    result = lightBase + grainSignal * grainStrength;
  }

  gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0);
}
`;

const SilkPlane = forwardRef(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((state, delta) => {
    if (ref.current) {
      if (ref.current.scale.x !== state.viewport.width || ref.current.scale.y !== state.viewport.height) {
        ref.current.scale.set(state.viewport.width, state.viewport.height, 1);
      }
    }

    if (ref.current?.material?.uniforms?.uTime) {
      const safeDelta = Math.min(delta, 0.05);

      if (uniforms.targetColor) {
        ref.current.material.uniforms.uColor.value.lerp(uniforms.targetColor, safeDelta * 2.0);
      }

      if (uniforms.targetSpeed !== undefined) {
        uniforms.currentSpeed += (uniforms.targetSpeed - uniforms.currentSpeed) * safeDelta * 2.0;
      }

      if (uniforms.targetWaveAmp !== undefined) {
        const curAmp = ref.current.material.uniforms.uWaveAmp.value;
        ref.current.material.uniforms.uWaveAmp.value += (uniforms.targetWaveAmp - curAmp) * safeDelta * 2.0;
      }

      if (uniforms.targetFoldDepth !== undefined) {
        const curDepth = ref.current.material.uniforms.uFoldDepth.value;
        ref.current.material.uniforms.uFoldDepth.value += (uniforms.targetFoldDepth - curDepth) * safeDelta * 2.0;
      }

      if (uniforms.targetTurbulence !== undefined) {
        const curTurb = ref.current.material.uniforms.uWaveTurbulence.value;
        ref.current.material.uniforms.uWaveTurbulence.value += (uniforms.targetTurbulence - curTurb) * safeDelta * 2.0;
      }

      if (uniforms.targetNoise !== undefined) {
        const curNoise = ref.current.material.uniforms.uNoiseIntensity.value;
        ref.current.material.uniforms.uNoiseIntensity.value += (uniforms.targetNoise - curNoise) * safeDelta * 2.0;
      }

      ref.current.material.uniforms.uTime.value += 0.08 * uniforms.currentSpeed * safeDelta;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
});
SilkPlane.displayName = 'SilkPlane';

/**
 * FluveaSilk - WebGL Fluid Silk Wave Simulator
 * (Formerly Silk)
 */
export const FluveaSilk = ({
  speed = 5,
  scale = 1,
  color = '#6b4987',
  noiseIntensity = 1.5,
  waveAmp = 0.032,
  foldDepth = 0.42,
  waveTurbulence = 1.0,
  rotation = 0,
  lightMode = false,
  className = '',
}) => {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...colorToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uLightMode: { value: lightMode ? 1 : 0 },
      uTime: { value: 0 },
      uWaveAmp: { value: waveAmp },
      uFoldDepth: { value: foldDepth },
      uWaveTurbulence: { value: waveTurbulence },

      targetColor: new Color(...colorToNormalizedRGB(color)),
      targetSpeed: speed,
      currentSpeed: speed,
      targetNoise: noiseIntensity,
      targetWaveAmp: waveAmp,
      targetFoldDepth: foldDepth,
      targetTurbulence: waveTurbulence,
    }),
    []
  );

  useEffect(() => {
    if (uniforms) {
      uniforms.targetSpeed = speed;
      uniforms.uScale.value = scale;
      uniforms.targetNoise = noiseIntensity;
      uniforms.targetWaveAmp = waveAmp;
      uniforms.targetFoldDepth = foldDepth;
      uniforms.targetTurbulence = waveTurbulence;
      const rgb = colorToNormalizedRGB(color);
      if (uniforms.targetColor) {
        uniforms.targetColor.setRGB(rgb[0], rgb[1], rgb[2]);
      }
      uniforms.uRotation.value = rotation;
      uniforms.uLightMode.value = lightMode ? 1 : 0;
    }
  }, [speed, scale, noiseIntensity, waveAmp, foldDepth, waveTurbulence, color, rotation, lightMode, uniforms]);

  return (
    <div className={`w-full h-full relative overflow-hidden select-none pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        <SilkPlane ref={meshRef} uniforms={uniforms} />
      </Canvas>
    </div>
  );
};

export default FluveaSilk;
