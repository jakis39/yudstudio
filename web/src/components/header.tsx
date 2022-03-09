import { Link } from 'gatsby';
import React from 'react';

import logoWhite from '../images/yud-logo-white.png';
import logoBlack from '../images/yud-logo-black.png';
import Navigation from './navigation';
import { DeviceWidth } from '../styles/mediaQueries';
import { theme } from '../styles/theme';
import styled from 'styled-components';
import useBackgroundColourLightness from '../lib/useBackgroundColourLightness';
export interface HeaderProps {
  isDark?: boolean;
}

const Header = (props: HeaderProps) => {
  const { isDark } = props;
  const backgroundIsDark = useBackgroundColourLightness();
  const useDarkColour = isDark || !backgroundIsDark;

  return (
    <HeaderContainer>
      <Branding to="/" aria-label="Home">
        <img
          src={logoWhite}
          aria-hidden={useDarkColour}
          alt="yudstudio - Home"
          style={{ opacity: useDarkColour ? 0 : 1 }}
        />
        <img
          src={logoBlack}
          aria-hidden={!useDarkColour}
          alt="yudstudio - Home"
          style={{ opacity: useDarkColour ? 1 : 0 }}
        />
      </Branding>
      <Navigation isDark={useDarkColour} />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  z-index: 999;

  padding: ${theme.space(6)} ${theme.space(6)} 1.5rem;

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding: ${theme.space(4)} ${theme.space(4)} 1.5rem;
    align-items: center;
  }

  @media (${DeviceWidth.mediaMinLarge}) {
    padding: ${theme.space(9)} ${theme.space(9)} 1.5rem;
  }
`;

const Branding = styled(Link)`
  height: ${theme.space(5)};
  position: relative;

  img {
    height: 100%;
    position: absolute;
    transition: opacity 200ms linear;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    height: ${theme.space(2.5)};
  }
`;
