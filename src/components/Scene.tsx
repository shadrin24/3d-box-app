import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./Box";

interface Size {
    width: number;
    height: number;
    depth: number;
}

export default function Scene({ size }: { size: Size }) {
    const [vertices, setVertices] = useState<number[]>([]);

    useEffect(() => {
        fetch("/api/triangulateBox", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(size),
        })
            .then((res) => res.json())
            .then((data) => setVertices(data.vertices));
    }, [size]);

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            {vertices.length > 0 && <Box vertices={vertices} />}
        </Canvas>
    );
}
