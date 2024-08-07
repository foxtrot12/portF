import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { from, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { translations } from "./translations";

const defaultTranslations = translations;

interface LocalizationContextProps {
  translations: { [key: string]: string };
  setLanguage: (language: string) => void;
}

const LocalizationContext = createContext<LocalizationContextProps>({
  translations: defaultTranslations,
  setLanguage: () => {},
});

const LocalizationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [translations, setTranslations] = useState<{ [key: string]: string }>(
    defaultTranslations
  );

  const fetchTranslations = (language: string) => {

    return from(
      fetch(`https://example.com/translations/${language}.json`)
    ).pipe(
      switchMap((response) => response.json()),
      catchError(() => of(defaultTranslations))
    );
  };

  const setLanguage = (language: string) => {
    fetchTranslations(language).subscribe(
      (newTranslations: { [key: string]: string }) => {
        setTranslations(newTranslations);
      }
    );
  };

  return (
    <LocalizationContext.Provider value={{ translations, setLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export { LocalizationProvider, LocalizationContext };

export const useLocalization = () => {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }

  return context;
};
