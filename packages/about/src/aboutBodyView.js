/* eslint-disable max-len */
import React from 'react';
import { Grid, Link, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import XoomInOut from './xoomInOutView';

const AboutBody = ({
  classes, data, externalIconImage,
}) => {
  function boldText(text) {
    const boldedText = text.split('$$').map((splitedText) => {
      if (splitedText != null && (/\*(.*)\*/.test(splitedText))) {
        return (<span className={classes.title}>{splitedText.match(/\*(.*)\*/).pop()}</span>);
      }
      return splitedText;
    });
    return boldedText;
  }
  return (
    <>
      <div className={classes.container}>
        <Grid container spacing={16} direction="row" className={classes.aboutSection}>
          {data.imageLocation === 'left'
            && (
              <Grid item lg={3} md={3} sm={12} xs={12} className={classes.imageSection}>
                {data.image}
              </Grid>
            )}
          <Grid item lg={9} md={9} sm={12} xs={12} className={classes.contentSection}>
            <span className={classes.text}>
              {data.content ? data.content.map((contentObj) => (
                <>
                  {/* Ordered List with Numbers logic */}
                  {contentObj.listWithNumbers && (
                    <div className={classes.text}>
                      {/* Numbered ordered list */}
                      <ol>
                        { contentObj.listWithNumbers.map((listObj) => (
                          listObj.listWithAlpahbets ? (
                            // Alphetised sub ordered list
                            <ol type="a">
                              {/* bolding text if necessary */}
                              { listObj.listWithAlpahbets.map((listObj1) => <li>{listObj1.includes('$$') ? boldText(listObj1) : listObj1}</li>)}
                            </ol>
                          ) : <li>{listObj.includes('$$') ? boldText(listObj) : listObj}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {contentObj.listWithBullets && (
                  <div className={classes.text}>
                    <ul>
                      {contentObj.listWithBullets.map((listObj) => {
                        // Split the list item by '$$' to detect bolded text or other inline patterns
                        const parts = listObj.split('$$').map((splitedItem) => {
                          // Check for links using regex pattern: [title](url) or (url)[title]
                          if (splitedItem != null && (/\[(.+)\]\((.+)\)/g.test(splitedItem) || /\((.+)\)\[(.+)\]/g.test(splitedItem))) {
                            const title = splitedItem.match(/\[(.*)\]/).pop();
                            const linkAttrs = splitedItem.match(/\((.*)\)/).pop().split(' ');
                            const target = linkAttrs.find((link) => link.includes('target:'));
                            const url = linkAttrs.find((link) => link.includes('url:'));
                            const href = splitedItem.match(/\((.*)\)/).pop();

                            return (
                              <Link
                                title={title}
                                target={target ? target.replace('target:', '') : '_blank'}
                                rel="noreferrer"
                                href={url ? url.replace('url:', '') : (href && href.includes('@') ? `mailto:${href}` : href)}
                                color="inherit"
                                className={classes.link}
                              >
                                {title}
                              </Link>
                            );
                          }

                          // Check for bolding inline words using regex
                          if (splitedItem != null && (/\*(.*)\*/.test(splitedItem))) {
                            return <span className={classes.title}>{splitedItem.match(/\*(.*)\*/).pop()}</span>;
                          }

                          // For email
                          if (splitedItem != null && (/@(.*)@/.test(splitedItem))) {
                            return <span className={classes.email}>{splitedItem.match(/@(.*)@/).pop()}</span>;
                          }

                          // Return the regular text if no special formatting is needed
                          return splitedItem;
                        });

                        return <li>{parts}</li>;
                      })}
                    </ul>
                  </div>
                  )}
                  {/* Ordered List with Alphabets logic */}
                  {contentObj.listWithAlpahbets && (
                    <div className={classes.text}>
                      {/* Alphabetised ordered list */}
                      <ol type="a">
                        { contentObj.listWithAlpahbets.map((listObj) => <li>{listObj.includes('$$') ? boldText(listObj) : listObj}</li>)}
                      </ol>
                    </div>
                  )}

                  {/* Paragraphs */}
                  {contentObj.paragraph && (
                    <div className={classes.text}>
                      { contentObj.paragraph.split('$$').map((splitedParagraph) => {
                        // Checking for regex ()[] pattern
                        if (splitedParagraph != null && ((/\[(.+)\]\((.+)\)/g.test(splitedParagraph)) || (/\((.+)\)\[(.+)\]/g.test(splitedParagraph)))) {
                          const defaultTitle = splitedParagraph.match(/\[(.*)\]/).pop();
                          const linkAttrs = splitedParagraph.match(/\((.*)\)/).pop().split(' ');
                          const titleMatch = splitedParagraph.match(/title:\s*'([^']+)'/);
                          const title = titleMatch ? titleMatch[1].trim() : defaultTitle;
                          const target = linkAttrs.find((link) => link.includes('target:'));
                          const url = linkAttrs.find((link) => link.includes('url:'));
                          const href = linkAttrs[0];

                          const link = (
                            <Link
                              title={title}
                              target={target ? target.replace('target:', '') : '_blank'}
                              rel="noreferrer"
                              href={url ? url.replace('url:', '') : (href && href.includes('@') ? `mailto:${href}` : href)}
                              color="inherit"
                              className={classes.link}
                            >
                              {defaultTitle}
                            </Link>
                          );

                          return (
                            <>
                              {link}
                              {href.includes('@') || !href.includes('http') ? '' : (
                                <img
                                  src={externalIconImage}
                                  // externalIconImage: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/common/images/logos/svgs/externalLinkIcon.svg',
                                  alt="outbounnd web site icon"
                                  className={classes.linkIcon}
                                />
                              )}

                            </>
                          );
                        }
                        // For email
                        if (splitedParagraph != null && (/@(.*)@/.test(splitedParagraph))) {
                          return (<span className={classes.email}>{splitedParagraph.match(/@(.*)@/).pop()}</span>);
                        }
                        // For sub headings
                        if (splitedParagraph != null && (/#(.*)#/.test(splitedParagraph))) {
                          return (<div className={classes.title}>{splitedParagraph.match(/#(.*)#/).pop()}</div>);
                        }
                        // For bolding inline words
                        if (splitedParagraph != null && (/\*(.*)\*/.test(splitedParagraph))) {
                          return (<span className={classes.title}>{splitedParagraph.match(/\*(.*)\*/).pop()}</span>);
                        }
                        // For downloading things
                        if (splitedParagraph != null && (/{(.*)}/.test(splitedParagraph))) {
                          const downloadAttrs = splitedParagraph.match(/{(.*)}/).pop().split(',');
                          const downloadLink = downloadAttrs.find((link) => link.includes('link:'));
                          const downloadTitle = downloadAttrs.find((link) => link.includes('title:'));
                          return (
                            <Link
                              target="_blank"
                              className={classes.link}
                              href={downloadLink ? downloadLink.replace('link:', '') : ''}
                            >
                              {downloadTitle ? downloadTitle.replace('title:', '') : ''}
                            </Link>
                          );
                        }
                        return splitedParagraph;
                      })}
                    </div>
                  )}

                  {/* Table logic */}
                  {contentObj.table && (
                    <div className={classes.tableDiv}>
                      <table className={classes.table}>
                        <thead className={classes.tableHeader}>
                          <tr className={classes.tableBodyRow}>
                            <th className={classes.headerCell} aria-label="Index" />
                            { contentObj.table[0].head.map((rowObj) => {
                              let outputHTML = <th className={classes.headerCell}>{rowObj}</th>;
                              if (rowObj != null && (/{(.*)}/.test(rowObj))) {
                                const thAttrs = rowObj.match(/{(.*)}/).pop().split('$$');
                                const inlineStyleStr = thAttrs.find((thAttr) => thAttr.includes('style:')).replace('style:', '').replace(/'/g, '');
                                const inlineStyleMap = {};
                                inlineStyleStr.split(',').forEach((style) => {
                                  // eslint-disable-next-line prefer-destructuring
                                  inlineStyleMap[style.split(':')[0]] = style.split(':')[1];
                                });
                                const text = thAttrs.find((thAttr) => thAttr.includes('text:'));
                                outputHTML = (
                                  <th className={classes.headerCell} style={inlineStyleMap}>
                                    {text.replace('text:', '')}
                                  </th>
                                );
                              }
                              return outputHTML;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          { contentObj.table[1].body.map((rowObj, index) => (
                            <>
                              <tr className={classes.tableBodyRow}>
                                <td className={classes.tableCell}>{index + 1}</td>
                                {/* eslint-disable-next-line max-len */}
                                { rowObj.row.map((rowValue) => {
                                  let outputHTML = (
                                    <td className={classes.tableCell}>
                                      {rowValue}
                                    </td>
                                  );
                                  // add inline style
                                  if (rowValue != null && (/{(.*)}/.test(rowValue))) {
                                    const thAttrs = rowValue.match(/{(.*)}/).pop().split('$$');
                                    const inlineStyleStr = thAttrs.find((thAttr) => thAttr.includes('style:')).replace('style:', '').replace(/'/g, '');
                                    const inlineStyleMap = {};
                                    inlineStyleStr.split(',').forEach((style) => {
                                      // eslint-disable-next-line prefer-destructuring
                                      inlineStyleMap[style.split(':')[0]] = style.split(':')[1];
                                    });
                                    const text = thAttrs.find((thAttr) => thAttr.includes('text:'));
                                    outputHTML = (
                                      <td className={classes.tableCell} style={inlineStyleMap}>
                                        {text.replace('text:', '')}
                                      </td>
                                    );
                                  }

                                  if (rowValue != null && ((/\[(.+)\]\((.+)\)/g.test(rowValue)) || (/\((.+)\)\[(.+)\]/g.test(rowValue)))) {
                                    const title = rowValue.match(/\[(.*)\]/).pop();
                                    const linkAttrs = rowValue.match(/\((.*)\)/).pop().split(' ');
                                    const target = linkAttrs.find((link) => link.includes('target:'));
                                    const url = linkAttrs.find((link) => link.includes('url:'));
                                    const type = linkAttrs.find((link) => link.includes('type:')); // 0 : no img
                                    const link = (
                                      <Link
                                        title={title}
                                        target={target ? target.replace('target:', '') : '_blank'}
                                        rel="noreferrer"
                                        href={url ? url.replace('url:', '') : rowValue.match(/\((.*)\)/).pop()}
                                        color="inherit"
                                        className={classes.tableLink}
                                      >
                                        {title}
                                      </Link>
                                    );
                                    outputHTML = (
                                      <td className={classes.tableCell}>
                                        {link}
                                        {type ? '' : (
                                          <img
                                            src={externalIconImage}
                                            alt="outbounnd web site icon"
                                            className={classes.tablelinkIcon}
                                          />
                                        )}

                                      </td>
                                    );
                                  }
                                  return outputHTML;
                                })}
                              </tr>
                            </>
                          )) }
                        </tbody>
                      </table>
                    </div>
                  )}
                  <br />
                </>
              )) : ''}
            </span>
            {data.downloadableContentTitle
        && (
        <div className={classes.downloadableContentContainer}>
          <div className={classes.downloadableContentTitle}>{data.downloadableContentTitle}</div>
          <span className={classes.text}>
            {data.downloadableContent ? data.downloadableContent.map((contentObj) => (
              <>
                {/* Ordered List with Numbers logic */}

                {/* Paragraphs */}
                {contentObj.paragraph && (
                <div className={classes.text}>
                  { contentObj.paragraph.split('$$').map((splitedParagraph) => {
                    // Checking for regex ()[] pattern
                    if (splitedParagraph != null && ((/\[(.+)\]\((.+)\)/g.test(splitedParagraph)) || (/\((.+)\)\[(.+)\]/g.test(splitedParagraph)))) {
                      const title = splitedParagraph.match(/\[(.*)\]/).pop();
                      const linkAttrs = splitedParagraph.match(/\((.*)\)/).pop().split(' ');
                      const target = linkAttrs.find((link) => link.includes('target:'));
                      const url = linkAttrs.find((link) => link.includes('url:'));
                      const href = splitedParagraph.match(/\((.*)\)/).pop();

                      const link = (
                        <Link
                          title={title}
                          target={target ? target.replace('target:', '') : '_blank'}
                          rel="noreferrer"
                          href={url ? url.replace('url:', '') : (href && href.includes('@') ? `mailto:${href}` : href)}
                          color="inherit"
                          className={classes.link}
                        >
                          {title}
                        </Link>
                      );

                      return (
                        <>
                          {link}
                          {href.includes('@') || !href.includes('http') ? '' : (
                            <img
                              src={externalIconImage}
                                  // externalIconImage: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/common/images/logos/svgs/externalLinkIcon.svg',
                              alt="outbounnd web site icon"
                              className={classes.linkIcon}
                            />
                          )}

                        </>
                      );
                    }

                    return splitedParagraph;
                  })}
                </div>
                )}
              </>
            )) : ''}
          </span>
        </div>
        )}
          </Grid>
          {(data.imageLocation === 'right'
            || (data.actionButtonLabel && data.actionLink))
            && (
            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.imageSection}>
              {data.image}

              {data.actionButtonLabel && data.actionLink && (
                <div className={classes.actionSection}>
                  {data.actionTitle && (
                    <div className={classes.actionTitle}>
                      {data.actionTitle}
                    </div>
                  )}
                  <Link
                    {...(data.actionLink && data.actionLink.includes('http')
                      ? { href: data.actionLink, target: '_blank', rel: 'noreferrer' }
                      : { component: RouterLink, to: data.actionLink })}
                    title={data.actionButtonLabel}
                    color="inherit"
                    underline="none"
                    className={classes.actionLink}
                  >
                    {data.actionButtonLabel}
                  </Link>
                </div>
              )}
            </Grid>
            )}
        </Grid>
      </div>
      {data.secondaryZoomImageTitle
        && <div className={classes.secondayTitle}>{data.secondaryZoomImageTitle}</div>}
      {data.secondaryImage && <XoomInOut>{data.secondaryImageData}</XoomInOut>}
    </>
  );
};

const styles = () => ({
  container: {
    margin: '16px auto 16px auto',
    color: '#000000',
    fontFamily: (props) => (props.data.fontFamily ? props.data.fontFamily : 'Nunito'),
    fontSize: '15px',
    lineHeight: '22px',
    maxWidth: '1440px',
  },
  tabbedParag: {
    paddingLeft: '40px',
  },
  maxWidthContainer: {
    margin: '0px auto 0px auto',
    maxWidth: '1440px',
  },
  secondayTitle: {
    display: 'block',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '70px',
    color: '#033D6F',
    fontSize: '28px',
    fontFamily: 'Lato',
  },
  text: {
    // height: '476px',
    // width: '675px',
    color: '#000000',
    fontFamily: (props) => (props.data.fontFamily ? props.data.fontFamily : 'Nunito'),
    fontSize: '16px',
    lineHeight: (props) => (props.data.lineHeight ? props.data.lineHeight : '30px'),
  },
  title: (props) => ({
    color: props.titleColor,
    fontWeight: '500',
    fontSize: '24px',
  }),
  email: (props) => ({
    color: props.linkColor,
    fontWeight: 'bold',
  }),
  contentSection: {
    padding: (props) => ((props.data.imageLocation === 'right' || (props.data.actionButtonLabel && props.data.actionLink))
      ? '8px 25px 8px 25px !important' : '8px 0px 8px 25px !important'),
    marginBottom: (props) => (props.data.marginBottom ? props.data.marginBottom : 0),
    float: 'left',
    background: 'white',
  },
  imageSection: {
    float: 'left',
  },
  actionSection: {
    display: 'flex',
    width: '100%',
    padding: '25px 25px 35px',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    border: '0.5px solid #98B5CB',
    background: '#EBF3F7',
    marginTop: '19px',
  },
  actionTitle: {
    color: '#7A9BB1',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: '19px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '25px',
    letterSpacing: '0.15px',
    textTransform: 'uppercase',
    wordBreak: 'break-word',
    marginBottom: '22px',
  },
  actionLink: {
    display: 'flex',
    width: '210px',
    height: 'fit-content',
    minHeight: '45px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: '0',
    borderRadius: '10px',
    border: '1px solid #42779A',
    background: '#0E6292',
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
    letterSpacing: '1px',
    wordBreak: 'break-word',
    padding: '15.5px',
  },
  aboutSection: {
    padding: '0px 45px',
  },
  img: {
    width: '100%',
  },
  linkIcon: {
    width: '1em',
    verticalAlign: 'sub',
    margin: '0px 0px 2px 2px',
  },
  link: (props) => ({
    color: props.linkColor,
    fontWeight: '600',
    '&:hover': {
      color: props.linkColor,
    },
  }),
  tableDiv: {
    marginTop: '0px',
  },
  tablelinkIcon: {
    width: '15px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  tableLink: {
    fontWeight: 'bolder',
    textDecoration: 'underline',
  },
  table: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: '30px',
    textAlign: 'left',
    width: '100%',
  },
  tableHeader: {
    fontFamily: (props) => (props.data.fontFamily ? props.data.fontFamily : 'Nunito'),
    color: '#194563',
    textTransform: 'uppercase',

  },
  tableBodyRow: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    color: '#3E7AAA',
  },
  tableCell: {
    fontFamily: (props) => (props.data.fontFamily ? props.data.fontFamily : 'Nunito'),
    fontSize: '14px',
    padding: '8px 15px 8px 0px',
    borderBottom: '0.66px solid #087CA5',
  },
  headerCell: {
    borderBottom: '4px solid #087CA5',
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontWeight: 'bolder',
  },
  MyCasesWizardStep4: {
    width: '600px',
  },
  downloadableContentContainer: {
    background: '#ebebeb',
    padding: '32px',
    borderRadius: '8px',
  },
  downloadableContentTitle: {
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#1280AE',
    fontSize: '20px',
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
  },
});

AboutBody.defaultProps = {
  classes: {},
  data: {
    content: [],
    fontFamily: 'Nunito',
    lineHeight: '30px',
  },
  linkColor: '#0296C9',
  titleColor: '#0B3556',
  externalIconImage: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/common/images/logos/svgs/externalLinkIcon.svg',
};

export default withStyles(styles)(AboutBody);
