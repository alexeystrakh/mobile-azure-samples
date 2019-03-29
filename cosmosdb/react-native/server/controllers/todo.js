// const Todo = require("../models/todo");
const db = require("../db");

exports.createTodo = async function(req, res) {
  try {
    console.log(req.body);
    req.body.completed = false;
    let todo = await db.conn
      .database("to_do")
      .container("toDoList")
      .items.create(req.body);
    res.json({ error: 0, data: todo.body });
  } catch (err) {
    res.status(400).json({ error: 1, err: err });
  }
};

exports.getAllTodo = async function(req, res) {
  try {
    const querySpec = {
      query: "SELECT * FROM toDoList"
    };
    let item = await db.conn
      .database("to_do")
      .container("toDoList")
      .items.query(querySpec)
      .toArray();
    res.json({ error: 0, data: item.result });
  } catch (err) {
    res.status(400).json({ error: 1, err: err });
  }
};

exports.updateTodo = async function(req, res) {
  try {
    let data = await db.conn
      .database("to_do")
      .container("toDoList")
      .item(req.body.id)
      .replace(req.body);
    res.json({ error: 0, data: data.body });
  } catch (err) {
    res.status(400).json({ error: 1, err: err });
  }
};

exports.deleteTodo = async function(req, res) {
  try {
    let data = await db.conn
      .database("to_do")
      .container("toDoList")
      .item(req.params.todoId)
      .delete();
    res.json({ error: 0, data: data.result });
  } catch (err) {
    res.status(400).json({ error: 1, err: err });
  }
};
