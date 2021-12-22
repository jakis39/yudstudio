import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import styled, { css } from 'styled-components';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { DeviceWidth } from '../styles/mediaQueries';

import FullscreenIcon from '../images/fullscreen-icon.svg';
import { theme } from '../styles/theme';

export interface ResponsiveVideoContainer {
  videoUrl: string;
  fullHeight?: boolean;
  children?: any;
}

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

const ResponsiveVideoContainer = (props: ResponsiveVideoContainer) => {
  const { videoUrl, fullHeight, children } = props;
  const { width: screenWidth } = useWindowDimensions();
  const [videoWidth, setVideoWidth] = useState('100%');
  const [playing, setPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const breakpoint = fullHeight ? 675 : 1120;
    const scaleFactor = fullHeight ? '240%' : '150%';
    const w = screenWidth > breakpoint ? '100%' : scaleFactor;
    setVideoWidth(w);
  }, [screenWidth]);

  const player = useRef(null);

  const handleClickFullscreen = () => {
    setPlaying(false);
    setIsFullscreen(true);
    document.querySelector('#scrollable')?.addEventListener('wheel', preventScroll);
  };

  const handleExitFullscreen = () => {
    setPlaying(true);
    setIsFullscreen(false);
    document.querySelector('#scrollable')?.removeEventListener('wheel', preventScroll);
  };

  return (
    <>
      {isFullscreen && (
        <ModalDiv onClick={handleExitFullscreen} onScroll={preventScroll}>
          <ModalVideoContainer id="modalVideoContainer">
            <ReactPlayer
              style={{ position: 'absolute', top: 0, left: 0 }}
              url={videoUrl}
              controls={true}
              config={{
                vimeo: {
                  playerOptions: { responsive: true },
                },
              }}
              width="100%"
              height="100%"
            />
          </ModalVideoContainer>
        </ModalDiv>
      )}
      <VideoContainer fullHeight={fullHeight}>
        <ReactPlayer
          ref={player}
          style={{ position: 'absolute', top: 0, left: 0 }}
          url={videoUrl}
          controls={false}
          playing={playing}
          config={{
            vimeo: {
              playerOptions: { background: true, loop: true, responsive: true },
            },
          }}
          playsinline
          width={videoWidth}
          height="100%"
        />
        {children}
        <FullscreenButton onClick={handleClickFullscreen} aria-label="Maximize video" />
      </VideoContainer>
    </>
  );
};

export default ResponsiveVideoContainer;

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalVideoContainer = styled.div`
  position: relative;
  width: 70%;
  height: 0;
  padding-top: 40%;
  overflow: hidden;

  @media (${DeviceWidth.mediaMaxSmall}) {
    width: 90%;
    padding-top: 52%;
  }
`;

export const VideoContainer = styled.div<{ fullHeight?: boolean }>`
  position: relative;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  overflow: hidden;
  box-shadow: 0px 7px 16px 0px #0000004f;

  ${({ fullHeight }) =>
    fullHeight
      ? css`
          @media (${DeviceWidth.mediaMinMedium}) {
            padding-top: 56.25%;
          }

          @media (${DeviceWidth.mediaMaxMedium}) {
            height: 60vh;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;

            & > div > div > div {
              margin-left: -59%;
            }
          }
        `
      : css`
          @media (${DeviceWidth.mediaMinSmall}) {
            height: 600px;
            /* padding-top: 56.25%; */
          }

          @media (max-width: 1120px) {
            & > div > div > div {
              margin-left: -25%;
            }
          }

          @media (min-width: 450px) and (max-width: 750px) {
            height: unset;
            padding-top: 80%;
          }

          @media (${DeviceWidth.mediaMaxSmall}) {
            height: 34vh;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
          }
        `};
`;

const FullscreenButton = styled.button`
  position: absolute;
  bottom: 60px;
  right: 50px;
  height: 30px;
  width: 30px;
  z-index: 998;
  background: none;
  background-image: url(${FullscreenIcon});
  background-repeat: no-repeat;
  background-size: contain;
  border: none;

  @media (${DeviceWidth.mediaMaxSmall}) {
    right: ${theme.space(4)};
    bottom: ${theme.space(3)};
    height: 20px;
    width: 20px;
  }
`;
