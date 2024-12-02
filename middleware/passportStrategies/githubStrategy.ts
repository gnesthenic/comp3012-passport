import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { database, userModel } from '../../models/userModel';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "Ov23liOXpV9IDpjarfTM",
        clientSecret: "46c5879be41bd7db5216237e3697698a4084048c",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
        console.log(profile) //
        const user = {
            id: Number(profile.id),
            name: profile.username
        }

        const foundUser = userModel.findById(profile.id); 
        if(!foundUser){
            database.push(user);
            done(null, user);
        }else{
            done(null, foundUser);
        }
        
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
