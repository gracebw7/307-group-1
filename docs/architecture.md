# Architecture

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

Deployment: Deployment is from the 'CI/CD' branch, all pushes to this branch will be deployed to backend deployment and static frontend deployment.

Structure:
The app is structured to use a Router to navigate the different pages, which in turn use the different components.

# Project Structure

## Pages
- Home
- PropertyPage
- Login
- Signup

## Components
- PropertyForm
- PropertySummary
- ReviewCard
- ReviewForm
- Reviews
- SearchBar

## Page Component Relationships:

- **Home** -uses-> **PropertyForm**, **SearchBar**
- **PropertyPage** -uses-> (**PropertySummary** -uses-> **ReviewForm**), (**Reviews** -uses-> **ReviewCard**)

*Note that some components use other components.*


# API Endpoints:

## GET Routes
- `/properties/:_id`
- `/properties/:_id/reviews`
- `/reviews/:_id`
- `/properties`
- `/review`
- `/search` (for queries)  
  *(Note: this should be converted to work with /properties)*

## POST Routes
- `/properties`
- `/properties/:_id/reviews`

## Models and Services

### Property
#### Attributes
- Name
- Address
- Reviews
- Average Rating
- Tags

#### Services
- `getProps`
- `findPropertyById`
- `addProperty`
- `addPropertyReview`

### Review
#### Attributes
- Author
- Rating
- Tags
- Body

#### Services
- `getReviews`
- `getReviewById`
- `addReview`

## File Structure
- `.github`
  - `workflows` (for deployment with every push)
- `docs` (README, contributing, architecture, other info)
- `node_modules`
- `packages`
  - `express-backend` (all backend-related code)
    - `coverage` (Jest coverage reports)
    - `jest-testing` (test cases for backend)
      - `models` (Jest tests for backend models)
      - `services` (Jest tests for backend services)
    - `models` (models for property, review, user)
    - `services` (services for properties and reviews)
    - `.env` (add environment variables here for MongoDB and auth)
    - `backend.js` (backend API calls)
    - `auth.js` (authentication implementation)
    - `jest.config.js` (Jest configured to track coverage for models and services)
    - `eslint.config.js` (ESLint configuration and rules)
  - `react-frontend` (all frontend-related code)
    - `build`
    - `dist`
    - `node_modules`
    - `public` (contains Vite image)
    - `src` (relevant application code)
      - `assets` (image folder)
      - `components` (reusable frontend components)
      - `pages` (frontend app pages for home and properties)
      - `App.jsx` (links and routes to pages & components)
      - `App.css` (styling for main page)
      - `index.css` (default styling)
      - `Login & Signup pages`
- `.gitignore` (node_modules, dist, .env)
- `package.json` (scripts & dependencies)
- prettier configuration
