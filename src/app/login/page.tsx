"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email: string, password: string) => {
    try {
      const query = new URLSearchParams({ email, password }).toString();
      const res = await fetch(`/api/login?${query}`, {
        method: "GET",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "ログインに失敗しました。");
      }

      if (result.result[0].user_check === 1) {
        var N = 255;
        const token = btoa(
          String.fromCharCode(...crypto.getRandomValues(new Uint8Array(N)))
        ).substring(0, N);
        const user_id = result.rows[0].id;
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id);
        router.push("/todo");
      } else {
        alert("ログインに失敗しました。");
      }
    } catch (error: any) {
      console.error("エラー:", error.message);
      alert("ログインに失敗しました。");
    }
  };

  return (
    <main className="grid place-items-center h-screen">
      <div>
        <h1 className="text-center mb-7 font-bold text-2xl">ログイン</h1>

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
          onClick={() => login(email, password)}
          className="h-[40px] w-[90px] bg-green-300 block mx-auto rounded-lg hover:opacity-70 transition-all"
        >
          ログイン
        </button>
      </div>
    </main>
  );
}
