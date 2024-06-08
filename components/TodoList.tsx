import { Todo } from "@/utils/interface";
import React from "react";

type Props = {
  todoList: Todo[];
  handleDelete: (e: number) => Promise<void>;
};

const TodoList = ({ todoList, handleDelete }: Props) => {
  return (
    <div>
      <ul>
        <ul>
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className="bg-orange-200 rounded-md my-2 p-2 justify-between flex"
            >
              ☑️ {todo.title}
              <span
                className="cursor-pointer"
                onClick={() => handleDelete(todo.id)}
              >
                ✖︎
              </span>
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};

export default TodoList;
