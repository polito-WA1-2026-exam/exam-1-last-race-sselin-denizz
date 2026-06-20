import './App.css'

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import { useState } from 'react';

import InstructionsPage
    from './pages/InstructionsPage';

import LoginPage
    from './pages/LoginPage';

import RankingPage
    from './pages/RankingPage';

import SetupPage
    from './pages/SetupPage';

import PlanningPage
    from './pages/PlanningPage';

import ResultPage
    from './pages/ResultPage';

function App() {

    const [user, setUser] = useState(null);

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={
                        <LoginPage
                            setUser={setUser}
                        />
                    }
                />

                <Route
                    path="/instructions"
                    element={
                        <InstructionsPage />
                    }
                />

                <Route
                    path="/setup"
                    element={
                        <SetupPage />
                    }
                />

                <Route
                    path="/ranking"
                    element={
                        <RankingPage />
                    }
                />

                <Route
                    path="/planning"
                    element={
                        <PlanningPage />
                    }
                />

                <Route
                    path="/result"
                    element={
                        <ResultPage />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;