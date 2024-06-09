import { Todo } from "@/utils/interface";
import { supabase } from "@/utils/supabase";
import { deleteTodo, getAllTodos, insertTodo } from "@/utils/supabaseFunction";
import { useEffect, useState } from "react";

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Todo全件取得
    const getTodos = async () => {
      const todos = await getAllTodos();
      if (todos) {
        setTodoList(todos);
      }
    };
    getTodos();

    fetchRealTimeData();
  }, []);

  // リアルタイム検知
  const fetchRealTimeData = () => {
    supabase
      .channel("todo")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "todo" },
        (payload) => {
          const newTodo = [payload.new];
          setTodoList((todoList) => [...todoList, ...newTodo]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "todo" },
        (payload) => {
          setTodoList((todoList) =>
            todoList.filter((todo) => todo.id !== payload.old.id)
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "todo" },
        (payload) => {
          setTodoList((todoList) =>
            todoList.map((todo) =>
              todo.id === payload.new.id
                ? { isCompleted: payload.new.isCompleted }
                : todo
            )
          );
        }
      )
      .subscribe();

    // リスナーの解除
    return () => {
      supabase.channel("todo").unsubscribe();
    };
  };

  // Todo追加
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await insertTodo(title);
    // const todos = await getAllTodos();
    // if (todos) {
    // setTodoList(todos);
    // }
    setTitle("");
  };

  // Todo削除
  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    // const todos = await getAllTodos();
    // if (todos) {
    //   setTodoList(todos);
    // }
  };

  // Todo完了フラグ
  const handleDone = async (id: number) => {
    await supabase.from("todo").update({ isCompleted: true }).eq("id", id);
  };

  return { todoList, title, setTitle, handleSubmit, handleDelete, handleDone };
};
