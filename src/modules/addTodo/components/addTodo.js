import React, { useState } from "react";

const AddTodo = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const onAdd = () => {
    if (newTodo) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        placeholder="Enter your todo here"
        onChange={event => setNewTodo(event.target.value)}
      />
      <button onClick={onAdd}>Add</button>
    </div>
  );
};

export default AddTodo;
