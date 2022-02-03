export const APPLY_THEME = "APPY_THEME";
export const applyTheme = (theme) => {
  const newTheme = theme === "dark" ? "light" : "dark";
  return {
    type: APPLY_THEME,
    payload: newTheme
  };
};