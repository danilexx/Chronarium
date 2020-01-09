// themed-styled-component.ts
// eslint-disable-next-line import/no-duplicates
import * as styledComponents from "styled-components";
// eslint-disable-next-line import/no-duplicates
import { ThemedStyledComponentsModule } from "styled-components";
import { ITheme } from "./theme";

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  createGlobalStyle
  // ... etc
} = (styledComponents as any) as ThemedStyledComponentsModule<ITheme>;

export { css, keyframes, ThemeProvider, createGlobalStyle };
export default styled;
