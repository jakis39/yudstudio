import React, { useState } from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/graphql-error-list';
import styled, { css } from 'styled-components';
import Clock from 'react-live-clock';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import Container from '../components/container';
import { DeviceWidth } from '../styles/mediaQueries';
import { theme } from '../styles/theme';
import { font } from '../styles/typography';

export const query = graphql`
  query ContactPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      contactInfo {
        email
        phone
      }
    }
  }
`;

const ContactPage = (props) => {
  const { data, errors } = props;
  const site = (data || {}).site;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const contactEmail = site?.contactInfo?.email;
  const contactPhone = site?.contactInfo?.phone;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmissionError(false);
    setStatusMessage('');

    const form = e.target;
    const formData = new FormData(form);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!firstName || !lastName || !email || !message) {
      setIsSubmitting(false);
      setSubmissionError(true);
      setStatusMessage('Missing required fields');
      return;
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Contact form successfully submitted');
          form.reset();
          setStatusMessage('Thanks for getting in touch!');
        } else {
          throw new Error('Contact form submission error!');
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
        setSubmissionError(true);
        setStatusMessage("Something's wrong! Please try again later");
      });
  }

  return (
    <Layout isDark>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />

      <Container wide short grow addHeaderPadding>
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
                <LocationText>Toronto, CAN</LocationText>
                <LocationText>
                  <Clock format={'hh:mm:ss a'} ticking={true} timezone={'America/Toronto'} />
                </LocationText>
                <ContactText>
                  {contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
                  <br />
                  {contactPhone && <a href={`tel:${contactPhone}`}>{contactPhone}</a>}
                </ContactText>
              </div>

              <ContactInfo>
                <StyledInput
                  type="email"
                  name="email"
                  aria-label="Email"
                  placeholder="*Email"
                  required
                />
                <StyledInput
                  type="text"
                  name="firstName"
                  aria-label="First Name"
                  placeholder="*First Name"
                  required
                />
                <StyledInput
                  type="text"
                  name="lastName"
                  aria-label="Last Name"
                  placeholder="*Last Name"
                  required
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
                  required
                ></StyledTextarea>
                <div>
                  <StatusMessage error={submissionError}>{statusMessage}</StatusMessage>
                  <SendButton type="submit" disabled={isSubmitting}>
                    Send
                  </SendButton>
                </div>
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
`;

const FormWrapper = styled.div`
  display: flex;
  padding-bottom: ${theme.space(6)};

  @media (${DeviceWidth.mediaMinMedium}) {
    > div {
      padding: 0 ${theme.space(3)};
    }
    > div:nth-child(1) {
      flex-basis: 20%;
    }
    > div:nth-child(2) {
      flex-grow: 1;
    }
    > div:nth-child(3) {
      flex-basis: 50%;
    }
  }

  @media (${DeviceWidth.mediaMaxLarge}) {
    flex-direction: column;

    > div {
      padding: ${theme.space(3)} 0 0;
    }
  }
`;

const LocationText = styled.div`
  ${font('title24')};
`;

const ContactText = styled.div`
  ${font('body20')};
  margin-top: ${theme.space(2)};

  a {
    color: ${theme.colors.black};
    text-decoration: none;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    align-items: center;
    margin-top: ${theme.space(2)};
  }
`;

const StyledInput = styled.input`
  ${font('interface18')};
  background: none;
  border: none;
  border-bottom: 2px solid ${theme.colors.black};
  padding: ${theme.space(2)};

  @media (${DeviceWidth.mediaMaxSmall}) {
    border-width: 1px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;

  > ${StyledInput}:not(:first-child) {
    margin-top: ${theme.space(1)};
  }
`;

const StyledTextarea = styled.textarea`
  ${font('interface18')};
  background: none;
  border: 2px solid ${theme.colors.black};
  border-radius: 10px;
  padding: ${theme.space(2)};
  width: 100%;
  flex-grow: 1;
  resize: vertical;
  max-height: 500px;

  @media (${DeviceWidth.mediaMaxLarge}) {
    min-height: 200px;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    border-width: 1px;
  }
`;

const StatusMessage = styled.div<{ error?: boolean }>`
  ${font('body18')};
  flex-grow: 1;

  ${({ error }) => css`
    color: ${error ? '#ee5253' : '#1dd1a1'};
  `}
`;

const SendButton = styled.button`
  ${font('interface20')};
  display: block;
  background: none;
  border: 2px solid ${theme.colors.black};
  border-radius: 50px;
  padding: ${theme.space(1.25)} ${theme.space(3)};
  cursor: pointer;

  @media (hover: hover) {
    opacity: 80%;

    &:hover {
      opacity: 100%;
    }
  }

  &:disabled {
    opacity: 30%;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    border-width: 1px;
    padding: ${theme.space(0.75)} ${theme.space(1.5)};
  }
`;
