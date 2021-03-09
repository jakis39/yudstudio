import { Link } from 'gatsby'
import React from 'react'
import PillButton from './pill-button';

import styles from './project-pill-grid.module.css'

function ProjectPillGrid(props) {
  const { projects } = props;
  const test = new Array(3).fill('asdf');

  return (
    <ul className={styles.ul}>
      {
        test.map(() => (
          projects.map((project) => (
            <li key={project.slug.current} className={styles.li}>
              <PillButton to={`/project/${project.slug.current}`}>{project.title}</PillButton>
            </li>
          ))
        ))
      }
    </ul>
  )
}

ProjectPillGrid.defaultProps = {
  projects: []
}

export default ProjectPillGrid
