import express from "express";
import session from "express-session";
import dotenv from "dotenv";

import passport from "./passport/passport-config.js";

dotenv.config();

const app = new express();
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

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});