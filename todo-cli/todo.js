const todoList = () => {
  all = [];
  const today = new Date().toISOString().slice(0, 10);
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    let overdueTodo = [];
    all.forEach(({ title, dueDate, completed }) => {
      if (dueDate < today) {
        overdueTodo.push({ title, dueDate, completed });
      }
    });
    return overdueTodo;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    let dueodayTodo = [];
    all.forEach(({ title, dueDate, completed }) => {
      if (dueDate === today) {
        dueodayTodo.push({ title, dueDate, completed, fl: 1 });
      }
    });
    return dueodayTodo;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    let duelaterTodo = [];
    all.forEach(({ title, dueDate, completed }) => {
      if (dueDate > today) {
        duelaterTodo.push({ title, dueDate, completed });
      }
    });
    return duelaterTodo;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    let finalString = [];
    list.forEach(({ title, dueDate, completed, fl }) => {
      if (fl) {
        if (completed) {
          finalString.push(`[x] ${title}`);
        } else {
          finalString.push(`[ ] ${title}`);
        }
      } else {
        if (completed) {
          finalString.push(`[x] ${title} ${dueDate}`);
        } else {
          finalString.push(`[ ] ${title} ${dueDate}`);
        }
      }
    });
    return finalString.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

module.exports = todoList;
