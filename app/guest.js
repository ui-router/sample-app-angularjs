import {app} from "./app.module";

let guestTemplate = `
  <div>
    <p>Welcome! This is the sample app.  Blah blah blah.  Click links, etc. yay.</p>
  </div>
`;

app.config(($stateProvider) => {
  $stateProvider.state({
    name: 'guest',
    url: '/welcome',
    template: guestTemplate
  });
});
