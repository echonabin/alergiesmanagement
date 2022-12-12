import * as express from 'express';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import {
  createAllergyController,
  getAllergiesController,
  getSingleAllergyController,
  updateAllergyController,
} from '../controllers/allergy-controller';
import { authorize } from '../middlewares/authorization';

const router = express.Router();
const { allergies } = API_ENDPOINTS;

// @Method: POST
// @Path: /api/allergy
router.post(allergies.create, authorize(), createAllergyController);

// @Method: GET
// @Path: /api/allergies
router.get(allergies.get, authorize(), getAllergiesController);

// @Method: GET
// @Path: /api/allergy/{id}
router.get(allergies.getOne, authorize(), getSingleAllergyController);

// @Method: PUT
// @Path: /api/allergy/{id}
router.put(allergies.update, authorize(), updateAllergyController);

export { router as allergyRouter };
