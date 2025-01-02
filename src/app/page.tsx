import Link from "next/link";

export default function Home() {
  return (
    <main className="grid place-items-center h-screen">
      <div className="flex gap-5">
        <Link
          href={"/login"}
          className="h-[50px] w-[100px] bg-green-300 grid place-items-center rounded-lg hover:opacity-70 transition-all"
        >
          ログイン
        </Link>

        <Link
          href={"/signup"}
          className="h-[50px] w-[100px] border-green-300 border grid place-items-center rounded-lg hover:opacity-70 transition-all"
        >
          サインアップ
        </Link>
      </div>
    </main>
  );
}
