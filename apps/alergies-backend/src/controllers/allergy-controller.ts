import { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import {
  createAllergyService,
  getAllergiesService,
  getSingleAllergyService,
  updateAllergyService,
} from '../services/allergy-service';
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
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
  }
};

export const getAllergiesController = async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page.toString()) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10;
  try {
    const data = {
      page,
      limit,
    };
    const response = await getAllergiesService(data);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleAllergyController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id.toString();
  const response = await getSingleAllergyService(id);
  res.status(200).json({ response });
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
    res.status(200).json({ response });
  }
};
