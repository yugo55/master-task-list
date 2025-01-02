import { FaCirclePlus } from "react-icons/fa6";

export default function TaskInput() {
  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <input
        type="text"
        placeholder="タスク名を入力..."
        className="bg-[#d6d6d6] border-b-2 border-white outline-none px-1 flex-grow"
      />
      <input type="date" className="bg-[#d6d6d6] outline-none" />
      <button>
        <FaCirclePlus size={35} color="#3b82f6" className="hover:opacity-70" />
      </button>
    </div>
  );
}
