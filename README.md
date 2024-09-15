# MFEPlayground

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.
This project was created to show the power of Dynamic module Federation in Angular. Here you can see many things:
- How to create a library and reference it through various projects
- How to create Micro Frontends (MFE) and host them dinamically inside a shell
- How to load MFE dinamically in a shell component
- How to create a simple message broker
- How to communicate between mfe in a loosely-coupled manner
- The concept of "Microlith" or the "Micro-Monolith", a programming paradigm that aggregates little and simple monolith in a page.

## Development server

Run `npm run start` to start all the projects and test them. The shell responds in port 5000. The MFE1 in port 3000 and the MFE2 in port 3001. Navigate to `http://localhost:5000/` to have a look at the integration. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
