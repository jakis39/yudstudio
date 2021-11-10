import { css } from 'styled-components';

const Typography = {
  title1: {
    fontSize: 'var(--font-title1-size)',
    lineHeight: 'var(--font-title1-lineHeight)',
    fontWeight: 'normal',
    textTransform: 'uppercase',
  },
  body1: {
    fontSize: 'var(--font-body1-size)',
    lineHeight: 'var(--font-body1-lineHeight)',
  },
  body2: {
    fontSize: 'var(--font-body2-size)',
    lineHeight: 'var(--font-body2-lineHeight)',
  },
  body3: {
    fontSize: 'var(--font-body3-size)',
    lineHeight: 'var(--font-body3-lineHeight)',
  },
  body4: {
    fontSize: 'var(--font-body4-size)',
    lineHeight: 'var(--font-body4-lineHeight)',
  },
  button: {
    fontSize: 'var(--font-interface-size)',
    lineHeight: 'var(--font-interface-lineHeight)',
  },
  buttonLarge: {
    fontSize: 'var(--font-interface-large-size)',
    lineHeight: 'var(--font-interface-large-lineHeight)',
  },
  base: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
};

export const font = (type: string) => {
  const typeStyle = Typography[type];

  if (!typeStyle) {
    return null;
  }

  return css`
    font-size: ${typeStyle.fontSize ?? undefined};
    line-height: ${typeStyle.lineHeight ?? undefined};
    font-weight: ${typeStyle.fontWeight ?? undefined};
    text-transform: ${typeStyle.textTransform ?? undefined};
  `;
};
