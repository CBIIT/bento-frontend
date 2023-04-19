import React, { forwardRef } from 'react';
import { Slide } from '@material-ui/core';

export const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default Transition;
