import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';

import {
    getUserByEmail,
    getUserById
} from '../dao/user-dao.js';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },

        async (email, password, done) => {

            try {

                const user =
                    await getUserByEmail(email);

                if (!user)
                    return done(
                        null,
                        false,
                        { message: 'Incorrect email or password.' }
                    );

                const hashedPassword =
                    crypto
                        .scryptSync(
                            password,
                            user.salt,
                            32
                        )
                        .toString('hex');

                if (hashedPassword !== user.hash)
                    return done(
                        null,
                        false,
                        { message: 'Incorrect email or password.' }
                    );

                return done(
                    null,
                    {
                        id: user.id,
                        email: user.email,
                        name: user.name
                    }
                );

            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser(
    (user, done) => {
        done(null, user.id);
    }
);

passport.deserializeUser(
    async (id, done) => {

        try {

            const user =
                await getUserById(id);

            done(null, user);

        } catch (err) {
            done(err);
        }

    }
);

export default passport;