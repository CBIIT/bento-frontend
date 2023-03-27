/* eslint-disable */
import React from 'react';
import { GoogleAuthProvider } from './GoogleAuthProvider';

const wrapRootElement = ({ element }) => <GoogleAuthProvider>{element}</GoogleAuthProvider>;

export default wrapRootElement;
