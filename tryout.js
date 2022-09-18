const { connect } = require("./connectDB.js");
const Todo = require("./TodoModel.js");

// eslint-disable-next-line no-unused-vars
const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Try Coq",
      dueDate: new Date(),
      completed: false,
    });
    console.log("Created Todo with ID" + todo.id);
  } catch (error) {
    console.info(error);
  }
};

const getTodos = async () => {
  try {
    const todos = await Todo.findAll({
      where: {
        completed: false,
      },
    });
    console.log(todos.map((todo) => todo.displayableString()).join("\n"));
  } catch (err) {
    console.log(err);
  }
};

(async () => {
  //await createTodo();
  await getTodos();
})();
