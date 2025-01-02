import { NextResponse, NextRequest } from "next/server";
import mysql, { ResultSetHeader } from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_app",
};

export async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute<ResultSetHeader>(
      "INSERT users (email, password) VALUES (?, ?)",
      [res.email, res.password]
    );
    await connection.end();

    return NextResponse.json({
      message: "アカウントが作成されました。",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("アカウント作成に失敗しました:", error);
    return NextResponse.json(
      { error: "アカウント作成に失敗しました。" },
      { status: 500 }
    );
  }
}
