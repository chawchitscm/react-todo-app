import "./App.css";
import Container from "./components/Container";
import useLocalStorage from "use-local-storage";

function App() {
  const defaultLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultLight ? "light" : "dark");

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }
  return (
    <div className="App" data-theme={theme}>
      <Container 
        theme={theme}
        switchTheme={switchTheme} 
      />
    </div>
  );
}

export default App;
