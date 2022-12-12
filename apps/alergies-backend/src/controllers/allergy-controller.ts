import { Request, Response } from 'express';
import {
  createAllergyService,
  getAllergiesService,
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
  res: Response
) => {
  try {
    const { error } = AllergyValidator.create_allergy(req.body);
    // FIXME: Add Error logic with middleware later
    if (error) {
      return res.status(400).json({ error });
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
