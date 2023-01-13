import React, { useEffect, useState } from 'react';
import { Footer } from 'bento-components';
import FooterData from '../../bento/globalFooterData';
import env from '../../utils/env';
import CustomThemeProvider from './FooterThemeConfig';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const ICDCFooter = () => {
  const [footerUpdatedData, setFooterUpdatedData] = useState(FooterData);

  useEffect(() => {
    const getSystems = async () => {
      const url = window.location.href;
      const { hash } = window.location;
      const hashIndex = url.indexOf(hash) || url.length;
      const hashlessUrl = url.substring(0, hashIndex);

      const BEversion = await fetch(`${hashlessUrl}version`)
        .then((resp) => resp.text())
        .then((text) => {
          const json = JSON.parse(text);
          return json.version;
        })
        .catch(() => '0.0.0');

      const FileServiceVersion = await fetch(`${FILE_SERVICE_API}version`)
        .then((resp) => (resp).text())
        .then((text) => {
          const json = JSON.parse(text);
          return json.version;
        })
        .catch(() => '0.0.0');

      // eslint-disable-next-line camelcase
      const link_sections = [...FooterData.link_sections];
      link_sections[2].items[2].text = `BE Version: ${BEversion}`;

      setFooterUpdatedData({
        ...FooterData,
        ...{ link_sections },
        ...{ FileServiceVersion },
        ...{ BEversion },
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
