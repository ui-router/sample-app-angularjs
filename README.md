## UI-Router 1.0 Sample Application

http://ui-router.github.io/sample-app/#/mymessages/inbox/5648b50cc586cac4aed6836f

This sample app is intended to demonstrate a non-trivial ui-router application.

- Multiple sub-modules
- Managed state lifecycle
- Application data lifecycle
- Authentication (simulated)
- Authenticated and unauthenticated states
- REST data retrieval (simulated)

---

### Visualizer

We're using the [State and Transition Visualizer](http://github.com/ui-router/visualizer) to visually represent 
the current state tree, as well as the transitions between states.  Explore how transitions work by hovering
over them, and clicking to expand details (params and resolves).  

Note how states are _entered_ when they were previously not active, _exited_ and re-_entered_ when parameters change,
 and how parent states whose parameters did not change are _retained_.  Each of these (_exited, entered, retained_) 
 correspond to a Transition Hook.

### Structure

The application is written in ES6, and utilizes ES6 modules.  We are loading the modules using SystemJS and es6-module-loader in the browser _(note: currently, we are also transpiling in the browser, but will be transpiling at build-time in the future for better performance/smaller payload)_.

There are many ways to structure a ui-router app.  We aren't super opinionated on application structure.  Use what works for you.  We organized ours in the following way:

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
  - Example: declaring `redirectTo: 'mymessages.folder'` in `mymessages/mymessages.states.js` (mymessages state)
- Defining a default parameter for a state
  - Example: `folderId` parameter defaults to 'inbox' in `mymessages/mymessages.states.js` (folder state)
- Application data lifecycle
  - Data loading is managed by the state declaration, via the `resolve:` block
  - Data is fetched before the state is _entered_
  - Data is fetched according to state parameters
  - The state is _entered_ when the data is ready
  - The resolved data is injected into the components
  - The resolve data remains loaded until the state is exited
 