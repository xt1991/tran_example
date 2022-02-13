import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { AddressInfo } from 'net';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
// import battleHandler from './battles/handler';
import config from './config';
import logger from './logger';

import passport from './passport';

import authController from './auth/controller';
import userController from './users/controller';
import postController from './posts/controller';

//Set up default mongoose connection
const mongoDB = config.mongoUri;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', logger.error.bind(console, 'MongoDB connection error:'));

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: '*'
  }
});

if (!process.env.PORT) {
  logger.error('PORT is not defined');
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

//Socket.io router
const onConnection = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  logger.info('socket is connected', socket.id);
  // battleHandler(io, socket);
};

app.get('/ping', (_req, res) => res.send('pong'));

//Rest api router
app.use('/auth', authController);
app.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  userController
);
app.use(
  '/posts',
  passport.authenticate('jwt', { session: false }),
  postController
);

//Socket.io router
io.on('connection', onConnection);

httpServer.listen(PORT, function() {
  const host = (httpServer.address() as AddressInfo).address;
  const port = (httpServer.address() as AddressInfo).port;
  logger.info(`App listening at http://${host}:${port}`);
});
