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

const detectVideoType = (url: string) => {
  if (url.includes('vimeo')) {
    return 'vimeo';
  }
  if (url.includes('youtube')) {
    return 'youtube';
  }
};

const ResponsiveVideoContainer = (props: ResponsiveVideoContainer) => {
  const { videoUrl, fullHeight, children } = props;
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [videoWidth, setVideoWidth] = useState('100%');
  const [playing, setPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoType = detectVideoType(videoUrl);
  const player = useRef(null);
  const fullscreenPlayer = useRef(null);
  const [playerCurrentTime, setPlayerCurrentTime] = useState(0);

  useEffect(() => {
    const breakpoint = fullHeight ? 675 : 1120;
    const scaleFactor = fullHeight ? '240%' : '200%';
    const w = screenWidth > breakpoint ? '100%' : scaleFactor;
    setVideoWidth(w);
  }, [screenWidth]);

  const handleClickFullscreen = () => {
    setPlaying(false);
    setIsFullscreen(true);
    setPlayerCurrentTime(player.current.getCurrentTime());
    document.querySelector('#scrollable')?.addEventListener('wheel', preventScroll);
  };

  const handleExitFullscreen = () => {
    setPlaying(true);
    setIsFullscreen(false);
    document.querySelector('#scrollable')?.removeEventListener('wheel', preventScroll);

    const currentTime = fullscreenPlayer.current.getCurrentTime();
    setPlayerCurrentTime(currentTime);
    player.current?.seekTo(currentTime);
  };

  const onFullscreenPlayerReady = () => {
    fullscreenPlayer.current?.seekTo(playerCurrentTime);
  };

  return (
    <>
      {isFullscreen && (
        <ModalDiv onClick={handleExitFullscreen}>
          <ModalVideoContainer id="modalVideoContainer">
            <ReactPlayer
              ref={fullscreenPlayer}
              style={{ position: 'absolute', top: 0, left: 0 }}
              url={videoUrl}
              controls={true}
              playing
              config={{
                vimeo: {
                  playerOptions: { responsive: true },
                },
              }}
              width="100%"
              height="100%"
              onReady={onFullscreenPlayerReady}
            />
          </ModalVideoContainer>
        </ModalDiv>
      )}
      <VideoContainer fullHeight={fullHeight} videoType={videoType}>
        <ReactPlayer
          id="video"
          ref={player}
          style={{ position: 'absolute', top: 0, left: 0 }}
          url={videoUrl}
          controls={false}
          playing={playing}
          config={{
            vimeo: {
              playerOptions: { background: true, loop: true, responsive: true },
            },
            youtube: {
              playerVars: {
                playsinline: 1,
                modestbranding: 1,
                loop: 1,
                controls: 0,
                autoplay: 1,
                mute: 1,
                showinfo: 0,
                cc_load_policy: 0,
                iv_load_policy: 3,
                disablekb: 1,
                rel: 0,
              },
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

export const VideoContainer = styled.div<{ fullHeight?: boolean; videoType: string }>`
  position: relative;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  overflow: hidden;
  box-shadow: 0px 7px 16px 0px #0000004f;
  background-color: #ccc;

  ${({ fullHeight, videoType }) =>
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
            height: 60vh;
            max-height: 830px;
          }
          ${videoType === 'youtube'
            ? css`
                & > div#video > div {
                  @media (max-width: 1120px) {
                    margin-left: -25%;
                  }
                }
              `
            : css`
                & > div#video > div > div {
                  margin-top: -13%;

                  @media (max-width: 1120px) {
                    margin-left: -50%;
                    margin-top: -35vw;
                  }

                  @media (min-width: 450px) and (max-width: 750px) {
                    margin-top: -18vw;
                  }

                  @media (min-height: 1050px) and (max-width: 1800px) {
                    margin-top: 0;
                  }
                }
              `}

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
