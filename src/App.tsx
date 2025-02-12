import { ThemeProvider, useTheme } from "./ThemeContext";
import BoxForm from "./components/BoxForm";
import Scene from "./components/Scene";
import {useState} from "react";

function AppContent() {
    const [size, setSize] = useState({ width: 1, height: 1, depth: 1 });
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div style={{ background: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000" }}>
            <button onClick={toggleTheme}>Сменить тему</button>
            {/* Передаём три числа, а не объект */}
            <BoxForm onSizeChange={(width, height, depth) => setSize({ width, height, depth })} />
            <Scene size={size} />
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
