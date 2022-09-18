const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./connectDB.js");

class Todo extends Model {
  static async addTask(todo) {
    return await Todo.create(todo);
  }

  displayableString() {
    return `${this.title} - ${this.dueDate} - ${this.completed}`;
  }
}
Todo.init(
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
  }
);

Todo.sync();
module.exports = Todo;
