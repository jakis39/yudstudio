import { Link } from 'gatsby';
import React from 'react';

import logo from '../images/yud.png';
import Navigation from './navigation';
import { DeviceWidth } from '../styles/mediaQueries';
import { theme } from '../styles/theme';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <BrandWrapper>
        <Branding>
          <Link to="/">
            <img src={logo} />
            {/* <embed src={logo} width="200px" height="100px" type="image/svg+xml" /> */}
          </Link>
        </Branding>
      </BrandWrapper>
      <Navigation hideWhen="small" />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  width: 100%;

  @media (${DeviceWidth.mediaMinSmall}) {
    padding: 3rem 3rem 1.5rem;
  }
`;

const BrandWrapper = styled.div`
  background-color: ${theme.colors.white};

  @media (${DeviceWidth.mediaMaxSmall}) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1.3em 1em;
    z-index: 10;
  }
`;

const Branding = styled.div`
  a {
    display: inline-block;
    height: 40px;

    img {
      height: 100%;
    }
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    & a {
      height: 24px;
      text-align: right;
    }
  }
`;
