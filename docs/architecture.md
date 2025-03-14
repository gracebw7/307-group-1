App Info: We used prettier and ESLint throughout the project.
'npm run dev' starts the backend and the frontend using
concurrently. 'npm start' will start the backend and build the
frontend. 'npm run test' will run the jest tests in the backend
workplace.

Backend Info: We used MongoDB as our database, we also used
Express and Node to handle our API calls. We separated our
models and services and connected everything in our backend.js
file. We used Jest for at least 80% coverage for testing our
backend models and services. We also used cors, nodemon, &
cross-env for backend scripts and debugging. 'npm run test' will
run the jest tests in the backend. 'npm start' will start the
backend. 'npm run lint' will run linting.

Frontend Info: We used React & Vite as our frontend framework.
We used Chakra UI as our frontend component library. 'npm run
build' will build our frontend. 'npm run lint' will run linting.

File Structure: |-.github |-|-workflows (for deployment w/ every
push) |-docs (readme, contributing, architecture, other info) |-
node_modules |-packages | |-express-backend (all backend related
code) |-|-coverage (jest coverage reports) |-|-jest-testing
(test cases for backend) |-|-|-models (jest test for backend
models) |-|-|- services (jest tests for backend services)
|-|-models (models for property, review, user) |-|-services
(services for properties and reviews) |-|-.env (add enviornments
variables here for mongo and auth) |-|-backend.js (backend api
calls) |-|-auth.js (authentication implementation)
|-|-jest.config.js (jest configured to track coverage for models
and services) |-|-eslint.config.js (ESLint configuration and
rules) | |-react-frontend (all frontend related code) |-|-build
|-|-dist |-|-node_modules |-|-public (contains vite image)
|-|-src (relevant application code) |-|-|-assests (image folder)
|-|-|-components (reused frontend components) |-|-|-pages
(frontend app pages for home and properties) |-|-|- App.jsx
(Links and routes to pages & components) |-|-|- App.css (styling
for main page) |-|-|- index.css (default styling) |-|-|- Login &
Signup pages | |-.gitignore (node_modules, dist, .env)
|-package.json (scripts & dependencies) |-prettier configuration
