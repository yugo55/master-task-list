"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskSwiper from "@/app/components/TaskSwiper";

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
      <TaskSwiper />
    </main>
  );
}
