/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';
import {
  CustomDataTable
} from '@bento-core/data-table';
import { getColumns } from '@bento-core/util';
import env from '../../utils/env';
import bentoCorePackageJson from '@bento-core/all/package.json';
import materialUICorePackageJson from '@material-ui/core/package.json';
// import jbrowsePackageJson from '@jbrowse/core/package.json';
import packageJson from '../../../package.json';
import { coreRequirements, microServiceRequirements, dependencyRequirements } from '../../bento/sysinfoData';

async function getVersionDataFromService(url) {
  const result = await fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => data.version)
    .catch((error) => '0.0.0'); // TODO: Need to improve this error hander.

  return result;
}

// Supporting functions
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// eslint-disable-next-line camelcase
function createThreeColumnRow(key, requiredValue, value) {
  return { key, requiredValue, value };
}

function createRow(key, value) {
  return { key, value };
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
  const backendApiUrl = new URL(env.REACT_APP_BACKEND_API);
  const backendOrigin = `${backendApiUrl.protocol}//${backendApiUrl.hostname}${
        // Just in case port doesn't exist
        backendApiUrl.port
          ? `:${backendApiUrl.port}/`
          : '/'
      }`;

  useEffect(() => {
    const getSystems = async () => {
      const backendVersion = backendOrigin ? await getVersion(backendOrigin) : envVariableNotSetError('REACT_APP_BACKEND_API');
      const fileServiceVersion = env.REACT_APP_FILE_SERVICE_API ? await getVersion(env.REACT_APP_FILE_SERVICE_API) : envVariableNotSetError('REACT_APP_FILE_SERVICE_API');
      const authVersion = env.REACT_APP_AUTH_SERVICE_API ? await getVersion(env.REACT_APP_AUTH_SERVICE_API) : envVariableNotSetError('REACT_APP_AUTH_SERVICE_API');
      const authUserVersion = env.REACT_APP_USER_SERVICE_API ? await getVersion(env.REACT_APP_USER_SERVICE_API) : envVariableNotSetError('REACT_APP_USER_SERVICE_API');
      setState({
        fileService: fileServiceVersion, backendVersion, authVersion, authUserVersion,
      });
    };
    getSystems();
  }, []);

  const coreServicesData = [
    createThreeColumnRow('Frontend Version', coreRequirements.frontend, env.REACT_APP_FE_VERSION),
    createThreeColumnRow('Backend Version', coreRequirements.backend, state.backendVersion),
    createThreeColumnRow('Bento-Core Version', coreRequirements['bento-core'], bentoCorePackageJson.version),
  ];

  const microservicesData = [
    createThreeColumnRow('File Service Version', microServiceRequirements.file, state.fileService),
    createThreeColumnRow('Authentication Version', microServiceRequirements.auth, state.authVersion),
    createThreeColumnRow('AuthZ Version', microServiceRequirements.user, state.authUserVersion),
  ];

  const environmentVariablesData = [
    createRow('Backend API Endpoint', env.REACT_APP_BACKEND_API),
    createRow('File Service API Endpoint', env.REACT_APP_FILE_SERVICE_API),
    createRow('Auth Service API Endpoint', env.REACT_APP_AUTH_SERVICE_API),
  ];

  const dependenciesData = [
    createThreeColumnRow('Node Version', dependencyRequirements.node, ''),
    createThreeColumnRow('NPM Version', dependencyRequirements.npm, ''),
    createThreeColumnRow('MUI Core Version', packageJson.dependencies['@material-ui/core'], materialUICorePackageJson.version),
    // createThreeColumnRow('JBrowse Version', packageJson.dependencies['@jbrowse/react-linear-genome-view'], jbrowsePackageJson.version),
  ];

  const coreServiceOptions = {
    columns: [
      {
        dataField: 'key',
        header: 'Name',
      },
      {
        dataField: 'requiredValue',
        header: 'Required Version',
      },
      {
        dataField: 'value',
        header: 'Current Version',
      },
    ],
  };

  const microservicesOptions = {
    columns: [
      {
        dataField: 'key',
        header: 'Name',
      },
      {
        dataField: 'requiredValue',
        header: 'Required Version',
      },
      {
        dataField: 'value',
        header: 'Version',
      },
    ],
  };

  const environmentVariableOptions = {
    columns: [
      {
        dataField: 'key',
        header: 'Variable',
      },
      {
        dataField: 'value',
        header: 'Value',
      },
    ],
  };

  const dependenciesOptions = {
    columns: [
      {
        dataField: 'key',
        header: 'Name',
      },
      {
        dataField: 'requiredValue',
        header: 'Required Version',
      },
      {
        dataField: 'value',
        header: 'Current Version',
      },
    ],
  };

  return (
    <>
      <Grid item xs={12} id="table_core">
        <CustomDataTable
          title="Core"
          data={coreServicesData}
          columns={getColumns(coreServiceOptions, classes)}
        />
      </Grid>
      <Grid item xs={12} id="table_micro">
        <CustomDataTable
          title="Micro Services"
          data={microservicesData}
          columns={getColumns(microservicesOptions, classes)}
        />
      </Grid>
      <Grid item xs={12} id="table_env">
        <CustomDataTable
          title="Environment Variables"
          data={environmentVariablesData}
          columns={getColumns(environmentVariableOptions, classes)}
        />
      </Grid>
      <Grid item xs={12} id="table_file">
        <CustomDataTable
          title="Dependencies"
          data={dependenciesData}
          columns={getColumns(dependenciesOptions, classes)}
        />
      </Grid>
    </>
  );
}

export default SysInfoView;
