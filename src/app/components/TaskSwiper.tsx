import Card from "@/app/components/Card";
import TodoHeader from "@/app/components/TodoHeader";
import TaskInput from "@/app/components/TaskInput";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useEffect } from "react";
import { Todo } from "@/app/types/types";

export default function TaskSwiper() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("/api/todos", {
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

    fetchTodos();
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
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="1" />
          <TaskInput month={202501} />
          <div className="flex-grow overflow-y-auto">
            {getTodosByMonth(202501).map((todo) => (
              <Card key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="2" />
          <TaskInput month={202502} />
          <div className="flex-grow overflow-y-auto">
            {getTodosByMonth(202502).map((todo) => (
              <Card key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="3" />
          <TaskInput month={202503} />
          <div className="flex-grow overflow-y-auto">
            {getTodosByMonth(202503).map((todo) => (
              <Card key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </SwiperSlide>
      {/* <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="4" />
          <TaskInput month={202504} />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="5" />
          <TaskInput month={202505} />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="6" />
          <TaskInput month={202506} />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="7" />
          <TaskInput month={202507} />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="8" />
          <TaskInput month={202508} />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="9" />
          <TaskInput month={202509} />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="10" />
          <TaskInput month={202510} />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="11" />
          <TaskInput month={202511} />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="@container flex flex-col max-h-[85vh]">
          <TodoHeader month="12" />
          <TaskInput month={202512} />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
      </SwiperSlide> */}
    </Swiper>
  );
}
