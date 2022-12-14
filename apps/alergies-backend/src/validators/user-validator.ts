import * as Joi from 'joi';

export const AuthValidator = {
  login_user: (data: { email: string; password: string }) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validate(data);
  },

  register_user: (data) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        .required()
        .min(8)
        .max(20),
      profileUrl: Joi.string().optional(),
    });

    return schema.validate(data);
  },
};
