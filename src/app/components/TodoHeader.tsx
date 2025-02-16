import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { Target } from "@/app//types/types";
import { fetchProgress } from "@/utils/fetchProgress";

export default function TodoHeader(props: {
  month: number;
  targets: Target[];
  setTargets: React.Dispatch<React.SetStateAction<Target[]>>;
  progress: { month: number; progress: number }[];
  setProgress: React.Dispatch<
    React.SetStateAction<{ month: number; progress: number }[]>
  >;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  let formattedMonth = props.month.toString().slice(4, 6);
  if (formattedMonth[0] === "0") {
    formattedMonth = formattedMonth.slice(1, 2);
  }

  useEffect(() => {
    const month = props.month.toString();
    const userId = localStorage.getItem("user_id");

    fetchProgress(month, userId, props.setProgress);
  }, []);

  const addTarget = async (
    content: string,
    targets: Target[],
    setTargets: React.Dispatch<React.SetStateAction<Target[]>>
  ) => {
    try {
      const month = props.month;
      const user_id = localStorage.getItem("user_id");
      const res = await fetch("/api/targets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          month,
          user_id,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "目標追加に失敗しました。");
      }

      setTargets([...targets, result[0]]);
      setContent("");
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const getTargetsByMonth = (month: number) => {
    return props.targets.filter((target) => target.month === month);
  };

  return (
    <div
      onClick={() => setIsModalOpen(true)}
      className="bg-[#37555e] rounded p-2 shadow-lg mb-3 relative cursor-pointer after:opacity-0 after:transition-all after:duration-200 hover:after:content-[''] hover:after:block hover:after:absolute hover:after:inset-0 hover:after:bg-white hover:after:opacity-40 group"
    >
      <p className="text-center font-bold text-xl text-white">
        {formattedMonth}月
      </p>
      <div className="flex items-center">
        <span className="bg-[#d4f0f9] grid items-center w-12 h-12 text-center rounded-full mr-2">
          {props.progress.find((p) => p.month === props.month)?.progress ?? 0}%
        </span>
        <div className="w-[80%] h-2 bg-[#d4f0f9] rounded-full">
          <span className="block w-[90%] h-2 bg-blue-500 rounded-full" />
        </div>
      </div>
      <p className="absolute font-semibold opacity-0 inset-0 place-items-center grid z-10 group-hover:opacity-100 transition-all duration-200">
        目標を確認
      </p>

      {isModalOpen &&
        createPortal(
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-5 w-[90%] max-w-[800px] relative text-black max-h-[90%] overflow-y-auto"
            >
              <div className="flex justify-between mb-3">
                <p className="text-2xl font-bold">{formattedMonth}月</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-auto block hover:opacity-60"
                >
                  <FaXmark size={30} />
                </button>
              </div>
              <p className="text-xl font-bold">目標</p>
              <ul className="mb-2">
                {getTargetsByMonth(props.month).map((target) => (
                  <li key={target.id} className="flex items-center group">
                    <FaRegTrashCan
                      color="red"
                      className="mr-1 hidden group-hover:block cursor-pointer hover:opacity-60"
                      // onClick={() =>
                      //   setTargets(targets.filter((t) => t !== target))
                      // }
                    />
                    {target.content}
                  </li>
                ))}
              </ul>
              <textarea
                placeholder="目標を追加..."
                className="outline-none w-full mb-1"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                className="bg-[#3b82f6] p-3 rounded-full text-white font-bold block ml-auto"
                onClick={() => {
                  addTarget(content, props.targets, props.setTargets);
                }}
              >
                追加
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
