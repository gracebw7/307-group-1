|-.github
|-|-workflows (for deployment w/ every push)
|-docs (readme, contributing, architecture, other info)
|- node_modules
|-packages
|
|-express-backend (all backend related code)
|-|-coverage (jest coverage reports)
|-|-jest-testing (test cases for backend)
|-|-|-models (jest test for backend models)
|-|-|- services (jest tests for backend services)
|-|-models (models for property, review, user)
|-|-services (services for properties and reviews)
|-|-.env (add enviornments variables here for mongo and auth)
|-|-backend.js (backend api calls)
|-|-auth.js (authentication implementation)
|-|-jest.config.js (jest configured to track coverage for models and services)
|-|-eslint.config.js (ESLint configuration and rules)
|
|-react-frontend (all frontend related code)
|-|-build 
|-|-dist
|-|-node_modules
|-|-public (contains vite image)
|-|-src (relevant application code)
|-|-|-assests (image folder)
|-|-|-components (reused frontend components)
|-|-|-pages (frontend app pages for home and properties)
|-|-|- App.jsx (Links and routes to pages & components)
|-|-|- App.css (styling for main page)
|-|-|- index.css (default styling)
|-|-|- Login & Signup pages
|
|-.gitignore (node_modules, dist, .env)
|-package.json (scripts & dependencies)
|-prettier configuration

