import React from 'react';
import { Grid, withStyles, Link } from '@material-ui/core';
import AboutHeader from './aboutHeaderView';
import Stats from '../../components/Stats/AllStatsController';
import externalIcon from '../../assets/about/About-ExternalLink.svg';
import submissionGuide from '../../assets/footer/ICDC_DGAB_Guidelines.pdf';
import MyCasesWizardStep4 from '../../assets/icons/MyCases-Wizard-Step4.svg';

const AboutBody = ({ classes, data }) => {
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
      <Stats />
      <AboutHeader title={data.title} />
      <div id="about_body" className={classes.container}>
        <Grid container spacing={16} direction="row" className={classes.aboutSection}>
          <Grid item lg={3} md={3} sm={12} xs={12} className={classes.leftSection}>
            <img className={classes.img} src={data.img} alt={data.title} />
          </Grid>
          <Grid item lg={9} md={9} sm={12} xs={12} className={classes.rightSection}>
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
                {/* Ordered List with Alphabets logic */}
                {contentObj.listWithAlpahbets && (
                <div className={classes.text}>
                  {/* Alphabetised ordered list */}
                  <ol type="a">
                    { contentObj.listWithAlpahbets.map((listObj) => <li>{listObj.includes('$$') ? boldText(listObj) : listObj}</li>)}
                  </ol>
                </div>
                )}
                {/* MyCases-Wizard-Step4-SVG */}
                {contentObj.image && (
                <div className={classes.text}>
                  <img
                    src={MyCasesWizardStep4}
                    alt="Step1 - Select and Save to My Cases|
                    Step2 - Review My Cases|
                    Step3 - Select Files and Create Manifest|
                    Step4 - Load Manifest to SBG"
                    className={classes.MyCasesWizardStep4}
                  />
                </div>
                )}
                {/* Paragraphs */}
                {contentObj.paragraph && (
                <div className={classes.text}>
                  { contentObj.paragraph.split('$$').map((splitedParagraph) => {
                  // Checking for regex ()[] pattern
                    if (splitedParagraph != null && ((/\[(.+)\]\((.+)\)/g.test(splitedParagraph)) || (/\((.+)\)\[(.+)\]/g.test(splitedParagraph)))) {
                      return (
                        <>
                          <Link
                            title={splitedParagraph.match(/\[(.*)\]/).pop()}
                            target="_blank"
                            rel="noreferrer"
                            href={splitedParagraph.match(/\((.*)\)/).pop()}
                            color="inherit"
                            className={classes.link}
                          >
                            {splitedParagraph.match(/\[(.*)\]/).pop()}
                          </Link>
                          <img
                            src={externalIcon}
                            alt="outbounnd web site icon"
                            className={classes.linkIcon}
                          />
                        </>
                      );
                    }
                    // For sub headings
                    if (splitedParagraph != null && (/#(.*)#/.test(splitedParagraph))) {
                      return (<div className={classes.title}>{splitedParagraph.match(/#(.*)#/).pop()}</div>);
                    }
                    // For bolding inline words
                    if (splitedParagraph != null && (/\*(.*)\*/.test(splitedParagraph))) {
                      return (<span className={classes.title}>{splitedParagraph.match(/\*(.*)\*/).pop()}</span>);
                    }
                    // For downloading Submission PDF
                    if (splitedParagraph != null && (/{(.*)}/.test(splitedParagraph))) {
                      return (
                        <Link target="_blank" className={classes.link} href={submissionGuide}>
                          {splitedParagraph.match(/{(.*)}/).pop()}
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
                        { contentObj.table[0].head.map((rowObj) => (
                          <>
                            <th className={classes.headerCell}>{rowObj}</th>
                          </>
                        )) }
                      </tr>
                    </thead>
                    <tbody>
                      { contentObj.table[1].body.map((rowObj, index) => (
                        <>
                          <tr className={classes.tableBodyRow}>
                            <td className={classes.tableCell}>{index + 1}</td>
                            {/* eslint-disable-next-line max-len */}
                            { rowObj.row.map((rowValue) => <td className={classes.tableCell}>{rowValue}</td>)}
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
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const styles = (theme) => ({
  container: {
    margin: '16px auto 16px auto',
    color: '#000000',
    fontFamily: theme.custom.fontFamily,
    fontSize: '15px',
    lineHeight: '22px',
    maxWidth: '1440px',
  },
  text: {
    // height: '476px',
    // width: '675px',
    color: '#000000',
    fontFamily: theme.custom.fontFamily,
    fontSize: '15px',
    lineHeight: '22px',
  },
  title: {
    color: '#0B3556',
    fontWeight: 'bold',
  },
  rightSection: {
    padding: '8px 25px !important',
    float: 'left',
  },
  leftSection: {
    float: 'left',
  },
  aboutSection: {
    margin: '60px auto 60px auto',
  },
  img: {
    width: '100%',
  },
  linkIcon: {
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  link: {
    color: '#0296C9',
    '&:hover': {
      color: '#0296C9',
    },
  },
  tableDiv: {
    marginTop: '45px',
  },
  table: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.025em',
    lineHeight: '30px',
    textAlign: 'left',
    width: '100%',
  },
  tableHeader: {
    fontFamily: theme.custom.fontFamily,
    color: '#194563',
    textTransform: 'uppercase',

  },
  tableBodyRow: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    color: '#3E7AAA',
  },
  tableCell: {
    fontFamily: theme.custom.fontFamily,
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
});

AboutBody.defaultProps = {
  classes: {},
  data: {
    content: [],
  },
};

export default withStyles(styles)(AboutBody);
