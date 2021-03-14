import React from "react";
import PillButton from "./pill-button";

import styles from "./project-pill-grid.module.css";

function ProjectPillGrid(props) {
  const { projects } = props;

  return (
    <ul className={styles.ul}>
      {projects.map((project) => (
        <li key={project.slug.current} className={styles.li}>
          <PillButton to={`/work/${project.slug.current}`}>{project.title}</PillButton>
        </li>
      ))}
    </ul>
  );
}

ProjectPillGrid.defaultProps = {
  projects: [],
};

export default ProjectPillGrid;
