import { FaRegTrashCan } from "react-icons/fa6";

export default function Card() {
  return (
    <div className="flex items-center justify-between p-2 bg-blue-300 rounded shadow-lg mb-2 group">
      <div className="flex items-center">
        <button className="block w-10 h-10 bg-white rounded-full mr-2">
          ✔️
        </button>
        <div>
          <p className="font-semibold">タスク名</p>
          <p className="text-sm">期限: 1月10日</p>
        </div>
      </div>
      <button className="opacity-0 group-hover:opacity-100 transition-all">
        <FaRegTrashCan
          color="red"
          size={20}
          className="hover:opacity-70 transition-all"
        />
      </button>
    </div>
  );
}
