import express from 'express';
import flash from 'connect-flash'
import session from 'express-session';
import MongoStore from 'connect-mongo';

import {
  homeRoutes,
  loginRoute,
} from './routes/_Index';
import globalMiddleware from './Middlewares/globalMiddleware';

require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

const sessions = session({
  secret: 'osdjcidsjcsi',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
});
app.use(sessions);

app.use(flash());
app.use(globalMiddleware);

app.use('/', homeRoutes);
app.use('/', loginRoute);

export default app;
