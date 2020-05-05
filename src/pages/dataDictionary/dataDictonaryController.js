import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';
import YAMLData from '../../content/stg/aboutPagesContent.yaml';
import DataDictBody from './dataDictonaryView';

const ABOUT_CONTENT_URL = process.env.REACT_APP_ABOUT_CONTENT_URL;

const About = () => {
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

      const supportObj = resultData.find(({ page }) => page === '/data-dictionary');

      setData(supportObj);
    };
    fetchData();
  }, []);

  return (
    <>
      <DataDictBody data={data.content} />
    </>
  );
};
export default About;
