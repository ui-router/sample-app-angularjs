import {app} from "../app.module.js";

app.run(($state, $transitions) => {
  // Matches if the destination state has a 'redirectTo' property
  let matchCriteria = { to: (state) => state.redirectTo != null };
  // Function that returns a redirect for a transition, with a TargetState created using the desitionat state's 'redirectTo' property
  let redirectFn = ($transition$) => $transition$.redirect($state.targetState($transition$.to().redirectTo));
  // Register the redirectTo hook
  $transitions.onBefore(matchCriteria, redirectFn);
});
