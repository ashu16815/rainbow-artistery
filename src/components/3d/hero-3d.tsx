'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import * as THREE from 'three'

// Ring Plate Component
function RingPlate({ position, accentColor = '#d946ef' }: { position: [number, number, number], accentColor?: string }) {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main ring */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1.2, 0.15, 16, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Mirror facets */}
      {Array.from({ length: 24 }).map((_, i) => (
        <mesh key={i} position={[Math.cos(i * 0.26) * 1.2, Math.sin(i * 0.26) * 1.2, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
        </mesh>
      ))}
      
      {/* Tassels */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={i} position={[Math.cos(i * 1.05) * 1.2, Math.sin(i * 1.05) * 1.2, -0.1]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
            <meshStandardMaterial color={accentColor} />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <sphereGeometry args={[0.03]} />
            <meshStandardMaterial color={accentColor} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Name Plate Component
function NamePlate({ position, text = 'Rainbow', accentColor = '#4f46e5' }: { position: [number, number, number], text?: string, accentColor?: string }) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Base plate */}
      <mesh>
        <boxGeometry args={[2, 0.8, 0.1]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.05} />
      </mesh>
      
      {/* Accent border */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[2.1, 0.9, 0.02]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>
      
      {/* Text representation (simplified as geometric shapes) */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[1.2, 0.3, 0.02]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  )
}

// Magnet Tiles Component
function MagnetTiles({ position, count = 6 }: { position: [number, number, number], count?: number }) {
  const groupRef = useRef<Group>(null)
  const pastelColors = ['#fbb6ce', '#c6f6d5', '#bee3f8', '#fde68a', '#d1d5db', '#e9d5ff']

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.x = Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.1
        child.position.y = Math.sin(state.clock.elapsedTime * 0.3 + i * 0.5) * 0.05
      })
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[i * 0.3 - (count - 1) * 0.15, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.05]} />
          <meshStandardMaterial color={pastelColors[i % pastelColors.length]} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

// Shader Background Component
function ShaderBackground() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = state.clock.elapsedTime * 0.06
    }
  })

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        vec2 p = vUv * 3.0;
        float n = noise(p + time);
        n = n * 0.5 + 0.5;
        
        vec3 color1 = vec3(1.0, 1.0, 1.0);
        vec3 color2 = vec3(0.93, 0.95, 1.0);
        vec3 color3 = vec3(0.99, 0.95, 0.97);
        
        vec3 finalColor = mix(color1, color2, n * 0.25);
        finalColor = mix(finalColor, color3, n * 0.15);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
  }), [])

  return (
    <mesh position={[0, 0, -2]} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={shaderMaterial} ref={shaderRef} />
    </mesh>
  )
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ShaderBackground />
      
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 2]} intensity={0.6} />
      <Environment preset="studio" />
      
      {/* 3D Objects */}
      <RingPlate position={[-1.5, 0.5, 0]} accentColor="#d946ef" />
      <NamePlate position={[1.2, -0.3, 0]} text="Rainbow" accentColor="#4f46e5" />
      <MagnetTiles position={[0, -1.2, 0]} count={6} />
    </>
  )
}

// Main Hero3D Component
export default function Hero3D() {
  return (
    <div className="w-full h-[600px] md:h-[720px] relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        performance={{ min: 0.5 }}
        dpr={[1, 2]}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-wide">
            Handmade wall hangings & gifts
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
            Modern artistry, traditional soul. Personalised name plates, magnets and festive décor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-colors duration-220">
              Browse Gallery
            </button>
            <button className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-semibold hover:bg-indigo-50 transition-colors duration-220">
              Custom Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
