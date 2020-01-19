import React, { useState } from "react";
import AddTodo from "../../../modules/addTodo";

const Todo = ({ todo, toggleTodoDoneStatus }) => (
  <li onClick={() => toggleTodoDoneStatus(!todo.isDone)}>
    {todo.isDone ? <strike>{todo.task}</strike> : todo.task}
  </li>
);

const TodoStatus = ({ todoList }) => {
  const totalTodos = todoList.length;
  const remainingTodos = todoList.filter(eachTodo => !eachTodo.isDone).length;
  return `Total todos remaining: ${remainingTodos} out of ${totalTodos}`;
};

const TodoMain = () => {
  const initialToDoList = JSON.parse(localStorage.getItem("todoList")) || [];
  const [todoList, setTodoList] = useState(initialToDoList);

  const addTodo = newTodo => {
    const updatedTodoList = [...todoList, { task: newTodo, isDone: false }];
    updateTodoList(updatedTodoList);
  };

  const toggleTodoDoneStatus = index => doneStatus => {
    const updatedTodoList = todoList.map((eachTodo, idx) =>
      index === idx ? { ...eachTodo, isDone: doneStatus } : eachTodo
    );
    updateTodoList(updatedTodoList);
  };

  const updateTodoList = updatedTodoList => {
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const onRemoveAllTodos = () => {
    setTodoList([]);
    localStorage.removeItem("todoList");
  };

  return (
    <div>
      <h3>Todos :</h3>
      <AddTodo addTodo={addTodo} />
      {todoList.length !== 0 && (
        <div>
          <TodoStatus todoList={todoList} />
          <ul>
            {todoList.map((eachTodo, index) => (
              <Todo
                key={index}
                todo={eachTodo}
                toggleTodoDoneStatus={toggleTodoDoneStatus(index)}
              />
            ))}
          </ul>
          <button onClick={onRemoveAllTodos}>remove all todos</button>
        </div>
      )}
    </div>
  );
};

export default TodoMain;
