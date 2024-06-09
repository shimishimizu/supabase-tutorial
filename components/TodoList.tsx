import { Todo } from "@/utils/interface";
import React from "react";

type Props = {
  todoList: Todo[];
  handleDelete: (e: number) => Promise<void>;
  isDone: boolean;
  handleDone: (e: number) => Promise<void>;
};

// @todo: 完了後にリアルタイム反映されない
const TodoList = ({ todoList, handleDelete, isDone, handleDone }: Props) => {
  return (
    <div>
      <ul>
        {todoList
          .filter((todo) => todo.isCompleted === isDone)
          .map((todo) => (
            <li
              key={todo.id}
              className="bg-orange-200 rounded-md my-2 p-2 justify-between flex"
            >
              {todo.title}
              {isDone ? (
                <span
                  className="cursor-pointer"
                  onClick={() => handleDelete(todo.id)}
                >
                  ×
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => handleDone(todo.id)}
                >
                  ✅
                </span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
