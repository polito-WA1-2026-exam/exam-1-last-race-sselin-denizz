import express from 'express';

import {
    getStations,
    getSegments,
    getStationLines
} from '../dao/network-dao.js';

import {
    buildGraph,
    shortestDistance
} from '../utils/graph-utils.js';

import {
    validateRoute
} from '../utils/route-validator-utils.js';

const router = express.Router();

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    return res
        .status(401)
        .json({
            error: 'Not authenticated'
        });

}

// POST /api/games/new
router.post(
    '/games/new',

    isLoggedIn,

    async (req, res) => {

        try {

            const stations =
                await getStations();

            const segments =
                await getSegments();

            const graph =
                buildGraph(segments);

            const start =
                stations[
                    Math.floor(
                        Math.random() * stations.length
                    )
                ];

            let destination;
            let distance;

            do {

                destination =
                    stations[
                        Math.floor(
                            Math.random() * stations.length
                        )
                    ];

                distance =
                    shortestDistance(
                        graph,
                        start.id,
                        destination.id
                    );

            } while (
                start.id === destination.id ||
                distance < 3
            );

            console.log(
                start.name,
                '->',
                destination.name,
                distance
            );

            res.json({

                startStation: start,

                destinationStation:
                    destination,

                distance

            });

        } catch (err) {

            res
                .status(500)
                .json(err);

        }

    }
);

// POST /api/games/submit
router.post(
    '/games/submit',

    isLoggedIn,

    async (req, res) => {

        try {

            const {
                startStationId,
                destinationStationId,
                route
            } = req.body;

            const segments =
                await getSegments();

            const stationLines =
                await getStationLines();

            const valid =
                validateRoute(
                    route,
                    startStationId,
                    destinationStationId,
                    segments,
                    stationLines
                );

            res.json({
                valid
            });

        } catch (err) {

            res
                .status(500)
                .json(err);

        }

    }
);

export default router;