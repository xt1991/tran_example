import { connect, connection, set } from 'mongoose';
import config from '../config';
import logger from '../logger';

export const connectMongo = () =>
  new Promise<void>((resolve, reject) => {
    const mongoUri = config.mongoUri;
    const connectionOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      poolSize: config.mongoPoolSize
    };

    if (!mongoUri) {
      throw new Error('Mongo URI is require to connect Db');
    }
    connection.on('error', (err: any) => {
      logger.error('error while connecting to mongodb', err);
    });

    // connection.once('error', reject); // reject first error
    // Set up database event handlers:
    connection.once('error', function(err) {
      logger.error('Unable to connect to database.  Error: ' + err);
    });

    connection.once('open', () => {
      connection.off('error', reject);
      logger.info('mongoose is connected');
      resolve();
    });

    connection.on('reconnected', () => {
      logger.info('Connection to mongodb is resumed');
    });

    connection.on('disconnected', () => {
      logger.error('Mongodb disconnected');
    });

    set('useCreateIndex', true);
    connect(mongoUri, connectionOptions);
  });
