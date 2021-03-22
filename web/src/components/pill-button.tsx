import { Link } from 'gatsby';
import React from 'react';

import * as styles from './pill-button.module.css';

export interface PillButtonProps {
  to: string;
  variant?: 'standard' | 'outlined';
  children: any;
}

const PillButton = (props: PillButtonProps) => {
  const { to, variant = 'standard', children } = props;

  return (
    <Link className={`${styles.root} ${styles[variant]}`} to={to}>
      {children}
    </Link>
  );
};

PillButton.defaultProps = {
  projects: [],
};

export default PillButton;
