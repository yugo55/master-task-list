import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

export default function TaskInput(props: { month: number }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const addTask = async (title: string, deadline?: Date | null) => {
    try {
      const created_at = new Date();
      const month = props.month;
      const formattedDeadline = deadline
        ? deadline.toISOString().split("T")[0]
        : null;
      const formattedCreatedAt = created_at
        .toISOString()
        .replace("T", " ")
        .slice(0, 19);
      const res = await fetch("/api/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          formattedDeadline,
          formattedCreatedAt,
          month,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "タスク追加に失敗しました。");
      }

      setTitle("");
      setDeadline(null);
    } catch (error: any) {
      console.error("タスク追加に失敗しました:", error.message);
      alert("タスク追加に失敗しました。");
    }
  };

  return (
    <div className="@[300px]:flex-row mb-2 flex flex-col items-center justify-between gap-3">
      <input
        type="text"
        placeholder="タスク名を入力..."
        className="@[300px]:flex-grow bg-[#d6d6d6] border-b-2 border-white outline-none px-1 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="@[300px]:contents @[260px]:items-center items-center flex justify-between w-full">
        <input
          type="date"
          className="bg-[#d6d6d6] outline-none"
          value={deadline ? deadline.toISOString().split("T")[0] : ""}
          onChange={(e) => setDeadline(new Date(e.target.value))}
        />
        <button
          onClick={() => {
            addTask(title, deadline);
          }}
        >
          <FaCirclePlus
            size={35}
            color="#3b82f6"
            className="hover:opacity-70"
          />
        </button>
      </div>
    </div>
  );
}
