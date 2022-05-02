const theme = {
  color: {
    skyblue: '#3DA1FF',
    dark: '#333333',
    backgroundDark: '#1C1C1C',
    backgroundDeepDark: '#0C0F13',
  },
} as const;

export type TypeForMakingTheme = typeof theme;

export default theme;
