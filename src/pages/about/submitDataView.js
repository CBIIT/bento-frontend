import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/Photo-About_SubmittingData.jpg';
import Body from '../../components/About/BodyView';
import submissionGuide from '../../assets/footer/ICDC_DGAB_Guidelines.pdf';

const SubmitingData = ({ classes }) => (
  <>
    <Stats />
    <Header title="Submitting Data" />
    <Body data={{
      img: l9dg,
      body: (
        <div>
          <br />
The ICDC was established to further research on human cancers by enabling
comparative analysis with canine cancer. If a researcher has data that will
 help this mission and they are willing to share that data in the ICDC, they
  will make a request through our&nbsp;
          <Link target="_blank" className={classes.link} href={submissionGuide}>
            submission request process [PDF]
          </Link>
.
   Please email
          <Link href="mailto: ICDCHelpDesk@mail.nih.gov" color="inherit" className={classes.link}>
            {' '}
              ICDCHelpDesk@mail.nih.gov
            {' '}
          </Link>

        for instructions. All data in the ICDC will be
   made publicly available.

          {' '}
          <br />
          <br />
Projects need not be complete to start the request. Indeed, working with the
 ICDC before defining your data collection processes can be beneficial, as the
 ICDC can help advise on best practices that will enable more efficient and
 effective submission of the data.
          <br />
          <br />


          <p className={classes.title}> Expectations of data:</p>


 Once a project is accepted into the ICDC, the ICDC Data Team will work with the
submitter to review the data (i.e., by looking at data structure, data values, and
data quality, as well as identifying any standards).  The review in turn leads to a
submission plan between ICDC and the submitter.
          <br />
          {' '}
          <br />

 In developing the submission plan, a primary consideration is that consumers of the
data will not be as familiar with the data as the project owners.   For example,
submitters may find “lymphoma” implicit as a diagnosis in a given data set and thus
not have use for such a field.  However, this field would need to be explicit for
the research community as a whole.

          <br />
          {' '}
          <br />

General guidelines have been established to leverage available community standards
where possible for both field name and acceptable values. Common data quality issues
 are: inconsistent spelling (haemotology versus hematology), inconsistent formatting
  (“Male” versus “male”), concatenated values which should be separate (“neutered
  male” should be values in two separate fields), gaps in data (Null data versus
  empty data versus data not collected) and format (Excel or other database
  compatible formats versus PDF).  The ICDC data team will work with the submitter
  to identify and resolve these issues.

        </div>),
    }}
    />
  </>
);


const styles = () => ({
  linkIcon: {
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  link: {
    color: '#0296C9',
    fontWeight: 'bolder',
    '&:hover': {
      color: '#0296C9',
      fontWeight: 'bolder',
      textDecoration: 'none',
    },
  },
  title: {
    color: '#0B3556',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default withStyles(styles, { withTheme: true })(SubmitingData);
