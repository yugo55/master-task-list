export default function Login() {
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
          />
        </div>

        <button className="h-[40px] w-[90px] bg-green-300 block mx-auto rounded-lg hover:opacity-70 transition-all">
          ログイン
        </button>
      </div>
    </main>
  );
}
