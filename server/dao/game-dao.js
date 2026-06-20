import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db/database.sqlite');

export function createGame(game) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO games (
                userId,
                startStationId,
                destinationStationId,
                submittedRoute,
                score,
                playedAt
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(
            sql,
            [
                game.userId,
                game.startStationId,
                game.destinationStationId,
                game.submittedRoute,
                game.score,
                game.playedAt
            ],
            function(err) {

                if (err)
                    reject(err);
                else
                    resolve(this.lastID);

            }
        );

    });

}