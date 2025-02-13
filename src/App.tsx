import { ThemeProvider, useTheme } from "./ThemeContext";
import BoxForm from "./components/BoxForm";
import Scene from "./components/Scene";
import { useState } from "react";

function AppContent() {
    const [size, setSize] = useState({ width: 1, height: 1, depth: 1 });
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: darkMode ? "#333" : "#fff",
                color: darkMode ? "#fff" : "#000",
            }}
        >
            {/* Контейнер для формы и сцены */}
            <div style={{ display: "flex", width: "80%", maxWidth: "1200px" }}>
                {/* Форма (слева, по центру) */}
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <BoxForm onSizeChange={(width, height, depth) => setSize({ width, height, depth })} />
                </div>

                {/* Сцена (справа, по центру) */}
                <div style={{ flex: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Scene size={size} />
                </div>
            </div>

            {/* Кнопка переключения темы */}
            <button
                onClick={toggleTheme}
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    background: darkMode ? "#555" : "#ddd",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Сменить тему
            </button>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
