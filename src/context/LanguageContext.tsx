import { createContext } from "react";

const LANGUAGE_KEY: string = "app-language";

type Language = "es" | "en";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) =>void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
    children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    
}