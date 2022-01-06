import React from 'react';
import styled, { css } from 'styled-components';
import { DeviceWidth } from '../styles/mediaQueries';
import { theme } from '../styles/theme';

export interface ContainerProps {
  wide?: boolean;
  short?: boolean;
  grow?: boolean;
  row?: boolean;
  addHeaderPadding?: boolean;
  children: any;
}

const Container = (props: ContainerProps) => {
  const { children, ...rest } = props;
  return <Cntnr {...rest}>{children}</Cntnr>;
};

export default Container;

const Cntnr = styled.div<Omit<ContainerProps, 'children'>>`
  box-sizing: border-box;
  max-width: 960px;
  padding: 1.5em;
  margin: 0 auto;
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};

  @media (${DeviceWidth.mediaMinSmall}) {
    padding: 2em;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    overflow: auto;
  }

  ${({ wide }) =>
    wide &&
    css`
      max-width: unset;
      width: 100%;

      @media (${DeviceWidth.mediaMinSmall}) {
        padding: 3rem;
      }

      @media (${DeviceWidth.mediaMaxSmall}) {
        padding: 1.6rem;
      }
    `}

  ${({ short }) =>
    short &&
    css`
      padding-top: 0;
      padding-bottom: 0;

      @media (${DeviceWidth.mediaMinSmall}) {
        padding-top: 0;
        padding-bottom: 0;
      }

      @media (${DeviceWidth.mediaMaxSmall}) {
        padding-top: 0;
        padding-bottom: 0;
      }
    `}

    ${({ grow }) =>
    grow &&
    css`
      flex-grow: 1;
      position: relative;
    `}
    
    ${({ addHeaderPadding }) =>
    addHeaderPadding &&
    css`
      @media (${DeviceWidth.mediaMaxSmall}) {
        padding-top: ${theme.space(12)};
      }

      @media (${DeviceWidth.mediaMinSmall}) {
        justify-content: flex-end;
        padding-top: ${theme.space(18)};
      }
    `}
`;
