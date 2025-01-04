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
    const [result] = await connection.execute<ResultSetHeader>(
      "INSERT targets (content, month, user_id) VALUES (?, ?, ?)",
      [res.content, res.month, res.user_id]
    );
    const [rows] = await connection.execute<ResultSetHeader>(
      "SELECT * FROM targets WHERE id = ?",
      [result.insertId]
    );
    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("目標追加に失敗しました。");
    return NextResponse.json(
      { error: "目標追加に失敗しました。" },
      { status: 500 }
    );
  }
}
