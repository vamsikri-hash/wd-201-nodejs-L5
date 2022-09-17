//  createTodosTable.js
const { DataTypes } = require("sequelize");
const { connect, sequelize } = require("./connectDB");

connect()
  .then(() => {
    const Todo = sequelize.define(
      "Todo",
      {
        // Model attributes are defined here
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dueDate: {
          type: DataTypes.DATEONLY,
        },
      },
      {
        tableName: "todo",
      }
    );

    Todo.sync(); // create the table
  })
  .catch((err) => console.error(err));
