import passport from "passport";
import passportJWT from 'passport-jwt';
import User from '../models/User'

const { Strategy, ExtractJwt } = passportJWT;

const secret = process.env.SECRET_OR_KEY || 'akfsdjalskjaskjlkjf';
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
}

const strategy = new Strategy(options, function(payload, next) {
    User.findOne({ _id: payload.id })
    .then(result => {
        return next(null, result)
    })
    .catch(err => {
        return next(err)
    })
});

passport.use(strategy);

export default passport;
export { secret };
export const auth = passport.authenticate('jwt', { session: false });