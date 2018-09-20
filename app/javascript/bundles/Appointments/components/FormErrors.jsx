import React from 'react';
import PropTypes from 'prop-types';
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

FormErrors.propTypes = {
  errors: PropTypes.object.isRequired
}
