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
}

const Layout = (props: LayoutProps) => {
  const { children, siteTitle, contactInfo = {}, centered = false } = props;

  const { instagram, email } = contactInfo;

  return (
    <>
      <GlobalFonts />
      <GlobalStyle />

      <PageWrapper>
        <Header />
        <Content>{children}</Content>

        <Container wide short row>
          <Footer>
            <div className="footerText">{footerText}</div>
            {(email || instagram) && (
              <address>
                {email && <FooterLink href={`mailto:${email}`}>{email}</FooterLink>}
                {instagram && (
                  <FooterLink href={`https://www.instagram.com/${instagram}/`}>
                    @{instagram}
                  </FooterLink>
                )}
              </address>
            )}
          </Footer>
        </Container>
      </PageWrapper>
    </>
  );
};

export default Layout;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  @media (${DeviceWidth.mediaMaxSmall}) {
    overflow: auto;
  }
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  color: ${theme.colors.gray};
  padding-bottom: 2rem;
  padding-top: 2em;

  border-top: 2px solid ${theme.colors.black};

  .footerText {
    flex-grow: 1;
    ${font('body18')};
    text-transform: uppercase;
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
  ${font('body18')}
  font-style: normal;
  color: ${theme.colors.black};
  text-decoration: none;
  margin-left: ${theme.space(3)};
`;
