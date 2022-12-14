import * as express from 'express';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import {
  createAllergyController,
  deleteAlleryController,
  getAllergiesController,
  getSingleAllergyController,
  hardDeleteAllergyController,
  restoreAllergyController,
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

// @Method: DELETE
// @Path: /api/allergy/{id}
router.delete(allergies.delete, authorize(), deleteAlleryController);

// @Method: DELETE
// @Path: /api/allergy/hard-delete/{id}
router.delete(allergies.hardDelete, authorize(), hardDeleteAllergyController);

// @Method: Put
// @Path: /api/restore-allergy/{id}
router.put(allergies.restore, authorize(), restoreAllergyController);

export { router as allergyRouter };
