import { css } from 'styled-components';

const Typography = {
  interface20: {
    fontFamily: 'var(--font-family-chalet)',
    fontSize: 'var(--font-interface20-size)',
    lineHeight: 'var(--font-interface20-line-height)',
    fontWeight: 'normal',
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
  body18: {
    fontFamily: 'var(--font-family-chalet)',
    fontSize: 'var(--font-body18-size)',
    lineHeight: 'var(--font-body18-line-height)',
    fontWeight: 'normal',
  },
  body20: {
    fontFamily: 'var(--font-family-chalet)',
    fontSize: 'var(--font-body20-size)',
    lineHeight: 'var(--font-body20-line-height)',
    fontWeight: 'normal',
  },
  body24: {
    fontFamily: 'var(--font-family-chalet)',
    fontSize: 'var(--font-body24-size)',
    lineHeight: 'var(--font-body24-line-height)',
    fontWeight: 'normal',
  },
  title24: {
    fontFamily: 'var(--font-family-maison-neue)',
    fontSize: 'var(--font-title24-size)',
    lineHeight: 'var(--font-title24-line-height)',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title48: {
    fontFamily: 'var(--font-family-maison-neue)',
    fontSize: 'var(--font-title48-size)',
    lineHeight: 'var(--font-title48-line-height)',
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  // title1: {
  //   fontSize: 'var(--font-title1-size)',
  //   lineHeight: 'var(--font-title1-line-height)',
  //   fontWeight: 'normal',
  //   textTransform: 'uppercase',
  // },
  // body1: {
  //   fontSize: 'var(--font-body1-size)',
  //   lineHeight: 'var(--font-body1-line-height)',
  // },
  // body2: {
  //   fontSize: 'var(--font-body2-size)',
  //   lineHeight: 'var(--font-body2-line-height)',
  // },
  // body3: {
  //   fontSize: 'var(--font-body3-size)',
  //   lineHeight: 'var(--font-body3-line-height)',
  // },
  // body4: {
  //   fontSize: 'var(--font-body4-size)',
  //   lineHeight: 'var(--font-body4-line-height)',
  // },
  // button: {
  //   fontSize: 'var(--font-interface-size)',
  //   lineHeight: 'var(--font-interface-line-height)',
  // },
  // buttonLarge: {
  //   fontSize: 'var(--font-interface-large-size)',
  //   lineHeight: 'var(--font-interface-large-line-height)',
  // },
  base: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
};

export type FontStyle = 'interface20' | 'body18' | 'body20' | 'body24' | 'title24' | 'title48';

export const font = (type: FontStyle) => {
  const typeStyle = Typography[type];

  if (!typeStyle) {
    return null;
  }

  return css`
    font-family: ${typeStyle.fontFamily ?? undefined};
    font-size: ${typeStyle.fontSize ?? undefined};
    line-height: ${typeStyle.lineHeight ?? undefined};
    font-weight: ${typeStyle.fontWeight ?? undefined};
    text-transform: ${typeStyle.textTransform ?? undefined};
    text-decoration: ${typeStyle.textDecoration ?? undefined};
  `;
};
