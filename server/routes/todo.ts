import express, { RequestHandler } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
} from "../controllers/todo";
import { verifyToken } from "../utils/verify";
import { validate } from "../middlewares/validate";
import todoValidator from "../validators/todoValidator";

const router = express.Router();

router.get("/", verifyToken, getAllTodos as unknown as RequestHandler);
router.post(
  "/",
  verifyToken,
  validate(todoValidator.create),
  createTodo as RequestHandler
);
router.get("/:id", verifyToken, getSingleTodo as RequestHandler);
router.put(
  "/:id",
  verifyToken,
  validate(todoValidator.update),
  updateTodo as RequestHandler
);
router.delete("/:id", verifyToken, deleteTodo as RequestHandler);

export default router;
