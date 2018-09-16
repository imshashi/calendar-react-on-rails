import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.props.onUserInput(fieldName, fieldValue);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  setAptTime(e) {
    const fieldName = 'apt_time';
    const fieldValue = e.toDate();

    this.props.onUserInput(fieldName, fieldValue);
  }

  render() {
    const inputProps = {
      name: 'apt_time'
    }
    return (
      <div>
        <h3> Make a new appointment </h3>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input
            name="title"
            placeholder="Appointment Title"
            value={ this.props.title }
            onChange={ this.handleChange.bind(this) }
          />
          <Datetime
            input={ false }
            inputProps={ inputProps }
            value={ this.props.apt_time }
            onChange={ this.setAptTime.bind(this) }
          />
          <input
            type="submit"
            value="Make Appointment"
            className='submit-button'
            disabled={ !this.props.formValid }
          />
        </form>
      </div>
    );
  }
}

AppointmentForm.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default AppointmentForm;
