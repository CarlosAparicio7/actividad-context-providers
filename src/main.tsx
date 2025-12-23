import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    /**
     <React.StrictMode>
     <ThemeProvider>
     <LanguageProvider>
     <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
     </LanguageProvider>
     </ThemeProvider>
     </React.StrictMode>
     **/
    <React.StrictMode>
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    </React.StrictMode>
);
