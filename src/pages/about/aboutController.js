import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';
import YAMLData from '../../content/prod/aboutPagesContent.yaml';
import AboutBody from './aboutBodyView';

const ABOUT_CONTENT_URL = process.env.REACT_APP_ABOUT_CONTENT_URL;

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
    <>
      <AboutBody data={{
        img: data.primaryContentImage ? data.primaryContentImage : '',
        title: data.title ? data.title : '',
        content: data.content ? data.content : '',
        table: data.table ? data.table : '',
        secondaryZoomImage: data.secondaryZoomImage ? data.secondaryZoomImage : null,
        secondaryZoomImageTitle: data.secondaryZoomImageTitle ? data.secondaryZoomImageTitle : null,
      }}
      />
    </>
  );
};
export default About;
