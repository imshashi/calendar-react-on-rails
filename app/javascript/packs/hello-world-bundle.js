import ReactOnRails from 'react-on-rails';

import AppRouter from '../bundles/AppRouter/components/AppRouter';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  AppRouter,
});
