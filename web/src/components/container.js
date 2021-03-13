import React from 'react'

import styles from './container.module.css'

const Container = ({wide = false, short = false, grow = false, children}) => {
  let classes = `${styles.root}`;
  classes = wide ? `${classes} ${styles.wide}` : classes;
  classes = short ? `${classes} ${styles.short}` : classes;
  classes = grow ? `${classes} ${styles.grow}` : classes;
  return <div className={classes}>{children}</div>
}

export default Container
