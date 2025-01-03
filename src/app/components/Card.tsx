import { FaRegTrashCan } from "react-icons/fa6";
import { Todo } from "@/app/types/types";

export default function Card(props: {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
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

  return (
    <div className="flex items-center justify-between p-2 bg-blue-300 rounded shadow-lg mb-2 group">
      <div className="flex items-center">
        <button className="block w-10 h-10 bg-white rounded-full mr-2">
          ✔️
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
