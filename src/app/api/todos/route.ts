import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_app",
  dateStrings: true,
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const user_id = searchParams.get("user_id");
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );
    connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error("タスク取得に失敗しました:", error);
    return NextResponse.json(
      { error: "タスク取得に失敗しました。" },
      { status: 500 }
    );
  }
}
