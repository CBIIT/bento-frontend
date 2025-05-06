import { ZodError } from 'zod';
import { environment } from '../constant/Environment';

export const validateObjects = {
  YAML_NODE: 'Validate Node',
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
