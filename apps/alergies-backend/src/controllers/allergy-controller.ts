import { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import {
  createAllergyService,
  deleteAlleryService,
  getAllergiesService,
  getSingleAllergyService,
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
}

export const createAllergyController = async (
  req: ExtendedReqObj,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = AllergyValidator.create_allergy(req.body);
    // FIXME: Add Error logic with middleware later
    if (error) {
      next(new RequestValidationError(error));
    }
    const data = {
      ...req.body,
      createdBy: req.auth.account.user_id,
    };
    const response = await createAllergyService(data);
    apiResponse({ response, res, next, statusCode: 201 });
  } catch (error) {
    console.log(error);
  }
};

export const getAllergiesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page ? parseInt(req.query.page.toString()) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10;
  try {
    const data = {
      page,
      limit,
    };
    const response = await getAllergiesService(data);
    apiResponse({ response, res, next, statusCode: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleAllergyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id.toString();
  const response = await getSingleAllergyService(id);
  apiResponse({ response, res, next, statusCode: 200 });
};

export const updateAllergyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = AllergyValidator.update_allergy(req.body);
  if (error) {
    next(new RequestValidationError(error));
  } else {
    const { id } = req.params;
    const response = await updateAllergyService(id, req.body);
    apiResponse({ response, res, next, statusCode: 200 });
  }
};

export const deleteAlleryController = async (
  req: ExtendedReqObj,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { user_id } = req.auth.account;
  try {
    const response = await deleteAlleryService(id, user_id.toString());
    apiResponse({ response, res, next, statusCode: 200 });
  } catch (error) {
    next(error);
  }
};
