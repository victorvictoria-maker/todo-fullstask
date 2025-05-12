import Joi from "joi";

class AuthValidator {
  public register = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  public login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
}

export default new AuthValidator();
