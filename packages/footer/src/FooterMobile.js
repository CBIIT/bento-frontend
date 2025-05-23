import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  footerStyled: {
    letterSpacing: 'normal',
    fontSize: '16px',
    lineHeight: 1.5,
    backgroundColor: '#1B496E',
    bottom: 0,
    width: '100%',
    zIndex: 10,
    position: 'relative',
  },
  footerContainer: {
    maxWidth: '1420px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  footerEmailSignupContainer: {
    padding: '1rem 1rem 2rem 1rem',
    '& .signUpTitle': {
      fontFamily: 'poppins',
      fontWeight: 700,
      fontSize: '22.88px',
      lineHeight: '34px',
      color: '#FFFFFF',
      marginBottom: '1rem',
    },
    '& .enterTitle': {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '22px',
      color: '#FFFFFF',
      marginBottom: '10px',
    },
    '& .signUpInputBox': {
      width: '100%',
      height: '47px',
      fontSize: '25px',
      paddingLeft: '8px',
      marginTop: '4px',
      '&:focus': {
        outline: '0.25rem solid #2491ff',
      },
    },
    '& .signUpButton': {
      width: '100%',
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
  },
  footerLinksContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& .footItem': {
      width: '253px',
    },
    '& .footItemTitle': {
      fontFamily: 'Open Sans',
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '22px',
      marginBottom: '10px',
    },
    '& .footItemSubtitle': {
      marginBottom: '10px',
      maxWidth: '290px',
    },
    '& .footItemLink': {
      fontFamily: 'Open Sans',
      color: '#FFFFFF',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '22px',
      textDecoration: 'none',
      '& a:hover': {
        textDecoration: 'underline',
      },
    },
    '& .dropbtn': {
      display: 'flex',
      flexDirection: 'row',
      verticalAlign: 'middle',
      textAlign: 'left',
      backgroundColor: '#1B496E',
      width: '100%',
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '20px',
      color: '#FFFFFF',
      padding: '1rem 0.5rem',
      border: 'none',
      cursor: 'pointer',
    },
    '& .dropdown': {
      position: 'relative',
      display: 'inline-block',
      borderBottom: '1px solid black',
    },
    '& .dropdown-content': {
      display: 'none',
      zIndex: 1,
    },
    '& .dropdown-content a, & .dropdown-content span': {
      color: 'white',
      padding: '0 0 1rem 1rem',
      textDecoration: 'none',
      display: 'block',
      width: 'fit-content',
    },
    '& .show': {
      display: 'block',
    },
    '& .arrow': {
      marginRight: '0.25rem',
    },
    '& .rotate': {
      transform: 'rotate(90deg)',
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
    '& .bottom-footer-container': {
      display: 'flex',
      flexFlow: 'wrap',
      flexDirection: 'column',
      justifyContent: 'space-between',
      maxWidth: '1420px',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: 'fit-content',
      paddingTop: '1.25rem',
      paddingBottom: '1.25rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
    '& .break': {
      order: 2,
      width: '100%',
      flexBasis: '100%',
      height: '2rem',
      margin: 0,
      border: 0,
      display: 'none',
    },
    '& .logoText': {
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    },
    '& .logoUpperText': {
      fontFamily: 'poppins',
      fontWeight: 700,
      fontSize: '24.96px',
      lineHeight: '37px',
      color: '#FFFFFF',
    },
    '& .logoLowerText': {
      fontFamily: 'poppins',
      fontWeight: 400,
      fontSize: '18.72px',
      color: '#FFFFFF',
    },
    '& #bottom-footer-contact-us': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '22.88px',
      lineHeight: '34px',
      textAlign: 'left',
      color: '#FFFFFF',
      order: 1,
      marginTop: '1.5rem',
    },
    '& #bottom-footer-contact-links': {
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#FFFFFF',
      marginTop: '0.25rem',
      '& a': {
        textDecoration: 'none',
        color: '#FFFFFF',
        display: 'block',
        marginLeft: '0px',
        marginRight: '10px',
        lineBreak: 'anywhere',
      },
    },
    '& #bottom-footer-follow-us': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '22.88px',
      lineHeight: '34px',
      color: '#FFFFFF',
      order: 3,
      marginTop: '1rem',
    },
    '& #bottom-footer-follow-us-links': {
      marginTop: '0.75rem',
    },
    '& .bottom-footer-social-media-imgs': {
      marginLeft: '10px',
    },
    '& #bottom-footer-gov-links': {
      order: 4,
      marginRight: '0px',
      marginTop: '0.75rem',
      '& a': {
        textDecoration: 'none',
        display: 'block',
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '1.6',
        textAlign: 'left',
        color: '#FFFFFF',
      },
    },
  },
});

const FooterMobile = ({ classes, data, handleExternalLinkClick }) => {
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

  const handleDropdown = (param) => {
    document.getElementById(`${param}Dropdown`).classList.toggle('show');
    document.getElementById(`${param}Arrow`).classList.toggle('rotate');
  };

  return (
    <>
      <footer className={classes.footerStyled} role="contentinfo">
        <div className={classes.footerContainer}>
          <div className={classes.footerLinksContainer}>
            {data.link_sections && data.link_sections.map((linkItem) => {
              const linkKey = `link_${linkItem.title}`;
              return (
                <div className="dropdown" key={linkKey}>
                  <button
                    type="button"
                    onClick={() => handleDropdown(linkKey)}
                    className="dropbtn"
                  >
                    <svg
                      id={`${linkKey}Arrow`}
                      className="arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                      />
                    </svg>
                    {linkItem.title}
                  </button>
                  <div id={`${linkKey}Dropdown`} className="dropdown-content">
                    {linkItem.items.map((item) => {
                      if (!item) {
                        return null;
                      }

                      const itemKey = `item_${item.text}`;
                      if (typeof item.link !== 'string') {
                        return (
                          <span className="footItemLink" key={itemKey}>
                            {item.text}
                          </span>
                        );
                      }

                      return item.link.includes('http') || item.link.includes('mailto') ? (
                        <a
                          className="footItemLink"
                          key={itemKey}
                          href={item.link}
                          onClick={(e) => !item.link.includes('mailto') && handleExternalLinkClick(e, item.link)}
                          rel="noopener noreferrer"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <Link
                          className="footItemLink"
                          key={itemKey}
                          to={item.link}
                        >
                          {item.text}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
            <div className="signUpTitle">Sign up for email updates</div>
            <div className="enterTitle">
              <label htmlFor="email">
                Sign up for the newsletter
                <input
                  ref={emailInput}
                  id="email"
                  type="email"
                  name="email"
                  className="signUpInputBox"
                  value={emailContent}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit" className="signUpButton">
              Sign up
            </button>
          </form>
        </div>
      </footer>
      <div className={classes.bottomFooter}>
        <div className="bottom-footer-container">
          <div id="bottom-footer-header">
            <a
              className="logoText"
              href="https://www.cancer.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="logoUpperText">National Cancer Institute</div>
              <div className="logoLowerText">
                at the National Institutes of Health
              </div>
            </a>
          </div>
          <div id="bottom-footer-contact-us">
            Contact Us
            <div id="bottom-footer-contact-links">
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
          <div className="break" />
          <div id="bottom-footer-follow-us">
            Follow Us
            <div id="bottom-footer-follow-us-links">
              {data.followUs_links && data.followUs_links.map((followItem, followidx) => {
                const followkey = `follow_${followidx}`;
                return (
                  <a
                    key={followkey}
                    className={
                      followidx !== 0 ? 'bottom-footer-social-media-imgs' : ''
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
          <div id="bottom-footer-gov-links">
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

export default withStyles(styles)(FooterMobile);
