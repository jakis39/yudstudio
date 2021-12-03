import { Link } from 'gatsby';
import React from 'react';

import logoWhite from '../images/yud-logo-white.png';
import logoBlack from '../images/yud-logo-black.png';
import Navigation from './navigation';
import { DeviceWidth } from '../styles/mediaQueries';
import { theme } from '../styles/theme';
import styled from 'styled-components';

export interface HeaderProps {
  isDark?: boolean;
}

const Header = (props: HeaderProps) => {
  const { isDark } = props;

  return (
    <HeaderContainer>
      <Branding to="/">
        <img src={isDark ? logoBlack : logoWhite} />
      </Branding>
      <Navigation isDark={isDark} />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  z-index: 999;

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding: ${theme.space(4)} ${theme.space(4)} 1.5rem;
    align-items: center;
  }

  @media (${DeviceWidth.mediaMinSmall}) {
    padding: ${theme.space(9)} ${theme.space(9)} 1.5rem;
  }
`;

const Branding = styled(Link)`
  height: ${theme.space(5)};

  img {
    height: 100%;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    height: ${theme.space(2.5)};
  }
`;
