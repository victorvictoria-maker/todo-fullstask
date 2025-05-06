import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
} from "../controllers/todo.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, getAllTodos);
router.post("/", verifyToken, createTodo);
router.get("/:id", verifyToken, getSingleTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);

export default router;
