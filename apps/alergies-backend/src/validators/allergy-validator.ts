import * as Joi from 'joi';
import { AllergyProps } from '../types/allergy-types';

export const AllergyValidator = {
  create_allergy: (data: AllergyProps) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      symptoms: Joi.string().required(),
      severity: Joi.string().required(),
      allergyImage: Joi.string().required(),
      treatments: Joi.string().optional(),
      notes: Joi.string().optional(),
    });
    return schema.validate(data);
  },
  update_allergy: (data) => {
    const schema = Joi.object({
      _id: Joi.number().forbidden(),
    })
      .min(1)
      .unknown(true);
    return schema.validate(data);
  },
};
