import userRepository from './users/repository';

const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions: any = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_TOKEN;

// lets create our strategy for web token
const strategy = new JwtStrategy(jwtOptions, function(
  jwt_payload: any,
  next: any
) {
  // console.log('payload received', jwt_payload);

  const user = userRepository.getById(jwt_payload._id);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

// use the strategy
passport.use(strategy);

export default passport;
