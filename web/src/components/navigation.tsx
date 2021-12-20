import React, { useState } from 'react';

import styled, { css } from 'styled-components';
import { DeviceWidth } from '../styles/mediaQueries';
import { theme } from '../styles/theme';
import { font } from '../styles/typography';

const MENU_ITEMS = [
  {
    label: 'Projects',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact us',
    href: '/contact',
  },
];

const SLIDE_IN_DELAY = 100;

export interface NavigationProps {
  isDark?: boolean;
}

const Navigation = (props: NavigationProps) => {
  const { isDark } = props;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const onMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Nav>
      <NavToggle as="button" onClick={onMenuClick} isDark={isDark}>
        <span>MENU</span>
        <NavToggleIcon>{menuOpen ? '-' : '+'}</NavToggleIcon>
      </NavToggle>
      <ul>
        {MENU_ITEMS.map((item, index) => (
          <AnimatedLi
            key={item.label}
            visible={menuOpen}
            delay={
              menuOpen ? index * SLIDE_IN_DELAY : (MENU_ITEMS.length - 1 - index) * SLIDE_IN_DELAY
            }
          >
            <NavLink href={item.href} isDark={isDark}>
              {item.label}
            </NavLink>
          </AnimatedLi>
        ))}
      </ul>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.nav`
  ul {
    position: absolute;
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const AnimatedLi = styled.li<{ visible: boolean; delay: number }>`
  margin-top: ${theme.space(1.5)};

  ${({ visible, delay }) =>
    visible
      ? css`
          transition: transform 300ms ease-in-out ${delay}ms, opacity 500ms linear ${delay}ms;
        `
      : css`
          transition: transform 300ms ease-in-out ${delay}ms, opacity 300ms linear ${0}ms;
        `};

  ${({ visible }) =>
    visible
      ? css`
          transform: translateY(0);
          opacity: 1;
        `
      : css`
          transform: translateY(-150px);
          opacity 0;
        `}
`;

const NavLink = styled.a<{ isDark: boolean }>`
  ${font('interface20')};
  display: block;
  width: ${theme.space(30)};
  background: none;
  border: 2px solid ${theme.colors.white};
  border-radius: 50px;
  padding: ${theme.space(1.25)} ${theme.space(3)};

  @media (hover: hover) {
    opacity: 80%;

    &:hover {
      opacity: 100%;
    }
  }

  ${({ isDark }) =>
    css`
      color: ${isDark ? theme.colors.black : theme.colors.white};
      border-color: ${isDark ? theme.colors.black : theme.colors.white}; ;
    `}

  @media (${DeviceWidth.mediaMaxSmall}) {
    width: ${theme.space(17)};
    border-width: 1px;
    padding: ${theme.space(0.75)} ${theme.space(1.5)};
  }
`;

const NavToggle = styled(NavLink)`
  display: flex;
  justify-content: space-between;
`;

const NavToggleIcon = styled.span``;
