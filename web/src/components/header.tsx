import { Link } from 'gatsby';
import React from 'react';

import logo from '../images/yud-logo-white.png';
import Navigation from './navigation';
import { DeviceWidth } from '../styles/mediaQueries';
import { theme } from '../styles/theme';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <Branding to="/">
        <img src={logo} />
      </Branding>
      <Navigation hideWhen="small" />
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

  @media (${DeviceWidth.mediaMinSmall}) {
    padding: 3rem 3rem 1.5rem;
  }
`;

const Branding = styled(Link)`
  height: ${theme.space(5)};

  img {
    height: 100%;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    height: ${theme.space(3)};
  }
`;
