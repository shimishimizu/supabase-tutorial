import { Todo } from "@/utils/interface";
import { deleteTodo, getAllTodos, insertTodo } from "@/utils/supabaseFunction";
import { useEffect, useState } from "react";

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      if (todos) {
        setTodoList(todos);
      }
    };
    getTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await insertTodo(title);
    const todos = await getAllTodos();
    if (todos) {
      setTodoList(todos);
    }
    setTitle("");
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    const todos = await getAllTodos();
    if (todos) {
      setTodoList(todos);
    }
  };

  return { todoList, title, setTitle, handleSubmit, handleDelete };
};
