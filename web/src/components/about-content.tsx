import React, { useEffect, useState } from 'react';
import Container from './container';
import styled from 'styled-components';
import { font } from '../styles/typography';
import { theme } from '../styles/theme';
import { DeviceWidth } from '../styles/mediaQueries';
import { useRef } from 'react';
import BouncingHeads from './bouncing-heads';

export interface AboutContentProps {
  title?: string;
  blurb?: string;
}

const AboutContent = (props: AboutContentProps) => {
  const { title, blurb } = props;
  const [titleBlock, setTitleBlock] = useState(null);
  const [textBlock, setTextBlock] = useState(null);

  return (
    <>
      <BouncingHeads obstacles={[titleBlock, textBlock]} />
      <Container wide short grow addHeaderPadding clickThrough>
        <Wrapper>
          <Title ref={(ref) => setTitleBlock(ref)}>{title}</Title>
          <div ref={(ref) => setTextBlock(ref)}>
            <Blurb>{blurb}</Blurb>
          </div>
        </Wrapper>
      </Container>
    </>
  );
};

export default AboutContent;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: start;
  max-width: 580px;
  pointer-events: none;

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding-top: ${theme.space(12)};
  }

  @media (${DeviceWidth.mediaMinSmall}) {
    padding-left: ${theme.space(2)};
    /* justify-content: flex-end; */
  }
`;

const Title = styled.h1`
  ${font('title24')}
  text-transform: uppercase;
  margin: 0;
`;

const Blurb = styled.p`
  ${font('body20')};
  margin: ${theme.space(2)} 0 ${theme.space(10)};
  white-space: pre-wrap;

  @media (${DeviceWidth.mediaMinSmall}) {
    margin: ${theme.space(4)} 0 ${theme.space(7)};
  }
`;
