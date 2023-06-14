#!/usr/bin/env node
/* eslint-disable no-console */

const { execSync } = require('child_process');
const prompts = require('prompts');

const path = require('path');
const fs = require('fs');
const axios = require('axios');
const AdmZip = require('adm-zip');
const releasedTagMapplings = require('../src/releasedTagMappings.json');

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx create-my-boilerplate my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
  } else {
    console.log(err);
  }
  process.exit(1);
}

const askQuestion = async (questions) => prompts(questions);

async function get(url) {
  const options = {
    method: 'GET',
    url,
    responseType: 'arraybuffer',
  };
  const { data } = await axios(options);
  return data;
}

async function getAndUnZip(props) {
  const {
    url, extractEntryTo, outputDir, maintainEntryPath = true, overwrite = true,
  } = props;

  const zipFileBuffer = await get(url);
  const zip = new AdmZip(zipFileBuffer);
  zip.extractEntryTo(extractEntryTo, outputDir, maintainEntryPath, overwrite);
}

const bentoVersionRegEx = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?(?:-((?:0|[1-9A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

const questions = {
  projectPath: {
    type: 'toggle',
    name: 'isProjectPathCorrect',
    message: `Is projectPath: ${projectPath} correct?`,
    initial: true,
    active: 'Yes',
    inactive: 'No',
  },
  bentoRIVersion: {
    type: 'select',
    name: 'bentoRIVersion',
    message: '🍱 Please select a bento reference implementation version.',
    choices: [
      { title: '4.0.0', value: '4.0.0' },
      { title: 'custom', value: 'custom' },
    ],
    initial: 0,
  },
  customBentoRIVersion: {
    type: 'text',
    name: 'customBentoRIVersion',
    message: 'Please Enter a bento reference implementation version that you would like to have',
    validate: (customBentoRIVersion) => customBentoRIVersion.match(bentoVersionRegEx),
  },
  customBentoCore: {
    type: 'toggle',
    name: 'customBentoCore',
    message: 'Would you like to install custom @Bento-core package version?',
    initial: true,
    active: 'Yes',
    inactive: 'No',
  },
  customBentoCoreVersion: {
    type: 'text',
    name: 'customBentoCoreVersion',
    message: 'Please Enter @Bento-core package version that you would like to have:',
    validate: (customBentoCoreVersion) => customBentoCoreVersion.match(bentoVersionRegEx),
  },
  gitInit: {
    type: 'toggle',
    name: 'gitInit',
    message: 'Would you like to initialize git?',
    initial: true,
    active: 'Yes',
    inactive: 'No',
  },
};

async function updatePackageJson(gitTag) {
  try {
    const filePath = `${projectPath}/package.json`;
    const fsPromises = fs.promises;
    const fileData = await fsPromises.readFile(filePath).catch((err) => console.error('Failed to read file', err));
    // Converting to JSON
    const packageJson = JSON.parse(fileData);

    // Updating info in packageJson object.
    packageJson.name = projectName;
    packageJson.version = '0.0.1';
    packageJson.bentoFramework = { referenceImplementation: gitTag };

    try {
      await fsPromises.writeFile(filePath, JSON.stringify(packageJson, null, 2));
      console.log('📝 Project name and version="0.0.1" updated in package.json');
      console.log('📝 Successfully recorded the Bento Reference Implementation version used for this application in package.json');
    } catch (err) {
      console.error('Failed to write into the file.', err);
    }
  } catch (error) {
    console.error(error);
    console.error('ERROR: The Bento Reference Implementation version can not be recorded in package.json');
  }
}

async function main() {
  try {
    const { isProjectPathCorrect } = await askQuestion(questions.projectPath);

    // Terminating process if project path is not correct.
    if (!isProjectPathCorrect) {
      console.log('Process terminated.');
      process.exit(1);
    }

    const { bentoRIVersion } = await askQuestion(questions.bentoRIVersion);

    let gitTag;

    if (bentoRIVersion !== 'custom') {
      gitTag = releasedTagMapplings[bentoRIVersion] || undefined;
    } else {
      const { customBentoRIVersion } = await askQuestion(questions.customBentoRIVersion);
      gitTag = customBentoRIVersion;
    }

    if (!gitTag) {
      console.log(`Process terminated due to releasedTagMapplings.json file is missing tag for ${bentoRIVersion}`);
      process.exit(1);
    }

    console.log('Preparing Variables...');
    // Variables for downloading files.
    const repoName = 'bento-frontend';
    const href = `https://github.com/CBIIT/${repoName}/archive`;
    const fileName = `${gitTag}.zip`;
    const source = `${href}/${fileName}`;
    const extractEntryTo = `${repoName}-${gitTag}/packages/bento-frontend/`;
    const outputDir = `${projectPath}/`;

    console.log(`Downloading files from  Bento Reference Implementation version: ${gitTag}`);
    await getAndUnZip({ url: source, extractEntryTo, outputDir });
    console.log('Changing path into project folder......');

    /**
    *   NOTE: chdir() changes the current working directory of
    *   the calling process to the directory specified in path.
    */

    // Changing path into project folder.
    process.chdir(projectPath);

    console.log('Moving files in correct location....');
    execSync(`mv ${extractEntryTo}* ${projectPath}`);

    console.log('Removing useless files....');
    execSync(`rm -rf ${repoName}-${gitTag}`);

    // Recording BentoRI info.
    await updatePackageJson(gitTag);
    execSync(`echo "This project is based on the Bento Reference Implementation ${bentoRIVersion}" > BentoRIVersion.txt`);

    // START Section: Git Init
    const { gitInit } = await askQuestion(questions.gitInit);

    if (gitInit) {
      // Git Init & Commit initial code.
      console.log('Initializing a new repository...');
      execSync('git init');
    }
    // END Section: Git Init

    // Adding some additional files like .gitignore, .eslintignore, .eslintrc.js
    const rawContentURL = `https://raw.githubusercontent.com/CBIIT/${repoName}/${bentoRIVersion}/`;
    console.log('Adding .gitignore');
    execSync(`curl ${rawContentURL}.gitignore --output .gitignore`);

    // Disabling eslintrc files for now.
    // TODO: Needs to have eslint running at bento level and verify.
    // console.log('Adding .eslintignore, .eslintrc.js');
    // execSync(`curl ${rawContentURL}.eslintignore --output .eslintignore`);
    // execSync(`curl ${rawContentURL}.eslintrc.js --output .eslintrc.js`);

    // Renaming package-lock.json.standalone to package-lock.json 📑
    console.log('Renaming package-lock.json.standalone to package-lock.json 📑');
    execSync('mv package-lock.json.standalone package-lock.json');

    // Installing dependencies
    console.log('Installing dependencies... (npm install)');
    execSync('npm install');

    // START Section: Bento Core
    const { customBentoCore } = await askQuestion(questions.customBentoCore);

    if (customBentoCore) {
      // Git Init & Commit initial code.
      const { customBentoCoreVersion } = await askQuestion(questions.customBentoCoreVersion);
      execSync('npm uninstall @bento-core/all');
      execSync(`npm install @bento-core/all@${customBentoCoreVersion}`);
    } else {
      execSync('npm uninstall @bento-core/all');
      execSync('npm install @bento-core/all');
    }
    // END Section: Bento Core

    // START Section: Final
    console.log('✅ Bento App 🍱 set-up is successfully completed!!');
    console.log(`ℹ️  Bento Reference Implementation version ${gitTag} used to setup this application`);
    console.log(`⚠️  Please setup nginx using instructions from "${projectName}/nginx" directory`);
    // END Section: Final
  } catch (error) {
    console.log(error);
  }
}
main();
