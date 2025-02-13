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
        const apiUrl = import.meta.env.VITE_API_URL || "https://3d-box-app.vercel.app"; // Автоматически меняет сервер
        console.log("API URL:", apiUrl);
        console.log("Sending request with size:", size);

        fetch(`${apiUrl}/api/triangulateBox`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(size),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Vertices received:", data.vertices); // ЛОГ ДАННЫХ
                setVertices(data.vertices);
            });
    }, [size]);

    return (
        <Canvas style={{ width: "100%", height: "100%" }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            {vertices.length > 0 && <Box vertices={vertices} />}
        </Canvas>
    );
}
