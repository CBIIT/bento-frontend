import React from 'react';
import {
  Button, Divider,
  withStyles,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import ReactMarkdown from 'react-markdown';
import { RouteLinks, cn } from '@bento-core/util';

const footerTextStyle = {
  color: 'white',
  marginLeft: 16,
  marginRight: 16,
  fontWeight: 400,
  fontSize: '14px',
  fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
  lineHeight: '1.71',
  whiteSpace: 'nowrap',
  '@media (max-width: 600px)': {
    fontSize: 12,
  },
};

const styles = () => ({
  ext: {
    color: 'white',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  extraPadding: {
    marginTop: '10px',
    '@media (max-width: 600px)': {
      marginTop: '0px',
    },
  },
  footerText: {
    ...footerTextStyle,
  },
  container: {
    top: '20%',
    left: '30%',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    position: 'absolute',
    width: '832px',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  modalFooter: {
    borderTop: '1px solid #E2E2E2',
    height: '70px',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    paddingRight: '19px',
  },
  paper: {
    height: '443px',
    overflowY: 'auto',
    padding: '15px',
  },
  modalText: {
    ...footerTextStyle,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  modalFooterBtn: {
    backgroundColor: '#337AB7',
    color: '#FFF',
  },
  nciLinks: {
    display: 'flex',
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      marginLeft: '20px',
    },
  },
  listHeader: {
    paddingBottom: '4px',
    fontWeight: 600,
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
  },
  footerRoot: (props) => ({
    background: props.background,
  }),
  footerComponent: (props) => (
    {
      lineHeight: '1.42857143',
      maxWidth: '1800px',
      margin: '0 auto',
      '-webkit-font-smoothing': 'antialiased',
      color: 'white',
      padding: props.styles && props.styles.padding ? props.styles.padding : '24px 45px 45px 45px',
      '& ul': {
        listStyle: 'none',
        margin: '0',
        padding: '0',
      },

      '& li': {
        lineHeight: '2.17',
      },

      /* Style a button like a link for accessibility */
      '& button': {
        background: 'none!important',
        color: 'inherit',
        border: 'none',
        padding: '0!important',
        font: 'inherit',
        cursor: 'pointer',
      },

      '& a, & button': {
        color: 'white',
        textDecoration: 'none',

        '&:hover': {
          cursor: 'pointer',
          textDecoration: 'underline',
        },
      },
    }
  ),
  footerRow: {
    display: 'flex',
    flexDirection: 'column',
    // width: '1200px',
    margin: '0 auto',

    '@media (min-width: 900px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  footerRowSection: {
    marginTop: '16px',
    '@media (max-width: 900px)': {
      margin: '16px',
      marginTop: '45px',
    },
  },
  turningNIH: {
    fontSize: '14px',
    color: 'white',
    textDecoration: 'none',
  },
  footorVersiontext: {
    fontSize: '8px',
    color: 'white',
    textDecoration: 'none',
  },
  socialIcon: {
    width: '20px',
    height: '20px',
    marginLeft: 16,
  },
  footerNciColumn: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '30px',
    '@media (min-width: 600px)': {
      width: '200px',
    },

    '@media (min-width: 960px)': {
      width: '300px',
    },

    '& .nciBadge': {
      border: '0',
      height: '40px',
    },
  },

  footerBar: {
    color: 'white',
    backgroundColor: '#4F536B',
    width: '100%',
    textAlign: 'center',
    '-webkit-font-smoothing': 'antialiased',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '14px',
    marginTop: '48px',
  },
  contentJustifyCenter: {
    justifyContent: 'center',
  },
  contentJustifyLeft: {
    justifyContent: 'left',
  },
  horizontalLine: {
    width: '100%',
    margin: '32px auto 16px auto',
  },
  marginRight40: {
    marginRight: '40px',
  },
  footerLogoText: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: '25px',
    letterSpacing: '-0.5px',
  },
  footerLogoSubText: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '5px',
    letterSpacing: '-0.5px',
  },
  nciLogo: {
    '@media (min-width: 960px)': {
      width: 'calc((100vw)/4)',
    },
    marginBottom: '10px',
  },
});

const Footer = ({ classes, data }) => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  //* * set placement of system info display*/
  const systemInfoList = data.link_sections.filter((item) => item.systemInfoInLinkSection);

  const handleModalOpen = (itemContent) => {
    itemContent.then((res) => { setContent(res); });
    // console.log('itemContent', itemContent);
    // setContent(itemContent);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.footerRoot}>
      <div className={classes.footerComponent}>
        <div className={classes.footerRow}>
          <div className={
            cn(classes.footerRowSection, classes.footerNciColumn, classes.marginRight40)
  }
          >
            {data.footerLogoHyperlink
              ? (
                data.footerLogoText
                  ? (
                    <RouteLinks to={data.footerLogoHyperlink} className={classes.nciLogo}>
                      <div className={classes.footerLogoText}>
                        {data.footerLogoText}
                      </div>
                      <div>
                        {data.footerLogoSubText}
                      </div>
                    </RouteLinks>
                  ) : (
                    <RouteLinks to={data.footerLogoHyperlink} className={classes.nciLogo}>
                      <img
                        src={data.footerLogoImage}
                        alt={data.footerLogoAltText}
                        id="footer_logo_image"
                      />
                    </RouteLinks>
                  )
              ) : (
                <img
                  src={data.footerLogoImage}
                  alt={data.footerLogoAltText}
                  className={classes.nciLogo}
                />
              )}
          </div>
          { data.link_sections.slice(0, 4).map((linkSection) => (
            <>
              <div className={classes.footerRowSection}>
                <ul>
                  <li>
                    <div
                      className={cn(classes.footerText, classes.listHeader)}
                    >
                      { linkSection.title }
                    </div>
                  </li>
                  { linkSection.items.slice(0, 5).map((footerRowSectionItem) => (
                    <li>
                      {footerRowSectionItem.type === 'modal' ? (
                        <>
                          <button type="button" className={classes.modalText} onClick={() => handleModalOpen(footerRowSectionItem.content)}>
                            {footerRowSectionItem.text}
                          </button>
                        </>
                      ) : (footerRowSectionItem.text && footerRowSectionItem.link)
                        ? (
                          <RouteLinks
                            to={footerRowSectionItem.link}
                            title={footerRowSectionItem.title}
                          >
                            <div className={classes.footerText}>
                              {footerRowSectionItem.text}
                            </div>
                          </RouteLinks>
                        ) : (
                          <div className={classes.footerText}>
                            {footerRowSectionItem.text}
                          </div>
                        )}
                      {footerRowSectionItem.icon
                  && (
                    <RouteLinks to={footerRowSectionItem.link}>
                      <img
                        src={footerRowSectionItem.icon}
                        alt={data.footerLogoAltText}
                        className={classes.socialIcon}
                      />
                    </RouteLinks>
                  )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ))}
        </div>
        <div className={classes.horizontalLine}>
          <Divider />
        </div>
        <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
          <div className={cn(classes.nciLinks, classes.contentJustifyCenter)}>
            {data.global_footer_links.slice(0, 4).map((nciLink, index) => (
              <div>
                <RouteLinks to={nciLink.link}>
                  {nciLink.text}
                </RouteLinks>
                { (index < data.global_footer_links.length - 1)
                && (<span className={classes.ext}>&nbsp;|&nbsp;</span>) }
              </div>
            ))}
          </div>
        </div>
        {(data.footerStaticText)
        && (
          <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
            <div
              className={cn(
                classes.extraPadding,
                classes.nciLinks,
                classes.contentJustifyCenter,
              )}
            >
              <div>
                <span className={classes.turningNIH}>
                  {data.footerStaticText}
                </span>
              </div>
            </div>
          </div>
        )}
        {/* Quick and dirty for adding version number in footer */}
        {(data.version && systemInfoList.length === 0) && (
        <div className={cn(classes.footerRow, classes.contentJustifyLeft)}>
          <div
            className={cn(
              classes.extraPadding,
              classes.nciLinks,
              classes.contentJustifyCenter,
            )}
          >
            <div>
              <span className={classes.footorVersiontext}>
                FE Version:&nbsp;
                {data.version}
              </span>
            </div>
          </div>
        </div>
        )}
        {/* End of Quick and dirty for adding version number in footer */}
        {/* Quick and dirty for adding version number in footer */}
        {(data.BEversion && systemInfoList.length === 0) && (
        <div className={cn(classes.footerRow, classes.contentJustifyLeft)}>
          <div
            className={cn(
              classes.nciLinks,
              classes.contentJustifyCenter,
            )}
          >
            <div>
              <span className={classes.footorVersiontext}>
                BE Version:&nbsp;
                {data.BEversion}
              </span>
            </div>
          </div>
        </div>
        )}
        {/* End of Quick and dirty for adding version number in footer */}
        {/* Adding file service version number in footer */}
        { (data.FileServiceVersion && systemInfoList.length === 0) && (
        <div className={cn(classes.footerRow, classes.contentJustifyLeft)}>
          <div
            className={cn(
              classes.nciLinks,
              classes.contentJustifyCenter,
            )}
          >
            <div>
              <span className={classes.footorVersiontext}>
                FS Version:&nbsp;
                {data.FileServiceVersion}
              </span>
            </div>
          </div>
        </div>
        )}
        {/* End Adding file service version number in footer */}
      </div>
      <Modal
        open={open}
        onClose={handleModalClose}
      >
        <div className={classes.container}>
          <div className={classes.paper}>
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </div>
          <div className={classes.modalFooter}>
            <Button variant="contained" color="primary" className={classes.modalFooterBtn} onClick={handleModalClose}>Accept</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Footer.defaultProps = {
  background: '#23355B',
};

export default withStyles(styles)(Footer);
