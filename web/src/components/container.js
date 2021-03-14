import React from "react";

import { root, wide as sWide, short as sShort, grow as sGrow } from "./container.module.css";

const Container = ({ wide = false, short = false, grow = false, children }) => {
  let classes = `${root}`;
  classes = wide ? `${classes} ${sWide}` : classes;
  classes = short ? `${classes} ${sShort}` : classes;
  classes = grow ? `${classes} ${sGrow}` : classes;
  return <div className={classes}>{children}</div>;
};

export default Container;
