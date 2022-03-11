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
  const navToggleRef = useRef(null);
  const [iconOffset, setIconOffset] = useState(0);

  const onMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const onNavLinkMouseEnter = (e) => {
    // Calcualte Y offset of hovered item to move toggle icon down next to it
    const menuToggleOffset = navToggleRef.current.getBoundingClientRect().y;
    const listItemOffset = e.target.getBoundingClientRect().y;
    setIconOffset(listItemOffset - menuToggleOffset);
  };

  const onNavListMouseLeave = () => setIconOffset(0);

  return (
    <Nav>
      <NavToggle as="button" onClick={onMenuClick} isDark={isDark} ref={navToggleRef}>
        <span>MENU</span>
        <NavToggleIcon menuOpen={menuOpen} offset={iconOffset}>
          <DashLine />
          <DashLine />
        </NavToggleIcon>
      </NavToggle>
      <ul onMouseLeave={onNavListMouseLeave}>
        {MENU_ITEMS.map((item, index) => (
          <AnimatedLi
            key={item.label}
            visible={menuOpen}
            delay={
              menuOpen ? index * SLIDE_IN_DELAY : (MENU_ITEMS.length - 1 - index) * SLIDE_IN_DELAY
            }
          >
            <NavLink href={item.href} isDark={isDark} onMouseEnter={onNavLinkMouseEnter}>
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
  top: calc(50% - var(--line-width) / 2);
  left: 0;
`;

const NavToggleIcon = styled.div<{ menuOpen: boolean; offset: number }>`
  height: var(--icon-width);
  width: var(--icon-width);
  position: relative;
  margin-left: var(--icon-spacing);
  transition: transform 200ms ease-in-out;

  ${({ menuOpen, offset }) => {
    const rotate = !menuOpen ? 'rotate(90deg)' : '';
    const yOffset = `translateY(${offset}px)`;

    return css`
      transform: ${rotate} ${yOffset};
    `;
  }};

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
