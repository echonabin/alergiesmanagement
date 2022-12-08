import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
// Startup imports
import startupRoutes from './startup/startup-routes';
import { checkDbConnection } from './startup/db-checker';

const port = process.env.NX_PORT || 3333;
const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get(API_ENDPOINTS.base_url, (req, res) => {
  res.send({ message: 'Welcome to alergies-backend!' });
});

checkDbConnection()
  .then((res) => {
    if (res.code !== 'ECONNREFUSED') {
      // Startup Routes
      startupRoutes(app);

      const server = app.listen(port, () => {
        console.log(`⚡️Server listening at http://localhost:${port}/api`);
      });

      server.on('error', (err) => {
        app.response.json({ message: 'Error in server', err: { err } });
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });
