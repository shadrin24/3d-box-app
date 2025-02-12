import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface BoxFormProps {
    onSizeChange: (width: number, height: number, depth: number) => void;
}

const BoxForm = ({ onSizeChange }: BoxFormProps) => {
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [depth, setDepth] = useState(1);

    const handleSubmit = () => {
        onSizeChange(width, height, depth);
    };

    return (
        <Box
            sx={{
                width: 300,
                padding: 2,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h6">Настройки куба</Typography>

            <TextField
                label="Ширина"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                fullWidth
            />
            <TextField
                label="Высота"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                fullWidth
            />
            <TextField
                label="Глубина"
                type="number"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                fullWidth
            />

            <Button variant="contained" onClick={handleSubmit}>
                Изменить куб
            </Button>
        </Box>
    );
};

export default BoxForm;
