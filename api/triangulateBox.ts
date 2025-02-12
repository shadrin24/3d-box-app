import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
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

    // Вершины куба
    const vertices = [
        [0, 0, 0], [width, 0, 0], [width, height, 0],  // Лицевая грань
        [0, 0, 0], [width, height, 0], [0, height, 0],

        [0, 0, depth], [width, 0, depth], [width, height, depth], // Задняя грань
        [0, 0, depth], [width, height, depth], [0, height, depth],

        [0, 0, 0], [width, 0, 0], [width, 0, depth], // Нижняя грань
        [0, 0, 0], [width, 0, depth], [0, 0, depth],

        [0, height, 0], [width, height, 0], [width, height, depth], // Верхняя грань
        [0, height, 0], [width, height, depth], [0, height, depth],

        [width, 0, 0], [width, height, 0], [width, height, depth], // Правая грань
        [width, 0, 0], [width, height, depth], [width, 0, depth],

        [0, 0, 0], [0, height, 0], [0, height, depth], // Левая грань
        [0, 0, 0], [0, height, depth], [0, 0, depth],
    ];

    // Преобразуем в один массив чисел (flat)
    const flattenedVertices = vertices.flat();

    res.json({ vertices: flattenedVertices });
}
