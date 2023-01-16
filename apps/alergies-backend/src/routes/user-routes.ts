import * as express from 'express';

import {
  createUserController,
  loginUserController,
  refreshTokenController,
} from '../controllers/user-controller';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import { upload } from '../configs/multer-config';

const { auth } = API_ENDPOINTS;
const router = express.Router();

// @Method: POST
// @Path: /api/auth/register
router.post(auth.signup, upload.array('image'), createUserController);

// @Method: POST
// @Path: /api/auth/login
router.post(auth.signin, loginUserController);

// @Method: GET
// @Path: /api/auth/refresh-token?token=<token>
router.get(auth.refresh, refreshTokenController);

export { router as userRouter };
