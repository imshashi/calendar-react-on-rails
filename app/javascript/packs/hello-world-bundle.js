import ReactOnRails from 'react-on-rails';

import Appointments from '../bundles/Appointments/components/Appointments';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Appointments,
});
