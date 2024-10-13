const todoList = require("../todo");

describe("TodoList Test Suite", () => {
  let list; // Declare a variable to hold the todoList instance

  beforeAll(() => {
    list = todoList(); // Initialize the instance
    const today = new Date().toISOString().slice(0, 10);
    list.add({
      title: "Test todo",
      completed: false,
      dueDate: today,
    });
  });

  test("Should Add new Todo", () => {
    const todoItemsCount = list.all.length;
    list.add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(list.all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as Complete", () => {
    expect(list.all[0].completed).toBe(false);
    list.markAsComplete(0);
    expect(list.all[0].completed).toBe(true);
  });

  test("Should return Overdue items", () => {
    expect(list.overdue().length).toBe(0);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedYesterday = yesterday.toISOString().slice(0, 10);

    list.add({
      title: "Test todo1",
      completed: false,
      dueDate: formattedYesterday,
    });

    expect(list.overdue().length).toBe(1);
  });

  test("Should return Due Today items", () => {
    expect(list.dueToday().length).toBe(2);
    const today = new Date().toISOString().slice(0, 10);

    list.add({
      title: "Test todo2",
      completed: false,
      dueDate: today,
    });

    expect(list.dueToday().length).toBe(3);
  });

  test("Should return Due Later items", () => {
    expect(list.dueLater().length).toBe(0);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().slice(0, 10);

    list.add({
      title: "Test todo3",
      completed: false,
      dueDate: formattedTomorrow,
    });

    expect(list.dueLater().length).toBe(1);
  });
});
