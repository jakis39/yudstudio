import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

export interface VideoGridProps {
  urls: any[];
}

const VideoGrid = (props: VideoGridProps) => {
  const { urls } = props;

  return (
    <>
      {urls.map((url, index) => (
        <VideoContainer key={url}>
          <ReactPlayer
            id={`video-${index}`}
            style={{ position: 'absolute', top: 0, left: 0 }}
            url={url}
            controls={true}
            config={{
              vimeo: {
                playerOptions: { responsive: true },
              },
            }}
            playsinline
            width="100%"
            height="100%"
          />
        </VideoContainer>
      ))}
    </>
  );
};

export default VideoGrid;

const VideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #ccc;
  padding-top: 56.25%;
`;
