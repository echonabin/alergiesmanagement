import db from '../db/db';

export const checkDbConnection = async () => {
  try {
    await db.raw('SELECT 1');
    return '🗄️ Database Connected Successfully!!';
  } catch (error) {
    console.error(error);
    return error;
  }
};
