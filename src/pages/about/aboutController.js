import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';
import YAMLData from '../../content/prod/aboutPagesContent.yaml';
import env from '../../utils/env';
import AboutView from './aboutView';

const ABOUT_CONTENT_URL = env.REACT_APP_ABOUT_CONTENT_URL;

const About = ({ match }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        result = await axios.get(ABOUT_CONTENT_URL);
        resultData = yaml.safeLoad(result.data);
      } catch (error) {
        result = await axios.get(YAMLData);
        resultData = yaml.safeLoad(result.data);
      }

      const supportObj = resultData.find(({ page }) => page === match.path);

      setData(supportObj);
    };
    fetchData();
  }, [match.path]);

  return (
    <AboutView data={data} />
  );
};
export default About;
