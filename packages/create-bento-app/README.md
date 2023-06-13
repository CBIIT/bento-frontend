# 🍱 Creating new project from Bento References Implementation

This script allows you to easily set up a new project using Bento References Implementation. It automates the process and asks you a few questions to configure the setup.

## Usage

To create a new project from Bento References Implementation, follow these steps:

1. Open your terminal or command prompt.
2. Run the following command in your terminal:
```javascript
npx create-bento-app <Project-Name>
```
3. The script will prompt you with some questions to configure the setup. Here are the questions and possible answers:

   1. Is the project path correct? Options: Yes or No.
      - If you select "No," the script will stop. Please make sure to provide the correct project path.
      - If you select "Yes," the script will continue.

   2. Please select a Bento Reference Implementation version.
      - You can select a version from the pre-defined list or enter a custom version number.
      - If you choose "custom," please enter the version number in semantic version format (e.g., 0.0.0 or 1.2.3.4).

   3. Would you like to initialize git? Options: No / Yes.
      - If you select "Yes," the script will initialize a git repository in the project directory.
      - If you select "No," the script will skip git initialization.

   4. Would you like to install a custom @Bento-core package version? Options: No / Yes.
      - If you select "Yes," the script will ask you to enter the @Bento-core package version in semantic version format (e.g., 0.0.0 or 1.2.3.4).
      - If you select "No," the script will skip the custom package installation.

4. Once the script finishes executing, your new project will be set up using Bento References Implementation.

## Additional Instructions

⚠️ If your project requires Authentication and Authorization, please set up nginx using the instructions provided in the "nginx" directory.
