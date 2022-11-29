import env from '../utils/env';
// footerLogoImage ideal image size 310x80 px

export default {
  // footerLogoImage: 'https://raw.githubusercontent.com/cbiit/datacommons-assets/main/bento/images/icons/png/footerlogo.png',
  // footerLogoAltText: 'Footer Logo',
  footerLogoText: 'National Cancer Institute',
  footerLogoSubText: 'at the National Institutes of Health',
  footerLogoHyperlink: 'https://cancer.gov/',
  version: env.REACT_APP_FE_VERSION,
  BEversion: env.REACT_APP_BE_VERSION,
  // A maximum of 3 Subsections (link_sections) are allowed
  // A maximum of 4 Subsection Links ('items' under link_sections) are allowed
  // A maximum of 4 Anchor Links (global_footer_links) are allowed
  // Ideal size for icon is 20x20 px
  link_sections: [
    {
      title: 'Contact Information',
      items: [
        {
          text: 'Bento Help Desk',
          link: 'bento-help@nih.gov',
        },
      ],
    },

    {
      title: 'More Information',
      items: [
        {
          text: 'Bento Home',
          link: 'https://bento-tools.org/',
        },
        {
          text: 'Bento Documentation',
          link: 'https://cbiit.github.io/bento-docs/master/index.html',
        },
      ],
    },

    {
      title: 'System Info',
      systemInfoInLinkSection: true,
      items: [
        {
          text: 'Release Notes',
          link: 'https://github.com/CBIIT/bento-frontend/releases',
        },
        {
          text: `FE Version: ${env.REACT_APP_FE_VERSION || '0.0.0'}`,
        },
        {
          text: `BE Version: ${env.REACT_APP_BE_VERSION || '0.0.0'}`,
        },
        {
          text: 'System Info Page',
          link: '/sysinfo',
        },
      ],
    },

    {
      title: 'Policies',
      items: [
        {
          text: 'Disclaimer',
          link: 'https://www.cancer.gov/policies/disclaimer',
        },
        {
          text: 'Accessibility',
          link: 'https://www.cancer.gov/policies/accessibility',
        },
        {
          text: 'FOIA',
          link: 'https://www.cancer.gov/policies/foia',
        },
        {
          text: 'HHS Vulnerability Disclosure',
          link: 'https://www.hhs.gov/vulnerability-disclosure-policy/index.html',
        },
      ],
    },
  ],
  global_footer_links: [
    {
      text: 'U.S. Department of Health and Human Services',
      link: 'https://www.hhs.gov',
    },
    {
      text: 'National Institutes of Health',
      link: 'https://www.nih.gov',
    },
    {
      text: 'National Cancer Institute',
      link: 'https://www.cancer.gov',
    },
    {
      text: 'USA.gov',
      link: 'https://www.usa.gov',
    },
  ],
};
