const express = require("express");
const router = express.Router();
const todo = require("../controllers/todo");

router.post("/todo/createTodo", todo.createTodo);

router.get("/todo/getAllTodo", todo.getAllTodo);

router.put("/todo/updateTodo", todo.updateTodo);

router.delete("/todo/deleteTodo/:todoId", todo.deleteTodo);

module.exports = router;
