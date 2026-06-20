import express from "express";
import session from "express-session";
import dotenv from "dotenv";

import passport from "./passport/passport-config.js";
import authRoutes from './route/auth-routes.js';
import networkRoutes from './route/network-routes.js';
import gameRoutes from './route/game-routes.js';

import corsMiddleware
    from './middleware/cors-middleware.js';

dotenv.config();

const app = new express();

app.use(corsMiddleware);

app.use(express.json());

const port = process.env.PORT;
const sessionSecret = process.env.SESSION_SECRET;

app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRoutes);
app.use('/api', networkRoutes);
app.use('/api', gameRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});