import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import Container from '../components/container';
import styled from 'styled-components';
import { DeviceWidth } from '../styles/mediaQueries';
import { theme } from '../styles/theme';
import { font } from '../styles/typography';

export const query = graphql`
  query ContactPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
  }
`;

const ContactPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();

    const formData = new FormData(e.target);

    // TODO: Validation

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Form successfully submitted');
        } else {
          throw new Error("something's bad");
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <Layout isDark>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />

      <Container wide short grow>
        <Wrapper>
          <form
            name="contact"
            netlify-honeypot="bot-field"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />

            <FormWrapper>
              <div>
                Toronto, CAN <br />
                10:00pm <br />
                whatever <br />
              </div>

              <ContactInfo>
                <StyledInput type="email" name="email" aria-label="Email" placeholder="*Email" />
                <StyledInput
                  type="text"
                  name="firstName"
                  aria-label="First Name"
                  placeholder="*First Name"
                />
                <StyledInput
                  type="text"
                  name="lastName"
                  aria-label="Last Name"
                  placeholder="*Last Name"
                />
                <StyledInput
                  type="text"
                  name="subject"
                  aria-label="Subject"
                  placeholder="Subject"
                />
              </ContactInfo>

              <MessageWrapper>
                <StyledTextarea
                  name="message"
                  placeholder="Message"
                  aria-label="Message"
                ></StyledTextarea>
                <button type="submit">Send</button>
              </MessageWrapper>
            </FormWrapper>
          </form>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default ContactPage;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding-top: ${theme.space(12)};
  }

  @media (${DeviceWidth.mediaMinSmall}) {
    padding-left: ${theme.space(2)};
    justify-content: flex-end;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  padding-bottom: ${theme.space(6)};

  > div {
    padding: 0 ${theme.space(3)};
  }

  > div:nth-child(1) {
    flex-basis: 25%;
  }
  > div:nth-child(2) {
    flex-basis: 25%;
  }
  > div:nth-child(3) {
    flex-basis: 50%;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid ${theme.colors.black};
  padding: ${theme.space(2)};
  ${font('body18')};
`;

const StyledTextarea = styled.textarea`
  ${font('body18')};
  background: none;
  border: 2px solid ${theme.colors.black};
  border-radius: 10px;
  padding: ${theme.space(2)};
  width: 100%;
  flex-grow: 1;
`;
