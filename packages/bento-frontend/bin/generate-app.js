#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('    npx create-my-boilerplate my-app');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const dummyDirectoryPath = path.join(currentPath, projectName);
const git_repo = 'git@github.com:CBIIT/bento-frontend.git';
const git_branch = 'test_4.0';

try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
      console.log(error);
    }
    process.exit(1);
  }

  async function main() {
    try {
      console.log('Downloading files...');
      // execSync(`git clone --depth 1 -b ${git_branch} ${git_repo} ${projectPath}`);
      // execSync(`mkdir ${dummyDirectoryPath}`);
      // execSync(`cd ${dummyDirectoryPath}`);

      process.chdir(projectPath);
      execSync(`git init`);
      execSync(`git remote add -f origin ${git_repo}`);
      execSync(`git config core.sparseCheckout true`);
      execSync(`echo "packages/bento-frontend" >> .git/info/sparse-checkout`);
      execSync(`git pull origin ${git_branch}`);
      execSync(`mv packages/bento-frontend/* ${projectPath}`);
      execSync(`rm -rf packages`);

      console.log('Installing dependencies...');
      execSync('npm install --legacy-peer-deps');

      console.log('Removing useless files');
      execSync('npx rimraf ./.git');
      fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

      console.log('The installation is done, this is ready to use !');

    } catch (error) {
      console.log(error);
    }
}
main();