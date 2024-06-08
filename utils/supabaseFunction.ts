import { supabase } from "./supabase";

export const getAllTodos = async () => {
  const todos = await supabase.from("todo").select("*");
  return todos.data;
};

export const insertTodo = async (inputTitle: string) => {
  const { error } = await supabase.from("todo").insert({ title: inputTitle });
};

export const deleteTodo = async (id: number) => {
  const response = await supabase.from("todo").delete().eq("id", id);
};
