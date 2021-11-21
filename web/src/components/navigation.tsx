import React, { useState } from 'react';

import styled, { css } from 'styled-components';
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

const Navigation = (props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const onMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Nav>
      <NavToggle as="button" onClick={onMenuClick}>
        <span>MENU</span>
        <NavToggleIcon>{menuOpen ? '-' : '+'}</NavToggleIcon>
      </NavToggle>
      {menuOpen && (
        <ul>
          {MENU_ITEMS.map((item) => (
            <li>
              <NavLink href={item.href}>{item.label}</NavLink>
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

const NavLink = styled.a`
  ${font('interface20')};
  display: block;
  width: ${theme.space(30)};
  color: ${theme.colors.white};
  background: none;
  border: 2px solid ${theme.colors.white};
  border-radius: 50px;
  padding: ${theme.space(1.25)} ${theme.space(3)};
`;

const NavToggle = styled(NavLink)`
  display: flex;
  justify-content: space-between;
`;

const NavToggleIcon = styled.span``;
