import { connectToDB } from "../utils/connect.js";
import Todo from "../models/todoModel.js";
import { createError } from "../utils/error.js";

export async function getAllTodos(req, res, next) {
  await connectToDB();
  const todos = await Todo.find({ userId: req.user.id });
  res.status(200).send(todos);
  // res.send("all todos");
}

export async function createTodo(req, res, next) {
  const data = req.body;
  // console.log(data);

  if (!data || !data.title) {
    return next(createError(400, "Title is required"));
  }
  await connectToDB();
  const newTodo = new Todo({ title: data.title, userId: req.user.id });
  await newTodo.save();
  res.status(200).json(newTodo);
}

export async function getSingleTodo(req, res, next) {
  try {
    await connectToDB();
    const todo = await Todo.findById(req.params.id);
    if (!todo) return next(createError(404, "Todo not found"));
    if (todo.userId.toString() !== req.user.id)
      return next(createError(404, "Not authorized"));
    res.status(200).send(todo);
  } catch (error) {
    return next(createError(404, "Todo not found"));
  }
}

export async function updateTodo(req, res, next) {
  const id = req.params.id;
  const data = req.body;
  if (!data) return next(createError(400, "Missing fields!"));
  try {
    await connectToDB();
    const todo = await Todo.findById(id);
    if (todo.userId.toString() !== req.user.id)
      return next(createError(404, "Not authorized"));
    todo.title = data.title || todo.title;
    if (data.isCompleted !== undefined) {
      todo.isCompleted = data.isCompleted;
    }
    await todo.save();
    res.status(200).json({ message: "Todo updated!" });
  } catch (error) {
    return next(createError(500, "Todo not found!"));
  }
}

export async function deleteTodo(req, res, next) {
  try {
    await connectToDB();
    const todo = await Todo.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!todo.deletedCount) return next(createError(400, "Todo not found"));
    res.status(200).json({ message: "Todo deleted!" });
  } catch (error) {
    return next(createError(400, "Something went wrong"));
  }
}
