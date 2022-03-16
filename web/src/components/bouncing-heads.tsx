import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRef } from 'react';
import {
  Engine,
  Render,
  World,
  Bodies,
  Runner,
  Composite,
  Composites,
  Mouse,
  MouseConstraint,
} from 'matter-js';
import useWindowDimensions from '../hooks/useWindowDimensions';

export interface BouncingHeadsProps {
  obstacles?: Array<HTMLElement>;
}

const SHAPE_BOUNCINESS = 0.6;
const GRAVITY_Y = 0.5;

const BouncingHeads = (props: BouncingHeadsProps) => {
  const { obstacles } = props;
  const scene = useRef(null);
  const { width, height } = useWindowDimensions({
    debounce: true,
  });

  function addWorldBounds(world, containerWidth, containerHeight) {
    // Add walls
    Composite.add(world, [
      Bodies.rectangle(containerWidth / 2, -25, containerWidth, 50, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
      Bodies.rectangle(-25, containerHeight / 2, 50, containerHeight, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
      Bodies.rectangle(containerWidth / 2, containerHeight + 25, containerWidth, 50, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
      Bodies.rectangle(containerWidth + 25, containerHeight / 2, 50, containerHeight, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
    ]);
  }

  function addDOMObstacle(world, element: HTMLElement) {
    if (!element) {
      return;
    }
    const elementRect = element.getBoundingClientRect(),
      elementWidth = element.offsetWidth,
      elementHeight = element.offsetHeight;

    Composite.add(world, [
      Bodies.rectangle(
        elementRect.x + elementWidth / 2,
        elementRect.y + elementHeight / 2,
        elementWidth,
        elementHeight,
        {
          isStatic: true,
          render: { fillStyle: 'transparent' },
        }
      ),
    ]);
  }

  useEffect(() => {
    console.log('Setting up', obstacles);

    let containerWidth = document.body.clientWidth;
    let containerHeight = document.body.clientHeight;

    if (scene.current) {
      containerWidth = scene.current.clientWidth;
      containerHeight = scene.current.clientHeight;
    }

    const shapeSize = Math.min(containerWidth, containerHeight) / 4;

    // create engine
    var engine = Engine.create(),
      world = engine.world;

    engine.gravity.y = GRAVITY_Y;

    // create renderer
    var render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        // showAngleIndicator: true,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window?.devicePixelRatio,
      },
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    addWorldBounds(world, containerWidth, containerHeight);

    // Add DOM obstacles
    obstacles?.forEach((obstacle) => addDOMObstacle(world, obstacle));

    // Add bodies
    var stack = Composites.stack(
      containerWidth / 3,
      0,
      2,
      2,
      20,
      20,
      function (x, y, column, row, lastBody, i) {
        if (i === 1 || i === 2) {
          // TODO improve this if check
          return Bodies.rectangle(x, y, shapeSize, shapeSize, {
            restitution: SHAPE_BOUNCINESS,
            chamfer: { radius: 10 },
            render: {
              fillStyle: 'grey',
              sprite: {
                texture: 'https://i.redd.it/u99ffh875efy.png',
                xScale: shapeSize / 256,
                yScale: shapeSize / 256,
              },
            },
          });
        } else {
          return Bodies.circle(x, y, shapeSize / 2, {
            restitution: SHAPE_BOUNCINESS,
            render: {
              fillStyle: 'grey',
              strokeStyle: '#000000',
              sprite: {
                texture:
                  // 'https://habrastorage.org/getpro/habr/post_images/f1a/820/d43/f1a820d4350d4d647cd295fde1b253f2.png',
                  'https://i.pinimg.com/originals/cb/7d/48/cb7d48c589412612f5fd4a554e36a325.png',
                xScale: shapeSize / 1000, //256,
                yScale: shapeSize / 1000, //256,
              },
            },
          });
        }
      }
    );

    Composite.add(world, stack);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        // constraint: {
        //   stiffness: 0.2,
        //   render: {
        //     visible: false,
        //   },
        // },
      });
    mouse.pixelRatio = window.devicePixelRatio;
    mouseConstraint.constraint.render.visible = false;
    mouseConstraint.constraint.stiffness = 0.2;
    // mouseConstraint.constraint.damping = 1;

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: containerWidth, y: containerHeight },
    });

    // unmount
    return () => {
      console.log('teardown');
      // destroy Matter
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, [obstacles, width, height]);

  return <MatterContainer ref={scene}></MatterContainer>;
};

export default BouncingHeads;

const MatterContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;
