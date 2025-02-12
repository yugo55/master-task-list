import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_app",
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user_id");
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM targets WHERE user_id = ?",
      [userId]
    );
    connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("目標の取得に失敗しました。");
    return NextResponse.json(
      { error: "目標の取得に失敗しました。" },
      { status: 500 }
    );
  }
}
