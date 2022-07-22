/* eslint-disable */
import React from 'react';
import View from './reviewRequestView.js'
 
const ReviewRequestController = ({ match}) => {
 console.log(match.params.id)
 return (
   <View />
 )
}
export default ReviewRequestController;
