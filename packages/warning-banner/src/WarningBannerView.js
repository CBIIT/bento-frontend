/* eslint-disable max-len */
import React from 'react';

const WarningBanner = ({ enabled = true }) => {
  const bannerStyle = {
    background: '#bb0e3d',
    padding: '15px',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
  };

  const bodyStyle = {
    maxWidth: '1024px',
    margin: '0 auto',
    color: 'white',
    fontSize: '17px',
    lineHeight: '1.6',
    position: 'relative',
    padding: '0 15px 0 40px',
  };

  const iconStyle = {
    content: '',
    display: 'block',
    position: 'absolute',
    height: '26px',
    width: '26px',
    top: '0',
    left: '0',
    backgroundColor: '#fff',
    mask: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxNWgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2NnoiLz48L3N2Zz4=) no-repeat center/contain',
    WebkitMask: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxNWgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2NnoiLz48L3N2Zz4=) no-repeat center/contain',
  };

  const h2Style = {
    fontSize: '18px',
    margin: '0',
  };

  const linkStyle = {
    color: 'white',
  };

  const getUI = () => (
    <section className="nci-shutdown-banner" aria-label="Government Funding Lapse" style={bannerStyle}>
      <div className="nci-shutdown-banner__body" style={bodyStyle}>
        <h2 style={h2Style}>Government Funding Lapse</h2>
        <p style={{ margin: '0' }}>
          Because of a lapse in government funding, the information on this website may not be up to date, transactions submitted via the website may not be processed, and the agency may not be able to respond to inquiries until appropriations are enacted. The NIH Clinical Center (the research hospital of NIH) is open. For more details about its operating status, please visit 
          {' '}
          <a href="https://cc.nih.gov/" style={linkStyle}>cc.nih.gov</a>
          . Updates regarding government operating status and resumption of normal operations can be found at
          {' '}
          <a href="https://opm.gov/" style={linkStyle}>OPM.gov</a>
          .
        </p>
        <span style={iconStyle} />
      </div>
    </section>
  );

  return enabled ? getUI() : '';
};

export default WarningBanner;
