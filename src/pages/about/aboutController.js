import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';
import YAMLData from '../../content/prod/aboutPagesContent.yaml';
import purposeImg from '../../assets/about/About_Purpose.png';
import CRDCImg from '../../assets/about/About_CRDC.png';
import developerImg from '../../assets/about/About_Developers.png';
import requestImg from '../../assets/about/About_RequestAccess.png';
import dataDictImg from '../../assets/about/About_DataDictionary.png';
import committeeImg from '../../assets/about/Photo-About_SteeringCommittee.jpg';
import supportImg from '../../assets/about/About_Support.png';
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

      switch (match.path) {
        case '/crdc':
          supportObj.image = CRDCImg;
          break;
        case '/developers':
          supportObj.image = developerImg;
          break;
        case '/purpose':
          supportObj.image = purposeImg;
          break;
        case '/request-access':
          supportObj.image = requestImg;
          break;
        case '/steeringCommittee':
          supportObj.image = committeeImg;
          break;
        case '/support':
          supportObj.image = supportImg;
          break;
        case '/data-dictionary':
          supportObj.image = dataDictImg;
          break;
        default:
          supportObj.image = purposeImg;
      }
      setData(supportObj);
    };
    fetchData();
  }, [match.path]);

  return (
    <>
      <AboutBody data={{
        img: data.image ? data.image : '',
        title: data.title ? data.title : '',
        content: data.content ? data.content : '',
        table: data.table ? data.table : '',
      }}
      />
    </>
  );
};
export default About;
