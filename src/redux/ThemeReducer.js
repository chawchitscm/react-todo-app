import * as Actions from "./ThemeAction"
const initialState  = {
  theme: window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}
export const ThemeReducer = (state=initialState, action) => {
  switch (action.type) {
    case Actions.APPLY_THEME:
      return Object.assign({}, {
        theme: action.payload
      });
    default:
      return state;
  }
};