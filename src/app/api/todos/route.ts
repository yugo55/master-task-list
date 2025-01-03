import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_app",
  dateStrings: true,
};

export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM todos ORDER BY created_at DESC"
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
