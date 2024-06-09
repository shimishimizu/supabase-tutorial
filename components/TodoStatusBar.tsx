import React from "react";

const TodoStatusBar = ({
  isDone,
  setIsDone,
}: {
  isDone: boolean;
  setIsDone: any;
}) => {
  return (
    <div>
      <span
        className={` ${isDone ? "text-gray-400 cursor-pointer" : "text-black"}`}
        onClick={() => setIsDone((prev) => prev && !prev)}
      >
        未完了
      </span>
      ｜
      <span
        className={` ${isDone ? "text-black" : "text-gray-400 cursor-pointer"}`}
        onClick={() => setIsDone((prev) => !prev && !prev)}
      >
        完了
      </span>
    </div>
  );
};

export default TodoStatusBar;
