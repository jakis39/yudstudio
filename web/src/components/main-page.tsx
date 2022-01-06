import React from 'react';
import Container from '../components/container';
import styled from 'styled-components';
import { font } from '../styles/typography';
import { theme } from '../styles/theme';
import { DeviceWidth } from '../styles/mediaQueries';

export interface MainPageProps {
  title?: string;
  blurb?: string;
}

const MainPage = (props) => {
  const { title, blurb } = props;
  return (
    <Container wide short grow addHeaderPadding>
      <Wrapper>
        <Title>{title}</Title>
        <Blurb>{blurb}</Blurb>
      </Wrapper>
    </Container>
  );
};

export default MainPage;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 580px;

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding-top: ${theme.space(12)};
  }

  @media (${DeviceWidth.mediaMinSmall}) {
    padding-left: ${theme.space(2)};
    justify-content: flex-end;
  }
`;

const Title = styled.h1`
  ${font('title24')}
  text-transform: uppercase;
  margin: 0;
`;

const Blurb = styled.p`
  ${font('body20')};
  margin: ${theme.space(2)} 0;
  white-space: pre-wrap;

  @media (${DeviceWidth.mediaMinSmall}) {
    margin: ${theme.space(4)} 0 ${theme.space(7)};
  }
`;
