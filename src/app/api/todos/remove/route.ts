import { NextRequest, NextResponse } from "next/server";
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
    const [rows] = await connection.execute<ResultSetHeader>(
      "SELECT id FROM todos WHERE id = ?",
      [res.id]
    );
    await connection.execute<ResultSetHeader>(
      "DELETE FROM todos WHERE id = ?",
      [res.id]
    );
    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("タスクの削除に失敗しました:", error);
    return NextResponse.json(
      { message: "タスクの削除に失敗しました。" },
      { status: 500 }
    );
  }
}
