## UI-Router for AngularJS 1.0 - Sample Application

http://ui-router.github.io/sample-app-angularjs/#/mymessages/inbox/5648b50cc586cac4aed6836f

[![Greenkeeper badge](https://badges.greenkeeper.io/ui-router/sample-app-angularjs.svg)](https://greenkeeper.io/)
[![Travis badge](https://travis-ci.org/ui-router/sample-app-angularjs.svg?branch=master)](https://travis-ci.org/ui-router/sample-app-angularjs?branch=master)

This sample app is intended to demonstrate a non-trivial ui-router application.

- Multiple sub-modules
- Managed state lifecycle
- Application data lifecycle
- Authentication (simulated)
- Authenticated and unauthenticated states
- REST data retrieval (simulated)
- Lazy loaded AngularJS module (contacts submodule)
- [Sticky States](https://github.com/ui-router/sticky-states) with [Deep State Redirect](https://github.com/ui-router/dsr)

---

### Visualizer

We're using the [State and Transition Visualizer](http://github.com/ui-router/visualizer) to visually represent 
the current state tree, as well as the transitions between states.
Explore how transitions work by hovering over them, and clicking to expand details (params and resolves).

Note how states are _entered_ when they were previously not active, _exited_ and re-_entered_ when parameters change,
 and how parent states whose parameters did not change are _retained_.

### Structure

The application is written in ES6 (transpiled using babel), and utilizes ES6 modules.
We are loading the modules and creating bundles using webpack 4.

There are many ways to structure a ui-router app.
We aren't super opinionated on application structure.
Use what works for you.
We organized ours in the following way:

- Sub-module (feature) organization
  - Each feature gets its own directory. 
  - Features contain states and components
  - Specific types of helper code (directives, services, etc) _used only within a feature_ may live in a subdirectory 
  named after its type (`/mymessages/directives`)
- Leveraging ES6 modules
  - Each state is defined in its own file
  - Each component (controller + template) is defined in its own file
  - Components exported themselves
  - Components are then imported into a states where they are composed into the state definition.
  - States export themselves
  - The `feature.module.js` imports all states for the feature and registers then with the `$stateProvider`
- A single angular module is defined for the entire application
  - Created, then exported from `bootstrap/ngmodule.js`
  - The ng module is imported into some other module whenever services, config blocks, directives, etc need 
  to be registered with angular.
  
### UI-Router Patterns
  
- Defining custom, app-specific global behaviors
  - Add metadata to a state, or state tree
  - Check for metadata in transition hooks
  - Example: `routerhooks/redirectTo.js`
    - If a transition directly to a state with a `redirectTo` property is started, 
    the transition will be redirected to the state which the property names.
  - Example: `routerhooks/authRequired.js`
    - If a transition to a state with a truthy `data.authRequired: true` property is started
    and the user is not currently authenticated
- Defining a default substate for a top-level state
  - Example: declaring `redirectTo: 'welcome'` in `app.states.js`
- Defining a default parameter for a state
  - Example: `folderId` parameter defaults to 'inbox' in `mymessages.states.js` (folder state)
- Application data lifecycle
  - Data loading is managed by the state declaration, via the `resolve:` block
  - Data is fetched before the state is _entered_
  - Data is fetched according to state parameters
  - The state is _entered_ when the data is ready
  - The resolved data is injected into the components
  - The resolve data remains loaded until the state is exited
- Lazy Loaded states
  - The Contacts submodule (all its states and components) are lazy loaded
  - The Contacts "future state" (a placeholder) is added in `bootstrap/ngmodule.js`
  - [ocLazyLoad](https://oclazyload.readme.io/) is used to lazy load the angular module
- Deep State Redirect (DSR)
  - DSR used on the `contacts` and `mymessages` top level states
  - When a substate of a DSR state is activated, the state and parameters are memorized
  - When `contacts` or `mymessages` is activated again, the transition redirects to the memorized deep state and params
- Sticky States
  - Sticky States are enabled on the `contacts` and `mymessages` top level states
  - The modules' views (including DOM) and state are retained when a different module is activated
  - When returning to the module, the inactive state is reactivated
  - The views are restored (unhidden)
