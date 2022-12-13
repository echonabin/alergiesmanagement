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
      id: Joi.number().forbidden(),
      name: Joi.string().forbidden(),
      symptoms: Joi.string().optional(),
      severity: Joi.string().optional(),
      allergyImage: Joi.string().optional(),
      treatments: Joi.string().optional(),
      notes: Joi.string().optional(),
    }).min(1);
    return schema.validate(data);
  },
};
