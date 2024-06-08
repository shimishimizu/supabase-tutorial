"use client";
import React from "react";
import TodoList from "./TodoList";
import { useTodoList } from "../hooks/useTodoList";

const TodoApp = () => {
  const { todoList, title, setTitle, handleSubmit, handleDelete } =
    useTodoList();

  return (
    <section className="text-center mb-2 text-2xl font-medium">
      <h3>Supabase Todo App</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="mr-2 shadow-lg outline-none p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="shadow-md p-1 rounded-lg bg-blue-200">Add</button>
      </form>
      <TodoList todoList={todoList} handleDelete={handleDelete} />
    </section>
  );
};

export default TodoApp;
