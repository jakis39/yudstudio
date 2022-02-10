const baseSpacing = 8;

export const theme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    gray: '#a6a6a6',
    offWhite: '#ededed',
  },
  space: (multiplier) => `${multiplier * baseSpacing}px`,
};
