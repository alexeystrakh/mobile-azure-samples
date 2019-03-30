const TaskDao = require("../models/TaskService");

class AzureStorageService {
  constructor() {}

  async showTasks(req, res) {
    const querySpec = {
      query: "SELECT * FROM root r",
      parameters: []
    };

    const items = await this.taskDao.find(querySpec);
    res.status(200).send(items);
  }

  async addTask(req, res) {
    const item = req.body;

    await this.taskDao.addItem(item);
    res.status(200).send(item);
  }

  async completeTask(req, res) {
    const completedTasks = req.body;

    await this.taskDao.updateItem(completedTasks);
    res.status(200).send("success");
  }
}

module.exports = TaskList;
