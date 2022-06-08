import express from 'express';
import logger from '@loaders/logger';
import loaders from '@loaders/index';
import { getLocalIP as localIP } from '@utils/index';
import { LANG } from '@utils/index';

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 8080;
  const environment = process.env.ENVIRONMENT;
  await loaders(app);

  app.listen({ port }, () => {
    if (environment === 'DEV')
      logger.info(LANG.setup.server_listen(localIP(), port));
    else console.log(LANG.setup.server_listen(localIP(), port));
  });
};

startServer();
