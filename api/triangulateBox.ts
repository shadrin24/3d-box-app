import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
    console.log("Incoming request body:", req.body);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(204).send("");
    }

    const { width, height, depth, angleX = 30, angleY = 45 } = req.body; // Углы поворота

    if (!width || !height || !depth) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    // Переводим углы в радианы
    const radX = (angleX * Math.PI) / 180;
    const radY = (angleY * Math.PI) / 180;

    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);

    // Функция поворота вокруг Y
    const rotateY = (x: number, z: number) => ({
        x: x * cosY - z * sinY,
        z: x * sinY + z * cosY,
    });

    // Функция поворота вокруг X
    const rotateX = (y: number, z: number) => ({
        y: y * cosX - z * sinX,
        z: y * sinX + z * cosX,
    });

    // Вершины куба (до поворота)
    const vertices = [
        [0, 0, 0], [width, 0, 0], [width, height, 0],
        [0, 0, 0], [width, height, 0], [0, height, 0],

        [0, 0, depth], [width, 0, depth], [width, height, depth],
        [0, 0, depth], [width, height, depth], [0, height, depth],

        [0, 0, 0], [width, 0, 0], [width, 0, depth],
        [0, 0, 0], [width, 0, depth], [0, 0, depth],

        [0, height, 0], [width, height, 0], [width, height, depth],
        [0, height, 0], [width, height, depth], [0, height, depth],

        [width, 0, 0], [width, height, 0], [width, height, depth],
        [width, 0, 0], [width, height, depth], [width, 0, depth],

        [0, 0, 0], [0, height, 0], [0, height, depth],
        [0, 0, 0], [0, height, depth], [0, 0, depth],
    ];

    // Применяем повороты к каждой вершине
    const rotatedVertices = vertices.map(([x, y, z]) => {
        // Центрируем перед вращением
        let centeredX = x - width / 2;
        let centeredY = y - height / 2;
        let centeredZ = z - depth / 2;

        // Поворот вокруг Y
        const { x: rotatedX, z: rotatedZ_Y } = rotateY(centeredX, centeredZ);

        // Поворот вокруг X
        const { y: rotatedY, z: rotatedZ_X } = rotateX(centeredY, rotatedZ_Y);

        // Возвращаем обратно
        return [rotatedX + width / 2, rotatedY + height / 2, rotatedZ_X + depth / 2];
    });

    // Делаем плоский массив
    const flattenedVertices = rotatedVertices.flat();

    res.json({ vertices: flattenedVertices });
}
