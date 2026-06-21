# Last Race

Web Applications I - Exam Project

## Overview

Last Race is a single-page web application developed with React, Node.js, Express, Passport.js, and SQLite.

The game simulates the journey of a student in Turin who must reach a destination station before an exam while facing random events that affect the final score.

---

## Technologies

### Frontend

* React 19
* React Router
* Vite
* CSS

### Backend

* Node.js
* Express
* Passport.js
* express-session

### Database

* SQLite

---

## Main Features

### Authentication

* Session-based login
* Passport.js authentication
* Protected APIs

### Mission Generation

* Random departure station
* Random destination station
* Minimum distance constraint

### Route Planning

* Interactive station selection
* Route validation
* Undo functionality

### Journey Simulation

* Event-based score calculation
* Route execution
* Final score generation

### Ranking

* Global leaderboard
* Best score per player

---

## Screenshots

### Login Page

![Login](docs/login.png)

### Instructions Page

![Instructions](docs/instructions.png)

### Setup Page

![Setup](docs/setup.png)
![Setup](docs/setup-alternative.png)

### Planning Page

![Planning](docs/planning.png)

### Result Page

![Result](docs/result.png)

### Ranking Page

![Ranking](docs/ranking.png)

---

## Environment Configuration

### Server (.env)

```env
PORT=3001
CLIENT_URL=http://localhost:5173
SESSION_SECRET=super-secret-key
```

### Client (.env)

```env
VITE_API_URL=http://localhost:3001/api
```

---

## Default Ports

| Component      | Port |
| -------------- | ---- |
| React Client   | 5173 |
| Express Server | 3001 |

The ports can be modified through the environment variables.

---

## Database Management

### Create Database

```bash
cd server
node scripts/create-db.js
```

### Populate Database

```bash
node scripts/seed-db.js
```

### Reset Database

Remove the existing SQLite database file:

```bash
rm db/database.sqlite
```

Create a fresh database:

```bash
node scripts/create-db.js
node scripts/seed-db.js
```

---

## Running the Application

### Start Server

```bash
cd server
npm install
nodemon index.js
```

### Start Client

```bash
cd client
npm install
npm run dev
```

---

## Test Users

| Email                                     | Password |
| ----------------------------------------- | -------- |
| [fulvio.corno@polito.it] | iLoveWebApp2 |
| [francesca.russo@polito.it]   | iLoveWebApp3|
| [selin.deniz@polito.it]  | iLoveWebApp1 |

The users are automatically inserted by the database initialization script.

---

## HTTP APIs

### Authentication

* POST /api/sessions
* GET /api/sessions/current
* DELETE /api/sessions/current

### Network

* GET /api/network

### Games

* POST /api/games/new
* POST /api/games/submit
* GET /api/games/ranking

---

## Project Structure

```text
client/
├── src/
│   ├── api/
│   ├── assets/
│   ├── pages/
│   └── ...
│
server/
├── dao/
├── db/
├── middleware/
├── passport/
├── route/
├── scripts/
├── utils/
└── ...
```

---

## Database Design

### users

Stores registered users and authentication information.

### stations

Stores all transportation stations.

### lines

Stores transportation lines.

### segments

Stores station-to-station connections.

### events

Stores random journey events and score effects.

### games

Stores submitted routes and achieved scores.

---

## Design Decisions

### Backend

The backend follows a layered architecture:

* Routes manage HTTP requests and responses.
* DAOs manage database access.
* Utilities encapsulate graph algorithms, route validation, and game execution logic.
* Passport.js handles authentication.

### Frontend

The frontend follows a component-based architecture:

* React Router manages navigation.
* Pages are organized by responsibility.
* API calls are centralized in a dedicated API module.
* State is managed through React hooks.

---

## Transportation Network

Last Race is built around a fictional student-themed transportation network inspired by life in Turin.

The network consists of:

* 4 transportation lines
* 15 stations
* Multiple interchange stations
* 15 station-to-station segments

### Example Lines

* Caffeine Line
* Panic Line
* Aperitivo Line
* Startup Line

### Example Stations

* Main Campus
* Central Library
* Exam Center
* Porta Nuova
* Innovation Hub
* Startup District

The transportation network is modeled as a graph and is used to generate missions, validate routes, and compute shortest paths.

---

## Author

Selin Deniz
