const db = require("../models");

const getJSDate = (days) => {
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};
describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", async () => {
    const todo = await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });

    await db.Todo.markAsComplete(todo.id);

    const addedTodo = await db.Todo.findOne({
      where: {
        id: todo.id,
      },
    });
    expect(addedTodo.completed).toBe(true);
  });

  test("Should list the overdue todos", async () => {
    const overdueTodos = await db.Todo.overdue();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: getJSDate(-1),
    });
    const finalOverdueTodos = await db.Todo.overdue();
    expect(finalOverdueTodos.length).toBe(overdueTodos.length + 1);
  });

  test("Should list the due today todos", async () => {
    const dueTodayTodos = await db.Todo.dueToday();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const finalDueTodayTodos = await db.Todo.dueToday();
    expect(finalDueTodayTodos.length).toBe(dueTodayTodos.length + 1);
  });

  test("Should list the due later todos", async () => {
    const dueLaterTodos = await db.Todo.dueLater();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: getJSDate(1),
    });
    const finalDueLaterTodos = await db.Todo.dueLater();
    expect(finalDueLaterTodos.length).toBe(dueLaterTodos.length + 1);
  });
});
