import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { heroesRouter } from './modules/hero-module/router.js';
import { questsRouter } from './modules/quest-module/router.js';

const app = express();

// Body parser packaged required to get the body of requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS for interfacing with frontend
app.use(cors({ origin: true }));

// The routers of the app
app.use(heroesRouter());
app.use(questsRouter());

// Initial base route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API!');
});

app.listen(3000, () => {
    console.log(`API is listening on port 3000`);
});

