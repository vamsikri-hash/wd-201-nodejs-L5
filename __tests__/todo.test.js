const todoList = require("../todo");

const formatDate = (date) => date.toLocaleDateString("en-CA");
let date = new Date();
const today = formatDate(date);
const yesterday = formatDate(new Date(date.setDate(date.getDate() - 1)));
const tomorrow = formatDate(new Date(date.setDate(date.getDate() + 2)));

const todos = [
  { title: "Submit assignment", dueDate: yesterday, completed: false },
  { title: "Pay rent", dueDate: today, completed: true },
  { title: "Service Vehicle", dueDate: today, completed: false },
  { title: "File taxes", dueDate: tomorrow, completed: false },
  { title: "Pay electric bill", dueDate: tomorrow, completed: false },
];

const addTestData = (add, todos) => todos.forEach(add);

/* eslint-disable no-undef */
describe("Todo List Test Suite", () => {
  test("Should add a new todo", () => {
    const { all, add } = todoList();
    expect(all.length).toEqual(0);
    add({
      title: "A test item",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toEqual(1);
  });

  test("Should mark a todo as complete", () => {
    const { all, markAsComplete, add } = todoList();
    add({
      title: "A test item",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toEqual(1);
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Should list the overdue todos", () => {
    const { all, overdue, add } = todoList();
    addTestData(add, todos);
    expect(all.length).toEqual(5);
    expect(overdue().length).toEqual(1);
  });

  test("Should list the due today todos", () => {
    const { all, dueToday, add } = todoList();
    addTestData(add, todos);
    expect(all.length).toEqual(5);
    expect(dueToday().length).toEqual(2);
  });

  test("Should list the due later todos", () => {
    const { all, dueLater, add } = todoList();
    addTestData(add, todos);
    expect(all.length).toEqual(5);
    expect(dueLater().length).toEqual(2);
  });
});
