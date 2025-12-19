import { createContext, useContext, useEffect, useState } from "react";
// Importación de las traducciones
import en from "../locales/en.json";
import es from "../locales/es.json";

// 1. Configuración de tipos y constantes
const LANGUAGE_KEY: string = "app-language";
type Language = "es" | "en";

// Agrupamos los archivos para acceder a ellos dinámicamente
const translations = { es, en } as const;

// Tipado estricto para las llaves de traducción basado en el JSON de español
type TranslationKey = keyof typeof es;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

// 2. Creación del Contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: React.ReactNode;
};

// 3. Implementación del Provider
export function LanguageProvider({ children }: LanguageProviderProps) {
  // Inicialización del estado desde localStorage
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    return (stored === "en" || stored === "es") ? stored : "es";
  });

  // Función para cambiar a un idioma específico
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Función para alternar entre idiomas (útil para botones rápidos)
  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "es" ? "en" : "es"));
  };

  // Función de traducción
  const t = (key: TranslationKey): string => {
    // Si la llave no existe en el idioma actual, devolvemos la llave como fallback
    return translations[language][key] || key;
  };

  // Efecto para persistencia y manipulación del DOM (clases CSS)
  useEffect(() => {
    const root = document.documentElement;
    
    if (language === "en") {
      root.classList.add("en");
    } else {
      root.classList.remove("en");
    }

    window.localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const value: LanguageContextType = {language, setLanguage, toggleLanguage, t,};

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 4. Hook personalizado para consumir el contexto
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return ctx;
}