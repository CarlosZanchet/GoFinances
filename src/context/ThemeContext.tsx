import { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
  children: React.ReactNode;
};

interface IThemeData {
  theme: 'light' | 'dark';
  handleTheme: (theme: string) => string;
}

const ThemeLightDarkContext = createContext<IThemeData>({} as IThemeData);

function ThemeLightDarkProvider({ children }: ContextProps) {

  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setTheme('light')
  }, [])

  function handleTheme() {
    return theme === 'light' ? 'dark' : 'light';
  }

  return (
    <ThemeLightDarkContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeLightDarkContext.Provider>
  )
}

function useThemeLightDark() {
  return useContext(ThemeLightDarkContext)
}

export { ThemeLightDarkProvider, useThemeLightDark }
