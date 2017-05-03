import * as express from 'express';
import { buses } from './buses';
import { login } from './login';
import { routes } from './routes';
import { stops } from './stops';
import { drivers } from './drivers';
import { messages } from './messages';

export function init(app: express.Application) { 
    login(app);
    buses(app);
    routes(app);
    stops(app);
    drivers(app);
    messages(app);
}