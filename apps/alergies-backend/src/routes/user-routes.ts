import * as express from 'express';
import {
  createUserController,
  loginUserController,
} from '../controllers/user-controller';

const router = express.Router();

// @Method: POST
// @Path: /api/auth/register
router.post('/auth/register', createUserController);

// @Method: POST
// @Path: /api/auth/login
router.post('/auth/login', loginUserController);

export { router as userRouter };
