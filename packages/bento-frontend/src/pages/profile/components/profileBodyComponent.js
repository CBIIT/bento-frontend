import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, withStyles } from '@material-ui/core';
import { changeUserBasicInfo } from '../../../bento/profileData';
import TextEditComponent from './textEditComponent';
import style from '../styles';
import { getFromLocalStorage, storeInLocalStorage } from '../../../utils/localStorage';
import custodianUtils from '../../../utils/custodianUtilFuncs';

const ProfileViewBody = ({ classes, data }) => {
  const { getMyUser } = data;
  const [firstName, setFirstName] = useState(getMyUser.firstName);
  const [lastName, setLastName] = useState(getMyUser.lastName);
  const [organization, setOrganization] = useState(getMyUser.organization);

  const [mutate] = useMutation(changeUserBasicInfo, {
    context: { clientName: 'userService' },
    fetchPolicy: 'no-cache',
    onCompleted(responseData) {
      const userDetails = getFromLocalStorage('userDetails');
      setFirstName(responseData.updateMyUser.firstName);
      setLastName(responseData.updateMyUser.lastName);
      setOrganization(responseData.updateMyUser.organization);
      userDetails.firstName = responseData.updateMyUser.firstName;
      userDetails.lastName = responseData.updateMyUser.lastName;
      userDetails.organization = responseData.updateMyUser.organization;
      storeInLocalStorage('userDetails', userDetails);
    },
    onError() {
      /* Check here for what needs to be changed */
    },
  });
  /* const { data: editSuccessData } = response; */

  const completeSave = (value, field) => {
    const variables = { userInfo: { firstName, lastName, organization } };
    variables.userInfo[field] = value;
    mutate({ variables });
  };

  return (
    <>
      <div className={classes.profile_body_container}>
        <div className={classes.splitBodyColumn1}>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>
              <span className={classes.labelSpan}>Account Type: </span>
            </div>
            <TextField
              className={classes.textField}
              value={custodianUtils.getAuthenticatorName(getMyUser.IDP || '')}
              inputProps={{ readOnly: true, className: classes.textFieldInput }}
            />
          </div>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>
              <span className={classes.labelSpan}>Last Name: </span>
            </div>
            <TextEditComponent
              data={`${lastName}`}
              customOptions={{ alt: 'Edit last name', field: 'lastName' }}
              onSave={completeSave}
            />
          </div>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>
              <span className={classes.labelSpan}>First Name: </span>
            </div>
            <TextEditComponent
              data={`${firstName}`}
              customOptions={{ alt: 'Edit first name', field: 'firstName' }}
              onSave={completeSave}
            />
          </div>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>
              <span className={classes.labelSpan}>Organization:</span>
            </div>
            <TextEditComponent
              customOptions={{ alt: 'edit organization', field: 'organization', useLargerField: true }}
              data={organization}
              onSave={completeSave}
            />
          </div>
        </div>
        <div className={classes.splitBodyColumn2} />
      </div>
      <div className="" />
    </>
  );
};

export default withStyles(style, { withTheme: true })(ProfileViewBody);
