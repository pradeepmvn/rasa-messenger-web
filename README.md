# RasaMessengerWeb

A simple Angular Material interface to interact with rasa-ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.1.

## Development server
``git clone https://github.com/pradeepmvn/rasa-messenger-web``
Update rasa_ui_api under src/environments/environment.ts to point to correct host and port (rasa-ui is a prerequisite. It can be setup from my Fork @ https://github.com/pradeepmvn/rasa-ui or from original repository @ https://github.com/paschmann/rasa-ui)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


![Screenshot1](https://github.com/pradeepmvn/rasa-messenger-web/blob/master/screenshot.png)


Coming up :
- web socket enablement on rasa-ui and its integration
- integration with rasa_core
- Add clickable random intents with previous entities
