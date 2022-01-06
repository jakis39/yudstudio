import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

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
        <NavToggleIcon menuOpen={menuOpen}>
          <DashLine />
          <DashLine />
        </NavToggleIcon>
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
  --icon-width: 14px;
  --icon-spacing: 18px;
  --icon-padding: 32px;
  --line-width: 2px;

  @media (${DeviceWidth.mediaMaxSmall}) {
    --icon-width: 9px;
    --icon-spacing: 12px;
    --icon-padding: 21px;
    --line-width: 1px;
  }

  position: relative;

  ul {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const AnimatedLi = styled.li<{ visible: boolean; delay: number }>`
  margin-top: ${theme.space(1)};

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
          transform: translateY(-100px);
          opacity 0;
          pointer-events: none;
        `}
`;

const NavLink = styled.a<{ isDark: boolean }>`
  ${font('interface20')};
  display: block;
  background: none;
  border: none;
  text-align: right;
  padding: 0 var(--icon-padding) 0 ${theme.space(1)};
  cursor: pointer;
  white-space: nowrap;

  @media (hover: hover) {
    opacity: 80%;

    &:hover {
      opacity: 100%;
    }
  }

  ${({ isDark }) =>
    css`
      color: ${isDark ? theme.colors.black : theme.colors.white};
    `}
`;

const NavToggle = styled(NavLink)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0;

  ${({ isDark }) =>
    css`
      ${DashLine} {
        background-color: ${isDark ? theme.colors.black : theme.colors.white};
      }
    `}
`;

const DashLine = styled.div`
  width: var(--icon-width);
  height: var(--line-width);
  background-color: ${theme.colors.black};
  position: absolute;
  top: calc(50% - 1px);
  left: 0;
`;

const NavToggleIcon = styled.div<{ menuOpen: boolean }>`
  height: var(--icon-width);
  width: var(--icon-width);
  position: relative;
  margin-left: var(--icon-spacing);
  transition: transform 200ms ease-in-out;

  ${({ menuOpen }) =>
    !menuOpen
      ? css`
          transform: rotate(90deg);
        `
      : null};

  ${DashLine}:last-child {
    transition: all 200ms ease-in-out;
    width: var(--line-width);
    left: calc(50% - 1px);

    ${({ menuOpen }) =>
      !menuOpen
        ? css`
            height: var(--icon-width);
            top: 0;
          `
        : null};
  }
`;
