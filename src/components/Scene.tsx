import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Box from "./Box";

const Scene = () => {
    return (
        <Canvas camera={{ position: [3, 3, 3] }}>
    {/* Освещение */}
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />

    {/* 3D Куб */}
    <Box />

    {/* Контролы камеры */}
    <OrbitControls />
    </Canvas>
);
};

export default Scene;
