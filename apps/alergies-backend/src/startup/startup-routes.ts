import * as express from 'express';
import { Express } from 'express';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import { errorHandler } from '../middlewares/error-handler';
// Routes import
import { userRouter } from '../routes/user-routes';
import { allergyRouter } from '../routes/allergy-routes';

export default (app: Express) => {
  const { base_url } = API_ENDPOINTS;
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Base URL => "/api"
  app.use(base_url, userRouter);
  app.use(base_url, allergyRouter);

  // Incase of 404 (Not Found)
  app.all('*', async (req, res) => {
    res.status(404).json({
      errors: [
        {
          message: 'Route Not Found',
        },
      ],
    });
  });
  app.use(errorHandler);
};
