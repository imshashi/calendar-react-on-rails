import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import AppointmentForm from './appointment_form';
import { AppointmentsList } from './appointments_list';
import { FormErrors } from './form_errors';

class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: '',
      apt_time: '',
      errors: {}
    }
  }

  handleUserInput(obj) {
    this.setState(obj);
  }

  handleFormSubmit() {
    const appointment = {
      title: this.state.title,
      apt_time: this.state.apt_time
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
        />
        <AppointmentsList
          appointments={ this.state.appointments }
        />
      </div>
    );
  }
}

Appointments.propTypes = {
  appointments: PropTypes.array.isRequired
};

export default Appointments;
