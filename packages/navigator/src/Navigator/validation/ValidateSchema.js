/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */

import { ZodError } from "zod";
import { environment } from "../constant/Environment";

export const validateObjects = {
  YAML_NODE: "Validate Node",
};

export const validateProps = (schema, object, componentName) => {
  if (process.env.NODE_ENV !== environment.PRODUCTION) {
    try {
      schema.parse(object);
    } catch (error) {
      console.error(object);
      if (error instanceof ZodError) {
        console.error(`Validation failed in ${componentName}:`, error.errors);
      } else {
        console.error(`Unexpected error in ${componentName}:`, error);
      }
    }
  }
};
