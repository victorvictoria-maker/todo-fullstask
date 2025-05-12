// validators/todoValidator.ts
import Joi from "joi";

class TodoValidator {
  public create = Joi.object({
    title: Joi.string().min(1).required().messages({
      "any.required": "Title is required",
      "string.empty": "Title cannot be empty",
    }),
  });

  public update = Joi.object({
    title: Joi.string().min(1).optional(),
    isCompleted: Joi.boolean().optional(),
  }).or("title", "isCompleted");
}

export default new TodoValidator();
