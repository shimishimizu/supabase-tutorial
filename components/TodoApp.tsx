"use client";
import React, { useState } from "react";
import TodoList from "./TodoList";
import { useTodoList } from "../hooks/useTodoList";
import TodoStatusBar from "./TodoStatusBar";

const TodoApp = () => {
  const [isDone, setIsDone] = useState(false);
  const { todoList, title, setTitle, handleSubmit, handleDelete, handleDone } =
    useTodoList();

  return (
    <section className="text-center mb-2 text-2xl font-medium">
      <h1>Supabase Todo App</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="mr-2 shadow-lg outline-none p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="shadow-md p-1 rounded-lg bg-blue-200">Add</button>
      </form>
      <TodoStatusBar isDone={isDone} setIsDone={setIsDone} />
      <TodoList
        todoList={todoList}
        handleDelete={handleDelete}
        handleDone={handleDone}
        isDone={isDone}
      />
    </section>
  );
};

export default TodoApp;
