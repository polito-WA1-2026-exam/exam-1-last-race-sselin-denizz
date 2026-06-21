import {
    useLocation,
    useNavigate
} from 'react-router-dom';

import './css/ResultPage.css';

function ResultPage() {

    const location =
        useLocation();

    const navigate =
        useNavigate();

    const result =
        location.state;

    if (!result) {

        return (

            <div className="result-page">

                <div className="result-card">

                    <h1>
                        No Result Found
                    </h1>

                    <button

                        className="action-button"

                        onClick={() =>
                            navigate('/setup')
                        }

                    >
                        Start New Game
                    </button>

                </div>

            </div>

        );

    }

    return (

        <div className="result-page">

            <div className="result-card">

                <div className="floating-icons">
                    🏆 ✨ 🚇
                </div>

                <h1>
                    Journey Complete
                </h1>

                <div className="score-box">

                    <h2>
                        Final Score
                    </h2>

                    <div className="score-value">

                        {result.finalScore}

                    </div>

                </div>

                <div className="journey-box">

                    <h2>
                        Journey Events
                    </h2>

                    {
                        result.journey?.length > 0 ?

                            result.journey.map(
                                (
                                    journeyEvent,
                                    index
                                ) => (

                                    <div

                                        key={index}

                                        className="event-card"

                                    >

                                        {
                                            journeyEvent.event
                                        }

                                    </div>

                                )
                            )

                            :

                            <p>
                                No events occurred.
                            </p>

                    }

                </div>

                <div className="result-actions">

                    <button

                        className="secondary-button"

                        onClick={() =>
                            navigate('/setup')
                        }

                    >
                        Play Again
                    </button>

                    <button

                        className="action-button"

                        onClick={() =>
                            navigate('/ranking')
                        }

                    >
                        Ranking
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ResultPage;