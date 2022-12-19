import { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import {
  createAllergyService,
  deleteAlleryService,
  getAllergiesService,
  getSingleAllergyService,
  hardDeleteAllergyService,
  restoreAllergyService,
  updateAllergyService,
} from '../services/allergy-service';
import { apiResponse } from '../utils/resp-normalization';
import { AllergyValidator } from '../validators/allergy-validator';

interface ExtendedReqObj extends Request {
  auth: {
    account: {
      user_id: number;
    };
  };
  files: { location: string }[];
}

export const createAllergyController = async (
  req: ExtendedReqObj,
  res: Response,
  next: NextFunction
) => {
  const { error } = AllergyValidator.create_allergy(req.body);
  // FIXME: Add Error logic with middleware later
  if (error) {
    return next(new RequestValidationError(error));
  }
  const data = {
    ...req.body,
    createdBy: req.auth.account.user_id,
    allergyImage: req.files[0].location,
  };
  const response = await createAllergyService(data);
  apiResponse({ response, res, next, statusCode: 201 });
};

export const getAllergiesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page ? parseInt(req.query.page.toString()) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10;
  const data = {
    page,
    limit,
  };
  const response = await getAllergiesService(data);
  apiResponse({ response, res, next });
};

export const getSingleAllergyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id.toString();
  const response = await getSingleAllergyService(id);
  apiResponse({ response, res, next });
};

export const updateAllergyController = async (
  req: ExtendedReqObj,
  res: Response,
  next: NextFunction
) => {
  const { error } = AllergyValidator.update_allergy(req.body);
  const { user_id } = req.auth.account;
  if (error) {
    return next(new RequestValidationError(error));
  } else {
    const { id } = req.params;
    const data = {
      ...req.body,
    };

    if (req.files.length) {
      Object.assign(data, { allergyImage: req.files[0].location });
    }

    const response = await updateAllergyService(id, data, user_id.toString());
    apiResponse({ response, res, next });
  }
};

export const deleteAlleryController = async (
  req: ExtendedReqObj,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { user_id } = req.auth.account;
  const response = await deleteAlleryService(id, user_id.toString());
  apiResponse({ response, res, next });
};

export const restoreAllergyController = async (
  req: ExtendedReqObj,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { user_id } = req.auth.account;
  const response = await restoreAllergyService(id, user_id.toString());
  apiResponse({ response, res, next });
};

export const hardDeleteAllergyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const response = await hardDeleteAllergyService(id);
  apiResponse({ response, res, next });
};
