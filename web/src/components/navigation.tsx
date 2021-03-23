import React from 'react';
import { cn } from '../lib/helpers';
import PillButton from './pill-button';

import { nav as navClass, hideWhenSmall, hideWhenBig } from './navigation.module.css';

export interface NavigationProps {
  hideWhen?: 'small' | 'large';
}

const Navigation = (props) => {
  const { hideWhen } = props;

  let hideClass = '';
  if (hideWhen === 'small') {
    hideClass = hideWhenSmall;
  } else if (hideWhen === 'large') {
    hideClass = hideWhenBig;
  }

  return (
    <nav className={cn(navClass, hideClass)}>
      <ul>
        <li className={hideWhenBig}>
          <PillButton to="/" variant="outlined">
            About
          </PillButton>
        </li>
        <li>
          <PillButton to="/work/" variant="outlined">
            Work
          </PillButton>
        </li>
        <li>
          <PillButton to="/shop/" variant="outlined">
            Shop
          </PillButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
