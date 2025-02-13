import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
    console.log("Incoming request body:", req.body);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(204).send("");
    }

    const { width, height, depth } = req.body;

    if (!width || !height || !depth) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    // Изометрическая матрица проекции
    const isoMatrix = [
        [Math.sqrt(3) / 2, 0, -Math.sqrt(3) / 2], // X' = x * cos(30°) - z * cos(30°)
        [0.5, 1, 0.5], // Y' = x * sin(30°) + y - z * sin(30°)
        [0, 0, 0] // Z не используем для 2D-проекции
    ];

    // Вершины куба (до проекции)
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
        [0, 0, 0], [0, height, depth], [0, 0, depth]
    ];

    // Центрируем куб перед проекцией
    const cx = width / 2;
    const cy = height / 2;
    const cz = depth / 2;

    const transformedVertices = vertices.map(([x, y, z]) => {
        const xRel = x - cx;
        const yRel = y - cy;
        const zRel = z - cz;

        // Изометрическая проекция
        const xProj = xRel * isoMatrix[0][0] + zRel * isoMatrix[0][2];
        const yProj = xRel * isoMatrix[1][0] + yRel * isoMatrix[1][1] + zRel * isoMatrix[1][2];

        return [xProj, yProj, 0]; // Z можно занулить
    });

    // Преобразуем в одномерный массив
    const flattenedVertices = transformedVertices.flat();

    res.json({ vertices: flattenedVertices });
}
