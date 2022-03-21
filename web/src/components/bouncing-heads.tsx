import React, { useEffect } from 'react';
import MatterEnvironment, { BouncingShape } from './matter-environment';

export interface BouncingHeadsProps {
  obstacles?: Array<HTMLElement>;
}

import Circle1 from '../images/sprites/circles/YUD_Circle-01.png';
import Circle2 from '../images/sprites/circles/YUD_Circle-02.png';
import Circle3 from '../images/sprites/circles/YUD_Circle-03.png';
import Circle4 from '../images/sprites/circles/YUD_Circle-04.png';

import Pill1 from '../images/sprites/pills/YUD_Pill-01.png';
import Pill2 from '../images/sprites/pills/YUD_Pill-02.png';
import Pill3 from '../images/sprites/pills/YUD_Pill-03.png';
import Pill4 from '../images/sprites/pills/YUD_Pill-04.png';

import Rectangle1 from '../images/sprites/Rectangles/YUD_Rounded Corner-01.png';
import Rectangle2 from '../images/sprites/Rectangles/YUD_Rounded Corner-02.png';
import Rectangle3 from '../images/sprites/Rectangles/YUD_Rounded Corner-03.png';
import Rectangle4 from '../images/sprites/Rectangles/YUD_Rounded Corner-04.png';

const Circles = [Circle1, Circle2, Circle3, Circle4];
const Pills = [Pill1, Pill2, Pill3, Pill4];
const Rectangles = [Rectangle1, Rectangle2, Rectangle3, Rectangle4];

// Hardcoded dimensions of the image files :/
const ShapeAssetDimensions = {
  circle: {
    height: 477,
    width: 477,
  },
  rectangle: {
    height: 1256,
    width: 1826,
  },
  pill: {
    height: 1696,
    width: 1040,
  },
};

const bodies: BouncingShape[] = [
  {
    type: 'circle',
    sprite: {
      path: Circle1,
      height: ShapeAssetDimensions.circle.height,
      width: ShapeAssetDimensions.circle.width,
    },
  },
  {
    type: 'rectangle',
    sprite: {
      path: Rectangle2,
      height: ShapeAssetDimensions.rectangle.height,
      width: ShapeAssetDimensions.rectangle.width,
    },
  },
  {
    type: 'pill',
    sprite: {
      path: Pill3,
      height: ShapeAssetDimensions.pill.height,
      width: ShapeAssetDimensions.pill.width,
    },
  },
  {
    type: 'circle',
    sprite: {
      path: Circle4,
      height: ShapeAssetDimensions.circle.height,
      width: ShapeAssetDimensions.circle.width,
    },
  },
];

const BouncingHeads = (props: BouncingHeadsProps) => {
  const { obstacles } = props;

  return <MatterEnvironment obstacles={obstacles} bodies={bodies} />;
};

export default BouncingHeads;
