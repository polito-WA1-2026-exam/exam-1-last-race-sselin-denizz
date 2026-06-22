import {
    useState,
    useEffect
} from 'react';

import {
    useNavigate
} from 'react-router-dom';

import API
    from '../api/API';

import './css/PlanningPage.css';

function getNeighbors(
    stationId,
    segments
) {

    const neighbors = [];

    for (
        const segment
        of segments
    ) {

        if (
            segment.stationA === stationId
        ) {

            neighbors.push(
                segment.stationB
            );

        }

        if (
            segment.stationB === stationId
        ) {

            neighbors.push(
                segment.stationA
            );

        }

    }

    return neighbors;

}

function PlanningPage({
    game
}) {

    const [network, setNetwork] =
        useState(null);

    const [route, setRoute] =
        useState([
            game.startStation.id
        ]);

    const [canUndo, setCanUndo] =
        useState(false);

    const [submitted, setSubmitted] =
        useState(false);

    const [showMap, setShowMap] =
        useState(true);

    const [timeLeft, setTimeLeft] =
        useState(80);

    const navigate =
        useNavigate();

    function addStation(
        stationId
    ) {

        setRoute(
            currentRoute => [

                ...currentRoute,

                stationId

            ]
        );

        setCanUndo(true);

    }

    function removeLastStation() {

        if (
            !canUndo
        ) {

            return;

        }

        setRoute(
            currentRoute =>
                currentRoute.slice(
                    0,
                    -1
                )
        );

        setCanUndo(false);

    }

    async function submitRoute() {

        try {

            const result =
                await API.submitRoute({

                    startStationId:
                        game.startStation.id,

                    destinationStationId:
                        game.destinationStation.id,

                    route

                });

            setSubmitted(true);

            navigate(
                '/result',
                {
                    state: result,
                    replace: true
                }
            );

        } catch (err) {

            console.error(
                err
            );

        }

    }

    useEffect(() => {

        async function loadNetwork() {

            try {

                const networkData =
                    await API.getNetwork();

                setNetwork(
                    networkData
                );

            } catch (err) {

                console.error(
                    err
                );

            }

        }

        loadNetwork();

    }, []);

    useEffect(() => {

        const previewTimer =
            setTimeout(
                () =>
                    setShowMap(false),
                10000
            );

        return () =>
            clearTimeout(
                previewTimer
            );

    }, []);

    useEffect(() => {

        if (
            showMap
        ) {

            return;

        }

        const countdown =
            setInterval(
                () => {

                    setTimeLeft(
                        current =>
                            current - 1
                    );

                },
                1000
            );

        return () =>
            clearInterval(
                countdown
            );

    }, [showMap]);

    useEffect(() => {

        if (
            timeLeft <= 0
        ) {

            navigate(
                '/result',
                {
                    replace: true,

                    state: {

                        valid: false,

                        finalScore: 0,

                        journey: [
                            {
                                event:
                                    'Time expired'
                            }
                        ]

                    }
                }
            );

        }

    }, [timeLeft]);

    if (!game) {

        return (
            <h1>
                No active game
            </h1>
        );

    }

    if (!network) {

        return (
            <h1>
                Loading network...
            </h1>
        );

    }

    if (showMap) {

        return (

            <div className="planning-page">

                <div className="planning-card">

                    <h1>
                        Memorize The Network
                    </h1>

                    <h2>
                        10 Seconds
                    </h2>

                    <div
                        className="network-preview"
                    >

                        <h3>
                            Caffeine Line
                        </h3>

                        <p>
                            Main Campus
                            →
                            Lingotto Hub
                            →
                            Central Library
                            →
                            Study District
                            →
                            Riverside Campus
                        </p>

                        <h3>
                            Panic Line
                        </h3>

                        <p>
                            Main Campus
                            →
                            Aula Magna
                            →
                            Exam Center
                            →
                            Student Services
                            →
                            Graduation Hall
                        </p>

                        <h3>
                            Aperitivo Line
                        </h3>

                        <p>
                            Riverside Campus
                            →
                            Porta Nuova
                            →
                            Castle Square
                            →
                            Valentino Park
                            →
                            Murazzi
                        </p>

                        <h3>
                            Startup Line
                        </h3>

                        <p>
                            Exam Center
                            →
                            Innovation Hub
                            →
                            Startup District
                            →
                            Lingotto Hub
                        </p>

                    </div>

                </div>

            </div>

        );

    }

    const currentStationId =
        route[
            route.length - 1
        ];

    const destinationReached =

        currentStationId ===
        game.destinationStation.id;

    const availableStations =
        network.stations.filter(
            station =>

                getNeighbors(
                    currentStationId,
                    network.segments
                ).includes(
                    station.id
                )
        );

    return (

        <div className="planning-page">

            <div className="planning-card">

                <h1>
                    Plan Your Journey
                </h1>

                <div
                    className="timer-box"
                >

                    Time Left:
                    {' '}
                    {timeLeft}s

                </div>

                <div className="mission-info">

                    <div className="station-card">

                        <h3>
                            Departure
                        </h3>

                        <p>
                            {game.startStation.name}
                        </p>

                    </div>

                    <div className="station-card">

                        <h3>
                            Destination
                        </h3>

                        <p>
                            {
                                game.destinationStation.name
                            }
                        </p>

                    </div>

                </div>

                <div className="route-box">

                    <h2>
                        Current Route
                    </h2>

                    <div className="route-display">

                        {
                            route.join(
                                ' → '
                            )
                        }

                    </div>

                    <button

                        className="undo-button"

                        onClick={
                            removeLastStation
                        }

                        disabled={
                            !canUndo
                        }

                    >
                        Undo Last Station
                    </button>

                </div>

                <h2>
                    Available Stations
                </h2>

                <div className="stations-grid">

                    {
                        availableStations.map(
                            station => (

                                <button

                                    key={
                                        station.id
                                    }

                                    className="station-button"

                                    onClick={() =>
                                        addStation(
                                            station.id
                                        )
                                    }

                                >

                                    {
                                        station.name
                                    }

                                </button>

                            )
                        )
                    }

                </div>

                <button

                    className="action-button"

                    onClick={
                        submitRoute
                    }

                    disabled={
                        !destinationReached ||
                        submitted
                    }

                >
                    Submit Route
                </button>

            </div>

        </div>

    );

}

export default PlanningPage;