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
    const month = searchParams.get("month");
    const userId = searchParams.get("userId");
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT concat(round((sum(case is_completed WHEN '1' THEN 1 ELSE 0 END)/count(*) * 100), 0)) as per FROM todos WHERE month = ? AND user_id = ?",
      [month, userId]
    );
    connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("進捗率取得に失敗しました。:", error);
    return NextResponse.json({ error: "進捗率取得に失敗" }, { status: 500 });
  }
}
