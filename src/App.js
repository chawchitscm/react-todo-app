import "./App.css";
import Container from "./components/Container";
// import useLocalStorage from "use-local-storage";
import { useSelector, useDispatch } from "react-redux";
import { applyTheme } from "./redux/ThemeAction";

function App() {
  // const defaultLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  // const [theme, setTheme] = useLocalStorage("theme", defaultLight ? "light" : "dark");
  const theme = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  const switchTheme = () => {
    // const newTheme = theme === "dark" ? "light" : "dark";
    // setTheme(newTheme);
    console.log(theme);
    dispatch(applyTheme(theme));
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
