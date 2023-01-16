import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';

// Startup imports
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import startupRoutes from './startup/startup-routes';

const app = express();
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get(API_ENDPOINTS.base_url, (req, res) => {
  res.send({ message: 'Welcome to alergies-backend!' });
});

startupRoutes(app);

export { app };
