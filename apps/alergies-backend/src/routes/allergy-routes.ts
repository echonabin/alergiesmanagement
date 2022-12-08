import * as express from 'express';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import { createAllergyController } from '../controllers/allergy-controller';
import { authorize } from '../middlewares/authorization';

const router = express.Router();
const { allergies } = API_ENDPOINTS;

// @Method: POST
// @Path: /api/allergy
router.post(allergies.create, authorize(), createAllergyController);

export { router as allergyRouter };
