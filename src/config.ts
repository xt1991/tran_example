import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { merge } from 'lodash';
import logger from './logger';

dotenv.config();
const env = process.env.NODE_ENV;
const configDir = `${__dirname}/configs`;
logger.info(`Loading config from ${configDir} for ${env}`);

export const loadJsonConfigs = (): any => {
  let jsonConfig = {};
  if (env && existsSync(`${configDir}/${env}.json`)) {
    jsonConfig = require(`${configDir}/${env}.json`);
  }

  if (existsSync(`${configDir}/default.json`)) {
    jsonConfig = merge(require(`${configDir}/default.json`), jsonConfig);
  }
  return jsonConfig;
};

export const loadConfigs = (): any => {
  const jsonConfigs = loadJsonConfigs();
  return merge(jsonConfigs, {
    serviceName: process.env.SERVICE_NAME || jsonConfigs.serviceName,
    serverHost: process.env.SERVER_HOST || jsonConfigs.serverHost,
    serverPort: process.env.SERVER_PORT || jsonConfigs.serverPort,
    mongoUri: process.env.MONGO_URI || jsonConfigs.mongoUri,
    mongoPoolSize: Number(
      process.env.MONGO_POOLSIZE || jsonConfigs.mongoPoolSize
    ),
    redisUri: process.env.REDIS_URI || jsonConfigs.redisUri
  });
};

export default loadConfigs();
