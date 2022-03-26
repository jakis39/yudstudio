import React, { useEffect, useState } from 'react';
import MatterEnvironment, { BouncingShape, ShapeType, ShapeTypes } from './matter-environment';

import Circle1 from '../images/sprites/circles/YUD_Circle-01.png';
import Circle2 from '../images/sprites/circles/YUD_Circle-02.png';
import Circle3 from '../images/sprites/circles/YUD_Circle-03.png';
import Circle4 from '../images/sprites/circles/YUD_Circle-04.png';

import Pill1 from '../images/sprites/pills/YUD_Pill-01.png';
import Pill2 from '../images/sprites/pills/YUD_Pill-02.png';
import Pill3 from '../images/sprites/pills/YUD_Pill-03.png';
import Pill4 from '../images/sprites/pills/YUD_Pill-04.png';

import Rectangle1 from '../images/sprites/rectangles/YUD_Rounded-Corner-01.png';
import Rectangle2 from '../images/sprites/rectangles/YUD_Rounded-Corner-02.png';
import Rectangle3 from '../images/sprites/rectangles/YUD_Rounded-Corner-03.png';
import Rectangle4 from '../images/sprites/rectangles/YUD_Rounded-Corner-04.png';

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

const ShapeData = {
  circle: {
    spritePaths: Circles,
    dimensions: ShapeAssetDimensions.circle,
  },
  rectangle: {
    spritePaths: Rectangles,
    dimensions: ShapeAssetDimensions.rectangle,
  },
  pill: {
    spritePaths: Pills,
    dimensions: ShapeAssetDimensions.pill,
  },
};

const NUMBER_TEAM_MEMBERS = 4;

export interface BouncingHeadsProps {
  obstacles?: Array<HTMLElement>;
}

const BouncingHeads = (props: BouncingHeadsProps) => {
  const { obstacles } = props;
  const [bodies, setBodies] = useState([]);

  // Randomly populate shapes
  function populateBodies() {
    const newBodies: BouncingShape[] = [];
    let shapeTypeIndex = Math.floor(Math.random() * ShapeTypes.length);

    for (let i = 0; i < NUMBER_TEAM_MEMBERS; i++) {
      const shapeType = ShapeTypes[shapeTypeIndex];
      newBodies.push({
        type: shapeType as ShapeType,
        sprite: {
          path: ShapeData[shapeType].spritePaths[i],
          height: ShapeData[shapeType].dimensions.height,
          width: ShapeData[shapeType].dimensions.width,
        },
      });

      // Iterate through shape types so that each type appears at least once
      shapeTypeIndex++;
      if (shapeTypeIndex >= ShapeTypes.length) {
        shapeTypeIndex = 0;
      }
    }
    setBodies(newBodies);
  }

  useEffect(() => {
    populateBodies();
  }, []);

  return <MatterEnvironment obstacles={obstacles} bodies={bodies} />;
};

export default BouncingHeads;
