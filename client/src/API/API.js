const SERVER_URL =
    'http://localhost:3001/api';

async function login(
    credentials
) {

    const response =
        await fetch(
            `${SERVER_URL}/sessions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json'
                },
                credentials:
                    'include',
                body:
                    JSON.stringify(
                        credentials
                    )
            }
        );

    if (!response.ok)
        throw new Error(
            'Login failed'
        );

    return response.json();

}

async function getNetwork() {

    const response =
        await fetch(
            `${SERVER_URL}/network`,
            {
                credentials:
                    'include'
            }
        );

    if (!response.ok)
        throw new Error(
            'Network fetch failed'
        );

    return response.json();

}

async function createGame() {

    const response =
        await fetch(
            `${SERVER_URL}/games/new`,
            {
                method: 'POST',
                credentials:
                    'include'
            }
        );

    if (!response.ok)
        throw new Error(
            'Game creation failed'
        );

    return response.json();

}

async function submitRoute(
    game
) {

    const response =
        await fetch(
            `${SERVER_URL}/games/submit`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json'
                },
                credentials:
                    'include',
                body:
                    JSON.stringify(
                        game
                    )
            }
        );

    if (!response.ok)
        throw new Error(
            'Route submission failed'
        );

    return response.json();

}

async function getRanking() {

    const response =
        await fetch(
            `${SERVER_URL}/games/ranking`
        );

    if (!response.ok)
        throw new Error(
            'Ranking fetch failed'
        );

    return response.json();

}

const API = {

    login,

    getNetwork,

    createGame,

    submitRoute,

    getRanking

};

export default API;