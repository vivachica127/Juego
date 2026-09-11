import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { OrganelleType } from "../data/organelles";

type Props = {
  type: OrganelleType;
  color: string;
};

/** Renders a stylized 3D representation for each organelle type. */
export default function OrganelleMesh({ type, color }: Props) {
  const spin = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.25;
  });

  const mat = (c: string, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) => (
    <meshStandardMaterial
      color={c}
      roughness={0.35}
      metalness={0.1}
      emissive={new THREE.Color(c).multiplyScalar(0.2)}
      {...opts}
    />
  );

  switch (type) {
    case "pared":
    case "lamina":
    case "membrana": {
      const isMembrane = type === "membrana";
      return (
        <group ref={spin}>
          <mesh>
            <boxGeometry args={[3.4, 0.5, 3.4]} />
            {mat(color, {
              transparent: isMembrane,
              opacity: isMembrane ? 0.55 : 1,
              roughness: isMembrane ? 0.1 : 0.5,
            })}
          </mesh>
          {[
            [-1.5, 0, -1.5],
            [1.5, 0, -1.5],
            [-1.5, 0, 1.5],
            [1.5, 0, 1.5],
          ].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]}>
              <boxGeometry args={[0.4, 0.9, 0.4]} />
              {mat(color)}
            </mesh>
          ))}
        </group>
      );
    }

    case "nucleo":
      return (
        <group ref={spin}>
          <mesh>
            <sphereGeometry args={[1.3, 48, 48]} />
            {mat(color, { transparent: true, opacity: 0.85 })}
          </mesh>
          <mesh>
            <sphereGeometry args={[0.45, 32, 32]} />
            {mat("#5e1a8a")}
          </mesh>
          {/* nuclear pores */}
          {Array.from({ length: 40 }).map((_, i) => {
            const phi = Math.acos(1 - (2 * (i + 0.5)) / 40);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const r = 1.32;
            return (
              <mesh
                key={i}
                position={[
                  r * Math.sin(phi) * Math.cos(theta),
                  r * Math.cos(phi),
                  r * Math.sin(phi) * Math.sin(theta),
                ]}
              >
                <sphereGeometry args={[0.07, 8, 8]} />
                {mat("#c79be0")}
              </mesh>
            );
          })}
        </group>
      );

    case "reRugoso":
    case "reLiso": {
      const rough = type === "reRugoso";
      return (
        <group ref={spin}>
          {[-0.6, -0.2, 0.2, 0.6].map((y, i) => (
            <group key={i} position={[0, y * 1.6, 0]} rotation={[0, i * 0.3, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1, 0.14, 12, 40, Math.PI * 1.4]} />
                {mat(color)}
              </mesh>
              {rough &&
                Array.from({ length: 14 }).map((_, k) => {
                  const a = (k / 14) * Math.PI * 1.4;
                  return (
                    <mesh key={k} position={[Math.cos(a) * 1.15, 0, Math.sin(a) * 1.15]}>
                      <sphereGeometry args={[0.09, 8, 8]} />
                      {mat("#c0392b")}
                    </mesh>
                  );
                })}
            </group>
          ))}
        </group>
      );
    }

    case "ribosomas":
      return (
        <group ref={spin}>
          {Array.from({ length: 22 }).map((_, i) => {
            const phi = Math.acos(1 - (2 * (i + 0.5)) / 22);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const r = 0.9;
            return (
              <mesh
                key={i}
                position={[
                  r * Math.sin(phi) * Math.cos(theta),
                  r * Math.cos(phi),
                  r * Math.sin(phi) * Math.sin(theta),
                ]}
              >
                <dodecahedronGeometry args={[0.16, 0]} />
                {mat(color)}
              </mesh>
            );
          })}
        </group>
      );

    case "golgi":
      return (
        <group ref={spin} rotation={[0.3, 0, 0.15]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[0, i * 0.28 - 0.56, 0]} scale={[1 - i * 0.12, 1, 1 - i * 0.12]}>
              <torusGeometry args={[0.85, 0.16, 14, 40, Math.PI * 1.3]} />
              {mat(color)}
            </mesh>
          ))}
          {/* vesicles */}
          {[
            [1.2, 0.6, 0.3],
            [-1.1, -0.5, 0.4],
            [0.9, -0.7, -0.4],
          ].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]}>
              <sphereGeometry args={[0.13, 16, 16]} />
              {mat(color)}
            </mesh>
          ))}
        </group>
      );

    case "vacuola":
      return (
        <group ref={spin}>
          <mesh>
            <sphereGeometry args={[1.5, 48, 48]} />
            {mat(color, {
              transparent: true,
              opacity: 0.4,
              roughness: 0.05,
              metalness: 0.2,
            })}
          </mesh>
          <mesh scale={0.95}>
            <sphereGeometry args={[1.5, 32, 32]} />
            {mat(color, { transparent: true, opacity: 0.15, side: THREE.BackSide })}
          </mesh>
        </group>
      );

    case "cloroplasto":
      return (
        <group ref={spin} rotation={[0.2, 0, 0.5]}>
          <mesh scale={[1.4, 0.9, 0.9]}>
            <sphereGeometry args={[1, 48, 48]} />
            {mat(color, { transparent: true, opacity: 0.7 })}
          </mesh>
          {/* grana stacks */}
          {[-0.5, 0, 0.5].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              {[0, 1, 2, 3].map((j) => (
                <mesh key={j} position={[0, j * 0.16 - 0.24, 0]}>
                  <cylinderGeometry args={[0.28, 0.28, 0.1, 20]} />
                  {mat("#1b5e20")}
                </mesh>
              ))}
            </group>
          ))}
        </group>
      );

    case "mitocondria":
      return (
        <group ref={spin} rotation={[0, 0, 0.4]}>
          <mesh scale={[1.5, 0.85, 0.85]}>
            <sphereGeometry args={[1, 48, 48]} />
            {mat(color, { transparent: true, opacity: 0.85 })}
          </mesh>
          {/* cristae */}
          {[-0.9, -0.45, 0, 0.45, 0.9].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.45, 0.06, 10, 24]} />
              {mat("#b85c10")}
            </mesh>
          ))}
        </group>
      );

    case "peroxisoma":
      return (
        <group ref={spin}>
          <mesh>
            <sphereGeometry args={[0.9, 40, 40]} />
            {mat(color, { transparent: true, opacity: 0.85 })}
          </mesh>
          <mesh>
            <boxGeometry args={[0.35, 0.35, 0.35]} />
            {mat("#4a235a")}
          </mesh>
        </group>
      );

    case "citoplasma":
      return (
        <group ref={spin}>
          <mesh>
            <sphereGeometry args={[1.4, 40, 40]} />
            {mat(color, { transparent: true, opacity: 0.3, roughness: 0.2 })}
          </mesh>
          <Particles color="#efe2a0" />
        </group>
      );

    case "citoesqueleto":
      return <Cytoskeleton color={color} spinRef={spin} />;

    default:
      return (
        <mesh ref={spin as never}>
          <sphereGeometry args={[1, 32, 32]} />
          {mat(color)}
        </mesh>
      );
  }
}

function Particles({ color }: { color: string }) {
  const pts = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      arr.push([
        (Math.random() - 0.5) * 2.4,
        (Math.random() - 0.5) * 2.4,
        (Math.random() - 0.5) * 2.4,
      ]);
    }
    return arr;
  }, []);
  return (
    <>
      {pts.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </>
  );
}

function Cytoskeleton({
  color,
  spinRef,
}: {
  color: string;
  spinRef: React.RefObject<THREE.Group | null>;
}) {
  const lines = useMemo(() => {
    const arr: [THREE.Vector3, THREE.Vector3][] = [];
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 10; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 2.6,
          (Math.random() - 0.5) * 2.6,
          (Math.random() - 0.5) * 2.6,
        ),
      );
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.9) arr.push([nodes[i], nodes[j]]);
      }
    }
    return arr;
  }, []);

  return (
    <group ref={spinRef}>
      {lines.map(([a, b], i) => {
        const mid = a.clone().add(b).multiplyScalar(0.5);
        const len = a.distanceTo(b);
        const dir = b.clone().sub(a).normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir,
        );
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.03, 0.03, len, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}
