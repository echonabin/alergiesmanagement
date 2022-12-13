import { checkDbConnection } from './startup/db-checker';
import { app } from './app';
const port = process.env.NX_PORT || 3333;

checkDbConnection()
  .then((res) => {
    if (res.code !== 'ECONNREFUSED') {
      console.log(res);
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
