import { useMemo } from "react";
import {
    BufferGeometry,
    Float32BufferAttribute,
    WireframeGeometry,
} from "three";
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
        <>
            {/* Основной залитый куб */}
            <mesh {...props} geometry={geometry}>
                <meshStandardMaterial
                    color="lightgrey"
                    flatShading={true}
                    // side={1} // THREE.FrontSide
                    // depthTest={true}
                    // depthWrite={true}
                    // polygonOffsetFactor={-1} // Уменьшает глубину сетки, чтобы она была поверх куба
                />
            </mesh>

            {/* Видимая сетка треугольников */}
            <lineSegments geometry={new WireframeGeometry(geometry)}>
                <lineBasicMaterial color="black" depthTest={true} />
            </lineSegments>
        </>
    );
}
