const baseSpacing = 8;

export const theme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    gray: '#a6a6a6',
    lightGray: '#cccccc',
    darkGray: '#757575',
    offWhite: '#ededed',
  },
  get palette() {
    return {
      backgroundColor: this.colors.offWhite,
      textColor: this.colors.black,
      videoPlaceholderColor: this.colors.darkGray,
    };
  },
  space: (multiplier) => `${multiplier * baseSpacing}px`,
};
