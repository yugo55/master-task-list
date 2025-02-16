import { FaRegTrashCan } from "react-icons/fa6";
import { Todo } from "@/app/types/types";
import { useState } from "react";
import { fetchProgress } from "@/utils/fetchProgress";

// 親コンポーネントで月毎の進捗率の状態管理をする → 状態変数progressにそれぞれの月の進捗率を格納

export default function Card(props: {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  progress: { month: number; progress: number }[];
  setProgress: React.Dispatch<
    React.SetStateAction<{ month: number; progress: number }[]>
  >;
}) {
  const [isCompleted, setIsCompleted] = useState(props.todo.is_completed);

  const removeTodo = async (
    id: number,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  ) => {
    try {
      const res = await fetch("/api/todos/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "タスク削除に失敗しました。");
      }

      setTodos(todos.filter((todo) => todo.id !== result[0].id));
    } catch (error: any) {
      console.error("タスク削除に失敗しました:", error.message);
      alert("タスクの削除に失敗しました。");
    }
  };

  const completeTodo = async (id: number, month: number) => {
    try {
      const res = await fetch("/api/todos/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "タスク完了に失敗しました。");
      }

      setIsCompleted((prev) => (prev === 1 ? 0 : 1));

      const userId = localStorage.getItem("user_id");
      fetchProgress(month.toString(), userId, props.setProgress);
    } catch (error: any) {
      console.error("タスク完了に失敗しました。");
      alert("タスク完了に失敗しました。");
    }
  };

  return (
    <div className="flex items-center justify-between p-2 bg-blue-300 rounded shadow-lg mb-2 group">
      <div className="flex items-center">
        <button
          onClick={() => completeTodo(props.todo.id, props.todo.month)}
          className={`block w-10 h-10 rounded-full mr-2 ${
            isCompleted === 1 ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          ✔︎
        </button>
        <div>
          <p className="font-semibold">{props.todo.title}</p>
          <p className="text-sm">
            期限: {props.todo.deadline?.toString() || "なし"}
          </p>
        </div>
      </div>
      <button
        className="opacity-0 group-hover:opacity-100 transition-all"
        onClick={() => removeTodo(props.todo.id, props.todos, props.setTodos)}
      >
        <FaRegTrashCan
          color="red"
          size={20}
          className="hover:opacity-70 transition-all"
        />
      </button>
    </div>
  );
}
