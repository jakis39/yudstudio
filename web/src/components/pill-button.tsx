import { Link } from 'gatsby'
import React from 'react'

import styles from './pill-button.module.css'

// export enum PillButtonType {
//     A = 'a',
//     Button = 'button',
//     Link = 'Link'
// }

export interface PillButtonProps {
    to: string;
    // component: PillButtonType;
    onClick?: () => void;
    children: any;
}

const PillButton = (props: PillButtonProps) => {
  const { to, onClick, children } = props;

  return <Link className={styles.root} to={to}>{children}</Link>
  
//   switch(component) {
//     case 'Link':
//         return <Link to={to}>{children}</Link>
//     case 'a':
//         return <a href={to}>{children}</a>
//     case 'button':
//         return <button onClick={onClick}>{children}</button>
//   }
}

PillButton.defaultProps = {
  projects: []
}

export default PillButton
