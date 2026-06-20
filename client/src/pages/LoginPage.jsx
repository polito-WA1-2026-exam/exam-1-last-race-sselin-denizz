import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './css/LoginPage.css';

import API
    from '../api/API';

function LoginPage({ setUser }) {

    const [email, setEmail] =
        useState('');

    const [password, setPassword] =
        useState('');

    const navigate = useNavigate();

    async function handleLogin() {

        try {

            const user =
                await API.login({

                    email,
                    password

                });

            setUser(user);

            navigate(
                '/instructions'
            );

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="floating-icons">
                    ☕ 📚 🚇
                </div>

                <h1>
                    Last Race
                </h1>

                <p>
                    Survive exam week in Turin
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button onClick={handleLogin}>
                    Start Journey
                </button>

            </div>

        </div>

    );

}

export default LoginPage;