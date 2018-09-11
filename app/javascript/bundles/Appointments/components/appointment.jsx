import React from 'react';

export const Appointment = ({ appointment }) =>
  <div className='appointment'>
    <h3>{ appointment.title }</h3>
    <p>{ formatDate(appointment.apt_time) }</p>
  </div>
