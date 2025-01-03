import { NextRequest, NextResponse } from "next/server";
import mysql, { ResultSetHeader } from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_app",
  dateStrings: true,
};

export async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute<ResultSetHeader>(
      "INSERT todos (title, deadline, created_at, is_completed, month) VALUES (?, ?, ?, 0, ?)",
      [res.title, res.formattedDeadline, res.formattedCreatedAt, res.month]
    );
    const [rows] = await connection.execute<ResultSetHeader>(
      "SELECT * FROM todos WHERE id = ?",
      [result.insertId]
    );
    await connection.end();

    return NextResponse.json({
      rows: rows,
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("タスク追加に失敗しました:", error);
    return NextResponse.json(
      { error: "タスク追加に失敗しました。" },
      { status: 500 }
    );
  }
}
