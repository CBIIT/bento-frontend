import React, { useEffect, useState } from 'react';
import { Footer } from '@bento-core/footer';
import FooterData from '../../bento/globalFooterData';
import env from '../../utils/env';
import CustomThemeProvider from './FooterThemeConfig';

const BACKEND_API = env.REACT_APP_BACKEND_API;
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
      const backendApiUrl = new URL(BACKEND_API);
      const backendOrigin = `${backendApiUrl.protocol}//${backendApiUrl.hostname}${
        // Just in case port doesn't exist
        backendApiUrl.port
          ? `:${backendApiUrl.port}/`
          : '/'
      }`;
      const [BEversion, FileServiceVersion] = (await Promise.allSettled([
        fetchVersion(backendOrigin),
        fetchVersion(FILE_SERVICE_API),
      ])).map((res) => (res.status === 'fulfilled' ? res.value : '0.0.0'));

      const linkSections = FooterData.link_sections;
      linkSections[2].items[2].text = `BE Version: ${BEversion}`;

      setFooterUpdatedData({
        ...FooterData,
        ...{ FileServiceVersion },
        ...{ BEversion },
        link_sections: linkSections,
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
