Electron feature
================

Electron needs web assets (index.html, CSS and JS) to present anything meaningful. It is just like a browser,
but with no browsers controls visible and with some additional features (e.g. reading files from user's filesystem).

This is why React development server needs to be ran when developing the application (even if it should only use
Electron, no web version) or, if packing for users to download, all UI-related assets should be built with
the React built tool.

Development
-----------

To develop the app, React dev server has to be running and then Electron can be called to display the content instead of
a browser. When any React component is changed, the same hot replacement system as in web is triggered, putting an updated
version of the component into the app.

Normally, two commands should be called:

1. Run React dev server: `yarn --cwd frontend start`
2. Run Electron: `yarn electron-dev`

To make things easier, Foreman was added to the project. Foreman is a tool that takes care of running an application.
It uses Procfile, where details about what should be ran are provided. Using Foreman, one command is sufficent:

```
yarn electron-app-dev
```

This command will start the React dev server, then wait until it accepts connections and call Electron. However, it does not run
the API server.

Build
-----

This part is not implemented yet, as first we need to replace the API server. When this is done, calling React's build
and then Electron's pack commands should be enough to get installation package(s).

Testing
-------

Testing can be done as usual, using `test` and `test:integration` commands. The integration tests will still use browser,
but it should not be a problem as the same assets are used both in browser and in Electron.
