import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationError: Errors = {};
  err.inner.forEach(error => {
    validationError[error.path || 'any'] = error.message;
  });
  return validationError
}