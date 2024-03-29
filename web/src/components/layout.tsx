import React from 'react';
import Container from './container';
import Header from './header';

import '../styles/global-fonts.css';
import styled from 'styled-components';
import GlobalStyle from '../styles/globalStyles';
import { theme } from '../styles/theme';
import { DeviceWidth } from '../styles/mediaQueries';
import { font } from '../styles/typography';

const footerText = '© 2021 YUD STUDIO';

export interface LayoutProps {
  children: any;
  siteTitle: string;
  contactInfo: any;
  isDark?: boolean;
}

const Layout = (props: LayoutProps) => {
  const { children, contactInfo = {}, isDark } = props;

  const { instagram, email } = contactInfo;

  return (
    <>
      <GlobalStyle />

      <PageWrapper>
        <Header isDark={isDark} />
        <Content id="pageContent">{children}</Content>

        <FooterContainer wide short row>
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
        </FooterContainer>
      </PageWrapper>
    </>
  );
};

export default Layout;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Content = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FooterContainer = styled(Container)`
  flex-shrink: 0;
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  color: ${theme.colors.gray};
  padding-bottom: 2rem;
  padding-top: 2em;

  border-top: 2px solid ${theme.palette.textColor};

  .footerText {
    flex-grow: 1;
    ${font('body18')};
    text-transform: uppercase;
  }

  address {
    display: flex;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding-top: ${theme.space(2)};
    padding-bottom: ${theme.space(3)};
    border-width: 1px;
  }
`;

const FooterLink = styled.a`
  ${font('body18')}
  font-style: normal;
  color: ${theme.palette.textColor};
  text-decoration: none;
  margin-left: ${theme.space(3)};
`;
