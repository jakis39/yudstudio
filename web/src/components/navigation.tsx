import React, { useState } from 'react';

import styled, { css } from 'styled-components';
import { DeviceWidth } from '../styles/mediaQueries';
import { theme } from '../styles/theme';
import { font } from '../styles/typography';

const MENU_ITEMS = [
  {
    label: 'Projects',
    href: '/work',
  },
  {
    label: 'About',
    href: '/',
  },
  {
    label: 'Contact us',
    href: '/contact',
  },
];

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
      {menuOpen && (
        <ul>
          {MENU_ITEMS.map((item) => (
            <li>
              <NavLink key={item.label} href={item.href} isDark={isDark}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
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

    li {
      margin-top: ${theme.space(1.5)};
    }
  }
`;

const NavLink = styled.a<{ isDark: boolean }>`
  ${font('interface20')};
  display: block;
  width: ${theme.space(30)};
  background: none;
  border: 2px solid ${theme.colors.white};
  border-radius: 50px;
  padding: ${theme.space(1.25)} ${theme.space(3)};

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
