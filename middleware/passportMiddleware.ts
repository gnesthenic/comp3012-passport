import passport from 'passport';
import PassportConfig from './PassportConfig'; // Import the updated PassportConfig class
import localStrategy from './passportStrategies/localStrategy'; // Import the local strategy
import githubStrategy from './passportStrategies/githubStrategy'; // Import the GitHub strategy

const strategies = [
  localStrategy,
  githubStrategy
];

const passportConfig = new PassportConfig(strategies);

export default (app: any) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
