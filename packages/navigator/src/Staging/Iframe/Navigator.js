import React, { useEffect, useState } from 'react';

const defaultUrl = 'https://github.com/CBIIT/c3dc-model/blob/dmn-dev2/model-desc/content.json';
const IframeNavigator = ({
  configUrl = defaultUrl,
}) => {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJson = async () => {
      try {
        const response = await fetch(configUrl); // Replace with your JSON file URL
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setJsonData(data);
      } catch (err) {
        setError('Failed to fetch or parse JSON');
        console.error(err);
      }
    };

    fetchJson();
  }, []);

  return (
    <div>
      <h2>JSON Content</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre>{jsonData ? JSON.stringify(jsonData, null, 2) : 'Loading...'}</pre>
    </div>
  );
};

export default IframeNavigator;
