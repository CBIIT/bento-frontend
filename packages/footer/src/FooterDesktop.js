import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  footerStyled: {
    letterSpacing: 'normal',
    fontSize: '16px',
    lineHeight: 1.5,
    backgroundColor: '#1B496E',
    borderTop: '1px solid #6C727B',
    bottom: 0,
    width: '100%',
    zIndex: 10,
    position: 'relative',
  },
  footerContainer: {
    padding: '2rem',
    maxWidth: '1400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },

  footerLinksContainer: {
    width: '66.7%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 33%)',
  },
  footItem: {
    marginBottom: '24px',
  },
  footItemTitle: {
    fontFamily: 'Open Sans',
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '22px',
    marginBottom: '10px',
  },
  footItemSubtitle: {
    marginBottom: '10px',
    maxWidth: '290px',
    fontFamily: 'Open Sans',
    color: '#FFFFFF',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
  },
  footItemLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  footerEmailSignupContainer: {
    width: '33.3%',
  },
  signUpTitle: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '22.88px',
    lineHeight: '34px',
    color: '#FFFFFF',
    marginBottom: '1rem',
  },
  enterTitle: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    color: '#FFFFFF',
    marginBottom: '10px',
  },
  signUpInputBox: {
    width: '100%',
    height: '47px',
    fontSize: '25px',
    paddingLeft: '8px',
    marginTop: '4px',
    '&:focus': {
      outline: '0.25rem solid #2491ff',
    },
  },
  signUpButton: {
    background: '#FACE00',
    borderRadius: '8px',
    border: 0,
    padding: '9px 16px',
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '22px',
    color: '#14315C',
    marginTop: '18px',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  bottomFooter: {
    letterSpacing: 'normal',
    fontSize: '16px',
    lineHeight: 1.5,
    background: '#14315C',
    '& span': {
      display: 'block',
    },
  },
  bottomFooterContainer: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'space-between',
    maxWidth: '1400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 'fit-content',
    paddingTop: '1.25rem',
    paddingBottom: '1.25rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  break: {
    order: 2,
    width: '100%',
    flexBasis: '100%',
    height: '2rem',
    margin: 0,
    border: 0,
  },
  logoText: {
    textDecoration: 'none',
  },
  logoUpperText: {
    fontFamily: 'poppins',
    fontWeight: 700,
    fontSize: '24.96px',
    lineHeight: '37px',
    color: '#FFFFFF',
  },
  logoLowerText: {
    fontFamily: 'poppins',
    fontWeight: 400,
    fontSize: '18.72px',
    color: '#FFFFFF',
  },
  bottomFooterContactUs: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '22.88px',
    lineHeight: '34px',
    textAlign: 'right',
    color: '#FFFFFF',
    order: 1,
  },
  bottomFooterContactLinks: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    color: '#FFFFFF',
    marginTop: '0.25rem',
    '& a': {
      textDecoration: 'none',
      color: '#FFFFFF',
      marginLeft: '1rem',
    },
  },
  bottomFooterFollowUs: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '22.88px',
    lineHeight: '34px',
    color: '#FFFFFF',
    order: 3,
  },
  bottomFooterFollowUsLinks: {
    marginTop: '1rem',
  },
  bottomFooterSocialMediaImgs: {
    marginLeft: '10px',
  },
  bottomFooterGovLinks: {
    order: 4,
    '& a': {
      textDecoration: 'none',
      display: 'block',
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 1.6,
      textAlign: 'right',
      color: '#FFFFFF',
    },
  },
});

const FooterDesktop = ({ classes, data, handleExternalLinkClick }) => {
  const [emailContent, setEmailContent] = useState('');
  const emailForm = useRef(null);
  const emailInput = useRef(null);
  function validateEmail(email) {
    const reg = /^[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
    return reg.test(email);
  }

  const handleSubmit = (e) => {
    emailForm.current.reportValidity();
    if (!validateEmail(emailContent)) {
      emailInput.current.setCustomValidity('Please enter valid email');
      e.preventDefault();
    } else {
      emailInput.current.setCustomValidity('');
    }
  };

  const handleChange = (e) => {
    setEmailContent(e.target.value);
  };

  return (
    <>
      <div className={classes.footerStyled} role="contentinfo">
        <div className={classes.footerContainer}>
          <div className={classes.footerLinksContainer}>
            {data.link_sections && data.link_sections.map((linkItem) => (
              <div className={classes.footItem} key={`link_${linkItem.title}`}>
                <div className={classes.footItemTitle}>{linkItem.title}</div>
                {linkItem.items && linkItem.items.map((item) => {
                  if (!item) return null;
                  if (typeof item.link !== 'string') {
                    return (
                      <div className={classes.footItemSubtitle} key={item.text}>
                        {item.text}
                      </div>
                    );
                  }

                  return (
                    <div className={classes.footItemSubtitle} key={item.text}>
                      {item.link.includes('http') ? (
                        <a
                          className={classes.footItemLink}
                          href={item.link}
                          onClick={(e) => handleExternalLinkClick(e, item.link)}
                          rel="noopener noreferrer"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <a className={classes.footItemLink} href={item.link}>
                          {item.text}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            ref={emailForm}
            action="https://public.govdelivery.com/accounts/USNIHNCI/subscribers/qualify"
            method="post"
            target="_blank"
            id="signup"
            noValidate
            className={classes.footerEmailSignupContainer}
          >
            <input
              type="hidden"
              name="topic_id"
              id="topic_id"
              value="USNIHNCI_255"
            />
            <div className={classes.signUpTitle}>{data.signUpTitle}</div>
            <div className={classes.enterTitle}>
              <label htmlFor="email">
                {data.signUpEnterTitle}
                <input
                  ref={emailInput}
                  id="email"
                  type="email"
                  name="email"
                  className={classes.signUpInputBox}
                  value={emailContent}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit" className={classes.signUpButton}>
              {data.signUpButtonLabel}
            </button>
          </form>
        </div>
      </div>

      <div className={classes.bottomFooter}>
        <div className={classes.bottomFooterContainer}>
          <div id="bottom-footer-header">
            <a
              className={classes.logoText}
              href="https://www.cancer.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={classes.logoUpperText}>National Cancer Institute</div>
              <div className={classes.logoLowerText}>
                at the National Institutes of Health
              </div>
            </a>
          </div>
          <div className={classes.bottomFooterContactUs} id="bottom-footer-contact-us">
            Contact Us
            <div
              className={classes.bottomFooterContactLinks}
              id="bottom-footer-contact-links"
            >
              {data.contact_links && data.contact_links.map((contactItem, contactidx) => {
                const contactkey = `contact_${contactidx}`;
                return contactItem.link.includes('http') ? (
                  <a
                    key={contactkey}
                    href={contactItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactItem.text}
                  </a>
                ) : (
                  <a key={contactkey} href={contactItem.link}>
                    {contactItem.text}
                  </a>
                );
              })}
            </div>
          </div>
          <hr className={classes.break} />
          <div className={classes.bottomFooterFollowUs} id="bottom-footer-follow-us">
            Follow Us
            <div
              className={classes.bottomFooterFollowUsLinks}
              id="bottom-footer-follow-us-links"
            >
              {data.followUs_links && data.followUs_links.map((followItem, followidx) => {
                const followkey = `follow_${followidx}`;
                return (
                  <a
                    key={followkey}
                    className={
                      followidx !== 0
                        ? classes.bottomFooterSocialMediaImgs
                        : undefined
                    }
                    href={followItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={followItem.img} alt={followItem.description} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className={classes.bottomFooterGovLinks} id="bottom-footer-gov-links">
            {data.global_footer_links && data.global_footer_links.map((linkItem, idx) => {
              const linkitemkey = `linkitem_${idx}`;
              return (
                <a
                  key={linkitemkey}
                  href={linkItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkItem.text}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(FooterDesktop);
