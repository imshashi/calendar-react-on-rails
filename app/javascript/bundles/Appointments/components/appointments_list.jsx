import React from 'react';
import { Appointment } from './appointment';

export const AppointmentsList = ({ appointments }) =>
  <div>
    { appointments.map((appointment) => {
      return (
        <Appointment appointment={ appointment } key={ appointment.id } />
      )
    })}
  </div>
