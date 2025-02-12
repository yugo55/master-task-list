import { NextRequest, NextResponse } from "next/server";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

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
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT is_completed FROM todos WHERE id = ?",
      [res.id]
    );

    if (rows.length === 0) {
      await connection.end();
      return NextResponse.json(
        { error: "タスクが見つかりませんでした。" },
        { status: 404 }
      );
    }

    const isConpleted = (rows[0] as { is_completed: number }).is_completed;

    if (isConpleted === 0) {
      await connection.execute<ResultSetHeader>(
        "UPDATE todos SET is_completed = 1 WHERE id = ?",
        [res.id]
      );

      await connection.end();
      return NextResponse.json({ message: "タスク完了" });
    } else {
      await connection.execute<ResultSetHeader>(
        "UPDATE todos SET is_completed = 0 WHERE id = ?",
        [res.id]
      );

      await connection.end();
      return NextResponse.json({ message: "タスク未完了" });
    }
  } catch (error) {
    console.error("データベースエラー:", error);
    return NextResponse.json({ error: "データベースエラー" }, { status: 500 });
  }
}
