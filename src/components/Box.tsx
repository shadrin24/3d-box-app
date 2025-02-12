import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const Box = (props: MeshProps) => {
    const meshRef = useRef<Mesh>(null!);

    // Анимация вращения
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} {...props}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

export default Box;
