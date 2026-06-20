import cors from 'cors';

const corsMiddleware =
    cors({
        origin:
            process.env.CLIENT_URL || 'http://localhost:5173',
        credentials:
            true
    });

export default corsMiddleware;