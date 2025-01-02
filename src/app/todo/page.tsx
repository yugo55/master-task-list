"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/app/components/Card";
import TodoHeader from "@/app/components/TodoHeader";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  });

  return (
    <main>
      <h1 className="font-bold text-6xl text-center my-5">2025</h1>
      <div className="grid grid-cols-3 gap-14 container mx-auto px-4 box-content">
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="1" />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="2" />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
        <div className="flex flex-col max-h-[85vh]">
          <TodoHeader month="3" />
          <div className="flex-grow overflow-y-auto">
            <Card />
          </div>
        </div>
      </div>
    </main>
  );
}
