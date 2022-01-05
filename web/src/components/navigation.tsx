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
  const toggleIconRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      toggleIconRef.current,
      {
        rotate: 180,
      },
      {
        rotate: 0,
        delay: 1,
        duration: 0.4,
        ease: 'none',
      }
    );
  }, [toggleIconRef]);

  const onMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Nav>
      <NavToggle as="button" onClick={onMenuClick} isDark={isDark}>
        <span>MENU</span>
        <NavToggleIcon menuOpen={menuOpen} ref={toggleIconRef}>
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
  --line-width: 2px;

  @media (${DeviceWidth.mediaMaxSmall}) {
    --line-width: 1px;
  }

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
          pointer-events: none;
        `}
`;

const NavLink = styled.a<{ isDark: boolean }>`
  ${font('interface20')};
  display: block;
  width: ${theme.space(30)};
  background: none;
  border: var(--line-width) solid ${theme.colors.white};
  border-radius: 50px;
  padding: ${theme.space(1.25)} ${theme.space(3)};
  cursor: pointer;

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
    padding: ${theme.space(0.75)} ${theme.space(1.5)};
  }
`;

const NavToggle = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ isDark }) =>
    css`
      ${DashLine} {
        background-color: ${isDark ? theme.colors.black : theme.colors.white};
      }
    `}
`;

const DashLine = styled.div`
  width: ${theme.space(1)};
  height: var(--line-width);
  background-color: ${theme.colors.black};
  position: absolute;
  top: calc(50% - 1px);
  left: 0;
`;

const NavToggleIcon = styled.div<{ menuOpen: boolean }>`
  height: ${theme.space(1)};
  width: ${theme.space(1)};
  position: relative;

  ${DashLine}:last-child {
    transition: all 200ms ease-in-out;
    width: var(--line-width);
    left: calc(50% - 1px);

    ${({ menuOpen }) =>
      !menuOpen
        ? css`
            height: ${theme.space(1)};
            top: 0;
          `
        : null};
  }
`;
