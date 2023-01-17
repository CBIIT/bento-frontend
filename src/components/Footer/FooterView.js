import React, { useEffect, useState } from 'react';
import { Footer } from 'bento-components';
import FooterData from '../../bento/globalFooterData';
import env from '../../utils/env';
import CustomThemeProvider from './FooterThemeConfig';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const fetchVersion = (url) => fetch(`${url}version`)
  .then((resp) => resp.text())
  .then((text) => {
    const json = JSON.parse(text);
    return json.version;
  })
  .catch(() => '0.0.0');

const ICDCFooter = () => {
  const [footerUpdatedData, setFooterUpdatedData] = useState(FooterData);

  useEffect(() => {
    const getSystems = async () => {
      const { href, hash } = window.location;
      const hashIndex = href.indexOf(hash) || href.length;
      const hashlessUrl = href.substring(0, hashIndex);
      const [BEversion, FileServiceVersion] = await Promise.all([
        fetchVersion(hashlessUrl),
        fetchVersion(FILE_SERVICE_API),
      ]);

      const linkSections = FooterData.link_sections;
      linkSections[2].items[2].text = `BE Version: ${BEversion}`;

      setFooterUpdatedData({
        ...FooterData,
        ...{ FileServiceVersion },
        ...{ BEversion },
        ...{ link_sections: linkSections },
      });
    };
    getSystems();
  }, [FooterData]);

  return (
    <CustomThemeProvider>
      <Footer data={footerUpdatedData} />
    </CustomThemeProvider>
  );
};

export default ICDCFooter;
