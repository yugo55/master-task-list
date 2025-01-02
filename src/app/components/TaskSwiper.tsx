import Card from "@/app/components/Card";
import TodoHeader from "@/app/components/TodoHeader";
import TaskInput from "@/app/components/TaskInput";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TaskSwiper() {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      className="!px-12 h-[85vh]"
    >
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="1" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="2" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="3" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="4" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="5" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="6" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="7" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="8" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="9" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!grid grid-cols-3 gap-14 mx-auto box-content">
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="10" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="11" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="12" />
          <TaskInput />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
