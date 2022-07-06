import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';
import { CustomDataTable, getColumns } from 'bento-components';
import env from '../../utils/env';
import bentoComponentsPackageJson from '../../../node_modules/bento-components/package.json';
import materialUICorePackageJson from '../../../node_modules/@material-ui/core/package.json';

async function getVersionDataFromService(url) {
  const result = await fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => data.version)
    .catch((error) => error);

  return result;
}

// Supporting functions
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createRow(key, value) {
  return { key, value };
}

function getHashlessUrl() {
  // if (window.location.href.indexOf('localhost') !== -1) return 'https://bento-dev.bento-tools.org';
  const url = window.location.href;
  const { hash } = window.location;
  const indexOfHash = url.indexOf(hash) || url.length;
  return url.substr(0, indexOfHash);
}

async function getBEVersion(url) {
  const schemaVersion = await fetch(
    `${url}/version`,
  )
    .then((response) => response.text())
    .then((data) => {
      const backendObj = JSON.parse(data);
      return backendObj.version;
    })
    .catch(() => '0.0.0');
  return schemaVersion;
}

async function getVersion(envVariable, route = 'version') {
  const response = await getVersionDataFromService(`${envVariable}${route}`);
  return response || '0.0.0';
}

function envVariableNotSetError(variable) {
  return `Please Check enviroment variable ${variable}`;
}

// Main Function
function SysInfoView() {
  const classes = useStyles();
  const [state, setState] = useState({});

  useEffect(() => {
    const getSystems = async () => {
      const backendVersion = await getBEVersion(getHashlessUrl());
      const fileServiceVersion = env.REACT_APP_FILE_SERVICE_API ? await getVersion(env.REACT_APP_FILE_SERVICE_API) : envVariableNotSetError('REACT_APP_FILE_SERVICE_API');
      const authVersion = env.REACT_APP_AUTH_SERVICE_API ? await getVersion(env.REACT_APP_AUTH_SERVICE_API) : envVariableNotSetError('REACT_APP_AUTH_SERVICE_API');
      const authUserVersion = env.REACT_APP_USER_SERVICE_API ? await getVersion(env.REACT_APP_USER_SERVICE_API) : envVariableNotSetError('REACT_APP_USER_SERVICE_API');
      setState({
        fileService: fileServiceVersion, backendVersion, authVersion, authUserVersion,
      });
    };
    getSystems();
  }, []);

  const microservicesData = [
    createRow('Backend Version', state.backendVersion),
    createRow('File Service Version', state.fileService),
    createRow('Authentication Version', state.authVersion),
    createRow('Authentication User Version', state.authUserVersion),
  ];

  const enviromentVariableData = [
    createRow('Backend API Endpoint', env.REACT_APP_BACKEND_API),
    createRow('File Service API Endpoint', env.REACT_APP_FILE_SERVICE_API),
    createRow('Auth Service API Endpoint', env.REACT_APP_AUTH_SERVICE_API),
    createRow('REACT_APP_ABOUT_CONTENT_URL', env.REACT_APP_ABOUT_CONTENT_URL),
  ];

  const packageDetailData = [
    createRow('Bento-components(aka Bento-tools)', bentoComponentsPackageJson.version),
    createRow('Material UI Core', materialUICorePackageJson.version),
  ];
  const microservicesColumns = {
    columns: [
      {
        dataField: 'key',
        header: 'Service',
      },
      {
        dataField: 'value',
        header: 'Version',
      },
    ],
  };

  const enviromentVariableColumns = {
    columns: [
      {
        dataField: 'key',
        header: 'Enviroment Variable',
      },
      {
        dataField: 'value',
        header: 'Value',
      },
    ],
  };

  const packageDetailColumns = {
    columns: [
      {
        dataField: 'key',
        header: 'NPM Package',
      },
      {
        dataField: 'value',
        header: 'Version',
      },
    ],
  };

  return (
    <>
      <Grid item xs={12} id="table_file">
        <CustomDataTable
          title="Micro Services"
          data={microservicesData}
          columns={getColumns(microservicesColumns, classes)}
        />
      </Grid>
      <Grid item xs={12} id="table_file">
        <CustomDataTable
          title="Enviroment Variables"
          data={enviromentVariableData}
          columns={getColumns(enviromentVariableColumns, classes)}
        />
      </Grid>
      <Grid item xs={12} id="table_file">
        <CustomDataTable
          title="NPM Packages"
          data={packageDetailData}
          columns={getColumns(packageDetailColumns, classes)}
        />
      </Grid>
    </>
  );
}

export default SysInfoView;
