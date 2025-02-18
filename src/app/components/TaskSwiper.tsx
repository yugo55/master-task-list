import Card from "@/app/components/Card";
import TodoHeader from "@/app/components/TodoHeader";
import TaskInput from "@/app/components/TaskInput";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useEffect } from "react";
import { Todo, Target } from "@/app/types/types";
import { useRouter } from "next/navigation";

export default function TaskSwiper() {
  const [allYearAndMonth, setAllYearAndMonth] = useState<number[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [targets, setTargets] = useState<Target[]>([]);
  const [progress, setProgress] = useState<
    { month: number; progress: number }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      router.push("/login");
      return;
    }
    const query = new URLSearchParams({ user_id }).toString();

    setAllYearAndMonth(
      Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString().padStart(2, "0");
        return Number(`${new Date().getFullYear()}${month}`);
      })
    );

    const fetchTodos = async () => {
      try {
        const res = await fetch(`/api/todos?${query}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("タスクの取得に失敗しました。");
        }

        const result: Todo[] = await res.json();
        setTodos(result);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTargets = async () => {
      try {
        const res = await fetch(`/api/targets?${query}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("目標の取得に失敗しました。");
        }

        const result: Target[] = await res.json();
        setTargets(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
    fetchTargets();
  }, []);

  const getTodosByMonth = (month: number) => {
    return todos.filter((todo) => todo.month === month);
  };

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      className="!px-12 h-[85vh]"
    >
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        {allYearAndMonth.slice(0, 3).map((month) => (
          <div key={month} className="@container flex flex-col max-h-[85vh]">
            <TodoHeader
              month={month}
              targets={targets}
              setTargets={setTargets}
              progress={progress}
              setProgress={setProgress}
            />
            <TaskInput month={month} todos={todos} setTodos={setTodos} />
            <div className="flex-grow overflow-y-auto">
              {getTodosByMonth(month).map((todo) => (
                <Card
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  progress={progress}
                  setProgress={setProgress}
                />
              ))}
            </div>
          </div>
        ))}
      </SwiperSlide>
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        {allYearAndMonth.slice(3, 6).map((month) => (
          <div key={month} className="@container flex flex-col max-h-[85vh]">
            <TodoHeader
              month={month}
              targets={targets}
              setTargets={setTargets}
              progress={progress}
              setProgress={setProgress}
            />
            <TaskInput month={month} todos={todos} setTodos={setTodos} />
            <div className="flex-grow overflow-y-auto">
              {getTodosByMonth(month).map((todo) => (
                <Card
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  progress={progress}
                  setProgress={setProgress}
                />
              ))}
            </div>
          </div>
        ))}
      </SwiperSlide>
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        {allYearAndMonth.slice(6, 9).map((month) => (
          <div key={month} className="@container flex flex-col max-h-[85vh]">
            <TodoHeader
              month={month}
              targets={targets}
              setTargets={setTargets}
              progress={progress}
              setProgress={setProgress}
            />
            <TaskInput month={month} todos={todos} setTodos={setTodos} />
            <div className="flex-grow overflow-y-auto">
              {getTodosByMonth(month).map((todo) => (
                <Card
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  progress={progress}
                  setProgress={setProgress}
                />
              ))}
            </div>
          </div>
        ))}
      </SwiperSlide>
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        {allYearAndMonth.slice(-3).map((month) => (
          <div key={month} className="@container flex flex-col max-h-[85vh]">
            <TodoHeader
              month={month}
              targets={targets}
              setTargets={setTargets}
              progress={progress}
              setProgress={setProgress}
            />
            <TaskInput month={month} todos={todos} setTodos={setTodos} />
            <div className="flex-grow overflow-y-auto">
              {getTodosByMonth(month).map((todo) => (
                <Card
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  progress={progress}
                  setProgress={setProgress}
                />
              ))}
            </div>
          </div>
        ))}
      </SwiperSlide>
    </Swiper>
  );
}
