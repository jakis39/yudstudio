import React from 'react';
import Container from './container';
import Header from './header';

import styled, { css } from 'styled-components';
import GlobalStyle from '../styles/globalStyles';
import GlobalFonts from '../styles/globalFonts';
import { theme } from '../styles/theme';
import { DeviceWidth } from '../styles/mediaQueries';
import { font } from '../styles/typography';

const footerText = '© 2021 YUD STUDIO';

export interface LayoutProps {
  children: any;
  siteTitle: string;
  contactInfo: any;
  centered: boolean;
}

const Layout = (props: LayoutProps) => {
  const { children, siteTitle, contactInfo, centered = false } = props;

  const { instagram, email } = contactInfo;

  return (
    <>
      <GlobalFonts />
      <GlobalStyle />

      <PageWrapper>
        <Header />
        <Content>{children}</Content>

        <Footer centered={centered}>
          <Container wide short row>
            <div className="footerText">{footerText}</div>
            <FooterLink href={`mailto:${email}`}>{email}</FooterLink>
            <FooterLink href={`https://www.instagram.com/${instagram}/`}>@{instagram}</FooterLink>
          </Container>
        </Footer>
      </PageWrapper>
    </>
  );
};

export default Layout;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  background: ${theme.colors.white};
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  @media (${DeviceWidth.mediaMaxSmall}) {
    overflow: auto;
  }
`;

const Footer = styled.footer<{ centered: boolean }>`
  ${font('body3')}
  padding-bottom: 2rem;
  color: ${theme.colors.gray};

  ${({ centered }) => {
    return (
      centered &&
      css`
        text-align: center;
      `
    );
  }}

  .footerText {
    flex-grow: 1;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding-top: 1rem;
    padding-bottom: 2em;
    box-shadow: 0px -5px 5px white;
    z-index: 10;

    margin-top: 1.5rem;
  }
`;

const FooterLink = styled.a`
  ${font('body3')}
  color: ${theme.colors.black};
  text-decoration: none;
  margin-left: ${theme.space(3)};
`;
