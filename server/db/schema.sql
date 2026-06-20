DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS segments;
DROP TABLE IF EXISTS station_lines;
DROP TABLE IF EXISTS lines;
DROP TABLE IF EXISTS stations;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL
);

CREATE TABLE stations (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE lines (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE station_lines (
    stationId INTEGER,
    lineId INTEGER,

    PRIMARY KEY (stationId, lineId),

    FOREIGN KEY (stationId)
        REFERENCES stations(id),

    FOREIGN KEY (lineId)
        REFERENCES lines(id)
);

CREATE TABLE segments (
    id INTEGER PRIMARY KEY,

    stationA INTEGER NOT NULL,
    stationB INTEGER NOT NULL,

    lineId INTEGER NOT NULL,

    FOREIGN KEY (stationA)
        REFERENCES stations(id),

    FOREIGN KEY (stationB)
        REFERENCES stations(id),

    FOREIGN KEY (lineId)
        REFERENCES lines(id)
);

CREATE TABLE events (
    id INTEGER PRIMARY KEY,

    description TEXT NOT NULL,

    effect INTEGER NOT NULL
);

CREATE TABLE games (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    userId INTEGER NOT NULL,

    startStationId INTEGER NOT NULL,

    destinationStationId INTEGER NOT NULL,

    submittedRoute TEXT NOT NULL,

    score INTEGER NOT NULL,

    playedAt TEXT NOT NULL,

    FOREIGN KEY(userId)
        REFERENCES users(id),

    FOREIGN KEY(startStationId)
        REFERENCES stations(id),

    FOREIGN KEY(destinationStationId)
        REFERENCES stations(id)
);