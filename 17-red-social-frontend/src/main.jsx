// Importacinoes obligatorias de react
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Importar assets (recursos: hojas de estilo, img, fonts)
import "./assets/fonts/fontawesome-free-6.1.2-web/css/all.css";
import "./assets/css/normalize.css";
import "./assets/css/styles.css";
import "./assets/css/responsive.css";

// Iniciar app de react
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
