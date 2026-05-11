# Henry Countries

A full-stack countries explorer built with React, Redux, Express, Sequelize and PostgreSQL. The app lets users browse countries, search and filter results, inspect country details, and create tourist activities associated with one or more countries.

This repository started as a bootcamp individual project and has been stabilized and polished to be portfolio-ready while keeping the original stack and architecture.

## Preview

> Suggested screenshots to add before publishing the portfolio:
>
> - `docs/screenshots/home-desktop.png` — Home page with filters and country cards.
> - `docs/screenshots/details-desktop.png` — Country detail page with activities.
> - `docs/screenshots/create-activity-mobile.png` — Responsive create activity form.
>
> You can generate these manually after running the app locally.

## Tech stack

### Frontend

- React 17
- Redux classic + Redux Thunk
- React Router DOM v5
- Axios
- CSS Modules-style component styles / plain CSS
- SweetAlert2 for lightweight feedback
- Jest + React Testing Library

### Backend

- Node.js
- Express
- Sequelize
- PostgreSQL
- Axios for Rest Countries seeding
- Mocha, Chai and Supertest

### External API

- [Rest Countries](https://restcountries.com/) for the initial countries seed.

## Main features

- Browse countries with flag, name and continent.
- Search countries by partial name.
- Filter by continent.
- Filter by associated tourist activity.
- Sort alphabetically and by population.
- Paginated country grid.
- Country detail page with capital, subregion, area, population and activities.
- Create tourist activities and associate them with multiple countries.
- Responsive UI for desktop, tablet and mobile.
- Basic loading, empty and error states.
- Backend validation for countries, activities and country/activity relationships.

## Architecture overview

```text
PI-Countries/
├── api/
│   ├── index.js              # API startup, DB sync and country seed
│   ├── src/
│   │   ├── app.js            # Express app, middleware, CORS and errors
│   │   ├── db.js             # Sequelize connection and model relations
│   │   ├── models/           # Country and Activity models
│   │   └── routes/           # /countries and /activities routes
│   └── tests/                # Backend model and route tests
└── client/
    ├── public/
    └── src/
        ├── Actions/          # Redux actions and API calls
        ├── Components/       # UI pages/components
        ├── Reducer/          # Redux reducer and reducer tests
        └── Store/            # Redux store
```

The frontend and backend are designed to be deployed separately. The frontend reads the API base URL from `REACT_APP_API_URL`, and the backend reads the allowed client origin from `CLIENT_URL`.

## Environment variables

### Backend (`api/.env`)

Create a local file from the example:

```bash
cd api
cp .env.example .env
```

Available variables:

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `PORT` | No | API port. | `3001` |
| `NODE_ENV` | No | Runtime environment. | `development` |
| `CLIENT_URL` | Yes for deploy | Frontend origin allowed by CORS. | `http://localhost:3000` |
| `DB_USER` | Yes locally | PostgreSQL username. | `postgres` |
| `DB_PASSWORD` | Yes locally | PostgreSQL password. | `postgres` |
| `DB_HOST` | Yes locally | PostgreSQL host. | `localhost` |
| `DB_PORT` | No | PostgreSQL port. | `5432` |
| `DB_NAME` | No | PostgreSQL database name. | `countries` |
| `DATABASE_URL` | Deploy alternative | Full PostgreSQL connection string. Takes precedence over `DB_*`. | `postgres://user:pass@host:5432/db` |
| `COUNTRIES_API_URL` | No | Rest Countries seed endpoint. | `https://restcountries.com/v3.1/all` |

### Frontend (`client/.env`)

Create a local file from the example:

```bash
cd client
cp .env.example .env
```

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `REACT_APP_API_URL` | Yes for deploy | Base URL of the backend API without a trailing slash. | `http://localhost:3001` |

> Create React App only exposes variables prefixed with `REACT_APP_`.

## Installation

### Prerequisites

- Node.js and npm
- PostgreSQL
- A PostgreSQL database named `countries` for local development

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd PI-Countries
```

### 2. Install backend dependencies

```bash
cd api
npm install
cp .env.example .env
```

Update `api/.env` with your local PostgreSQL credentials.

### 3. Install frontend dependencies

```bash
cd ../client
npm install
cp .env.example .env
```

Update `client/.env` if your API does not run on `http://localhost:3001`.

## Running locally

Start the backend:

```bash
cd api
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm start
```

Open `http://localhost:3000`.

On first backend startup, countries are loaded from Rest Countries if the `countries` table is empty. Existing data is preserved on restart.

## Available scripts

### Backend (`api`)

| Script | Description |
| --- | --- |
| `npm start` | Starts the API with `node index.js` for production-like environments. |
| `npm run dev` | Starts the API with Nodemon for local development. |
| `npm test` | Runs backend tests once. |
| `npm run test:watch` | Runs backend tests in watch mode. |

### Frontend (`client`)

| Script | Description |
| --- | --- |
| `npm start` | Starts the CRA development server. |
| `npm run build` | Creates a production build. |
| `npm test -- --watchAll=false` | Runs frontend tests once. |
| `npm test` | Runs frontend tests in interactive/watch mode. |

## API endpoints

Base URL in local development: `http://localhost:3001`

### Countries

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/countries` | Returns all countries with associated activities. |
| `GET` | `/countries?name=arg` | Returns countries matching a partial, case-insensitive name search. |
| `GET` | `/countries/:id` | Returns one country by 3-letter country code and its activities. |

### Activities

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/activities` | Returns activities with associated country IDs and minimal country details. |
| `POST` | `/activities` | Creates an activity and associates it with countries by ID. |

Example `POST /activities` body:

```json
{
  "name": "Hiking",
  "difficulty": 3,
  "duration": 4,
  "season": "Summer",
  "countries": ["ARG", "BRA"]
}
```

## Testing

Backend:

```bash
cd api
npm test
```

Frontend:

```bash
cd client
npm test -- --watchAll=false
```

Build check:

```bash
cd client
npm run build
```

## Deployment preparation

The app is ready for separate frontend/backend deployment.

### Backend deployment checklist

- Set `NODE_ENV=production`.
- Set `PORT` if required by your hosting provider.
- Set `DATABASE_URL` or all `DB_*` variables.
- Set `CLIENT_URL` to the deployed frontend URL.
- Ensure the PostgreSQL database exists and is reachable.
- Run `npm start` from the `api` folder.

### Frontend deployment checklist

- Set `REACT_APP_API_URL` to the deployed backend URL.
- Run `npm run build` from the `client` folder.
- Deploy the generated `client/build` folder.

## Responsive support

The UI includes responsive layouts for:

- Desktop country grid and filters.
- Tablet filter wrapping.
- Single-column mobile Home, Details and Create Activity views.
- Mobile-friendly search and form controls.

## Future improvements

- Add real screenshots/GIFs under `docs/screenshots`.
- Add end-to-end tests with Cypress or Playwright.
- Add server-side pagination if the dataset grows.
- Add auth for admin-only activity management.
- Add image optimization for static assets.
- Improve internationalization if the app targets Spanish and English users.
- Add a production-ready migration workflow instead of relying only on `sequelize.sync()`.

## Author

**Eduardo Damián Gómez**

- GitHub: [Eduman8](https://github.com/Eduman8)
- LinkedIn: [Eduardo Damián Gómez](https://www.linkedin.com/in/eduardo-dami%C3%A1n-g%C3%B3mez-89a432217/)

## Portfolio status

This project is suitable as a junior frontend/fullstack portfolio piece after adding screenshots and deployment URLs. It demonstrates full-stack CRUD-style flow, API integration, relational data modeling, Redux state management, responsive UI work and basic testing.
