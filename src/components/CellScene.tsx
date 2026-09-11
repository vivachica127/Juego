import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { ORGANELLES } from "../data/organelles";
import type { Organelle } from "../data/organelles";
import OrganelleMesh from "./OrganelleMesh";

type Props = {
  activeId: string | null;
  completed: Set<string>;
  onSelect: (o: Organelle) => void;
};

function CameraRig({ target }: { target: [number, number, number] | null }) {
  const { camera } = useThree();
  const controls = useRef<any>(null);
  const desiredPos = useRef(new THREE.Vector3(0, 2, 16));
  const desiredTarget = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(() => {
    if (target) {
      const t = new THREE.Vector3(...target);
      desiredTarget.current.copy(t);
      // position camera at an offset from the organelle
      desiredPos.current.set(t.x + 3.5, t.y + 1.6, t.z + 5);
    } else {
      desiredTarget.current.set(0, 1, 0);
      desiredPos.current.set(0, 2.5, 16);
    }
    camera.position.lerp(desiredPos.current, 0.05);
    if (controls.current) {
      controls.current.target.lerp(desiredTarget.current, 0.05);
      controls.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      minDistance={3}
      maxDistance={26}
      enableDamping
    />
  );
}

function Checkpoint({
  organelle,
  active,
  done,
  onSelect,
}: {
  organelle: Organelle;
  active: boolean;
  done: boolean;
  onSelect: (o: Organelle) => void;
}) {
  const hover = useRef(false);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      ring.current.scale.setScalar(s);
    }
  });

  return (
    <group position={organelle.position}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
        <group
          scale={organelle.scale}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(organelle);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            hover.current = true;
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            hover.current = false;
            document.body.style.cursor = "auto";
          }}
        >
          <OrganelleMesh type={organelle.id} color={organelle.color} />
        </group>

        {/* label */}
        <Html position={[0, organelle.scale * 1.6 + 0.6, 0]} center distanceFactor={14}>
          <div
            className={`pointer-events-none select-none whitespace-nowrap rounded-full px-3 py-1 text-center text-[13px] font-semibold shadow-lg backdrop-blur transition ${
              done
                ? "bg-emerald-500/90 text-white"
                : active
                  ? "bg-white text-slate-900"
                  : "bg-slate-900/70 text-white"
            }`}
          >
            {done ? "✓ " : ""}
            {organelle.name}
          </div>
        </Html>
      </Float>

      {/* status ring on the floor */}
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, -organelle.scale * 1.7 - 0.3, 0]}>
        <ringGeometry args={[0.9, 1.05, 40]} />
        <meshBasicMaterial
          color={done ? "#10b981" : active ? "#ffffff" : "#64748b"}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function CellScene({ activeId, completed, onSelect }: Props) {
  const active = ORGANELLES.find((o) => o.id === activeId) ?? null;

  return (
    <Canvas camera={{ position: [0, 2.5, 16], fov: 55 }} dpr={[1, 2]}>
      <color attach="background" args={["#050914"]} />
      <fog attach="fog" args={["#050914", 18, 40]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 6]} intensity={1.1} />
      <directionalLight position={[-8, -4, -6]} intensity={0.4} color="#5eead4" />
      <pointLight position={[0, 0, 8]} intensity={0.6} color="#a78bfa" />

      <Stars radius={80} depth={40} count={2500} factor={4} saturation={0} fade speed={1} />

      {ORGANELLES.map((o) => (
        <Checkpoint
          key={o.id}
          organelle={o}
          active={activeId === o.id}
          done={completed.has(o.id)}
          onSelect={onSelect}
        />
      ))}

      <CameraRig target={active ? active.position : null} />
    </Canvas>
  );
}
