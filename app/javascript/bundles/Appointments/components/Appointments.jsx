import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import AppointmentForm from './AppointmentForm';
import { AppointmentsList } from './AppointmentsList';
import { FormErrors } from './FormErrors';
import moment from 'moment';

class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: { value: '', valid: false },
      apt_time: { value: new Date(), valid: false },
      errors: {},
      formValid: false
    }
  }

  handleUserInput(fieldName, fieldValue, validations) {
    const newFieldState = update(this.state[fieldName],
        { value: { $set: fieldValue } }
      )
    this.setState({ [fieldName]: newFieldState },
      () => { this.validateField(fieldName, fieldValue, validations) });
  }

  validateField(fieldName, fieldValue, validations) {
    let fieldValid;
    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if(e !== '') {
        errors.push(e);
      }
      return errors;
    }, []);

    fieldValid = fieldErrors.length === 0;

    const newFieldState = update(this.state[fieldName],
        { valid: { $set: fieldValid } }
      )

    const newFormErrors = update(this.state.errors,
        {
          $merge: {
            [fieldName]: fieldErrors
          }
        }
      );

    this.setState({ [fieldName]: newFieldState, errors: newFormErrors }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid:
      this.state.title.valid &&
      this.state.apt_time.valid
    })
  }

  handleFormSubmit() {
    const appointment = {
      title: this.state.title.value,
      apt_time: this.state.apt_time.value
    }

    $.post('/appointments',
      { appointment: appointment }
    )
    .done((data) => {
      this.addNewAppointment(data);
      this.resetErrors();
    })
    .fail((response) => {
      console.log(Object.keys(response.responseJSON));
      this.setState({ errors: response.responseJSON });
    });
  }

  addNewAppointment(appointment) {
    const appointments = update(
      this.state.appointments,
      { $push: [appointment] }
    );
    this.setState({
      appointments: appointments.sort(function(a, b){
        return new Date(a.apt_time) - new Date(b.apt_time);
      })
    });
  }

  resetErrors() {
    this.setState({ errors: {} });
  }

  render () {
    return (
      <div>
        <FormErrors errors={ this.state.errors } />
        <AppointmentForm
          title={ this.state.title }
          apt_time={ this.state.apt_time }
          onUserInput={ this.handleUserInput.bind(this) }
          onFormSubmit={ this.handleFormSubmit.bind(this) }
          formValid= { this.state.formValid }
        />
        <AppointmentsList
          appointments={ this.state.appointments }
        />
      </div>
    );
  }
}

export default Appointments;
