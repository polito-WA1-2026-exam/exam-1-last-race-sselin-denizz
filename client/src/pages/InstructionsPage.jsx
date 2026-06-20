import { useNavigate }
    from 'react-router-dom';

import './css/InstructionsPage.css';

function InstructionsPage() {

    const navigate =
        useNavigate();

    return (

        <div className="instructions-page">

            <div className="instructions-card">

                <div className="floating-icons">
                    🎓 🚇 🎲 💰
                </div>

                <h1>
                    Last Race
                </h1>

                <p className="subtitle">
                    Mission Briefing
                </p>

                <div className="instructions-content">

                    <div className="rule-card">

                        <p>

                            <strong>
                                🎓 Exam week has arrived.
                            </strong>

                        </p>

                        <p>
                            Reach your destination before
                            the chaos of student life
                            defeats you.
                        </p>

                    </div>

                    <div className="rule-card">

                        <p>

                            <strong>
                                🚇 Travel through Turin's metro network
                            </strong>

                        </p>

                        <p>
                            Move from station to station
                            and find a valid route to your
                            destination.
                        </p>

                    </div>

                    <div className="rule-card">

                        <p>

                            <strong>
                                🎲 Expect the unexpected
                            </strong>

                        </p>

                        <p>
                            Every trip may trigger random
                            events that help or hurt your
                            final score.
                        </p>

                    </div>

                    <div className="rule-card">

                        <p>

                            <strong>
                                💰 Collect coins
                            </strong>

                        </p>

                        <p>
                            Good decisions and lucky
                            events increase your score.
                        </p>

                    </div>

                    <div className="rule-card">

                        <p>

                            <strong>
                                🏆 Beat the ranking
                            </strong>

                        </p>

                        <p>
                            Finish with the highest score
                            possible and climb the
                            leaderboard.
                        </p>

                    </div>

                </div>

                <div className="objective-badge">

                    Current Objective:
                    Survive Exam Week.

                </div>

                <button
                    onClick={() =>
                        navigate('/setup')
                    }
                >
                    START NEW RACE
                </button>

            </div>

        </div>

    );

}

export default InstructionsPage;