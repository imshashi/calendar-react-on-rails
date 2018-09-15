import React from 'react';
import { capitalize } from '../../utils/strings';

export const FormErrors = ({ errors }) =>
  <div>
    {Object.keys(errors).map((errorField) => {
      return (
        errors[errorField].map((error) => {
          return <p> { capitalize(errorField) } { error } </p>
        })
      )
    })}
  </div>
