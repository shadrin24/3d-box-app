import { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";
import { MeshProps } from "@react-three/fiber";

interface BoxProps extends MeshProps {
    vertices: number[];
}

export default function Box({ vertices, ...props }: BoxProps) {
    const geometry = useMemo(() => {
        if (vertices.length === 0) return new BufferGeometry();

        const geo = new BufferGeometry();
        geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        return geo;
    }, [vertices]);

    return (
        <mesh {...props} geometry={geometry}>
            <meshStandardMaterial color="orange" wireframe={true} />
        </mesh>
    );
}
