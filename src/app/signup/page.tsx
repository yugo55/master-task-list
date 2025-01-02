"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "アカウント作成に失敗しました。");
      }

      alert(result.message);
      router.push("/login");
    } catch (error: any) {
      console.error("エラー:", error.message);
      alert("アカウント作成に失敗しました。");
    }
  };

  return (
    <main className="grid place-items-center h-screen">
      <div>
        <h1 className="text-center mb-7 font-bold text-2xl">サインアップ</h1>

        <div className="mb-5">
          <label htmlFor="email" className="mb-1 block">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="block p-1 border rounded-lg border-green-300 focus:border-green-500 focus:border-2 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="mb-1 block">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            className="block p-1 border rounded-lg border-green-300 focus:border-green-500 focus:border-2 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={() => signup(email, password)}
          className="h-[50px] w-[100px] bg-green-300 block mx-auto rounded-lg hover:opacity-70 transition-all"
        >
          サインアップ
        </button>
      </div>
    </main>
  );
}
