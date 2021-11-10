import React from 'react';
import { cn } from '../lib/helpers';
import PillButton from './pill-button';

import styled, { css } from 'styled-components';
import { DeviceWidth } from '../styles/mediaQueries';

export interface NavigationProps {
  hideWhen?: 'small' | 'large';
}

const Navigation = (props) => {
  const { hideWhen } = props;

  // let hideClass = '';
  // if (hideWhen === 'small') {
  //   hideClass = hideWhenSmall;
  // } else if (hideWhen === 'large') {
  //   hideClass = hideWhenBig;
  // }

  return (
    <Nav>
      <ul>
        <li>
          <PillButton to="/" variant="outlined">
            About
          </PillButton>
        </li>
        <li>
          <PillButton to="/work/" variant="outlined">
            Work
          </PillButton>
        </li>
        {/* <li>
          <PillButton to="/shop/" variant="outlined">
            Shop
          </PillButton>
        </li> */}
      </ul>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.div<{ hideWhen?: string }>`
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    ul {
      justify-content: space-between;
    }
  }

  @media (${DeviceWidth.mediaMinSmall}) {
    display: block;
    flex-grow: 1;

    ul {
      justify-content: flex-end;
    }

    ul li:not(:last-child) {
      margin-right: 3rem;
    }
  }

  @media (--media-min-large) {
    ul li:not(:last-child) {
      margin-right: 14rem;
    }
  }

  ${({ hideWhen }) => {
    if (hideWhen === 'small') {
      return css`
        @media (${DeviceWidth.mediaMaxSmall}) {
          display: none;
        }
      `;
    } else if (hideWhen === 'large') {
      return css`
        @media (${DeviceWidth.mediaMinSmall}) {
          display: none;
        }
      `;
    }
    return '';
  }}
`;
