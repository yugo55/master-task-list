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
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      "SELECT EXISTS(SELECT * FROM users WHERE email = ? AND password = ?) AS user_check",
      [email, password]
    );
    const [rows] = await connection.execute(
      "SELECT id FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    await connection.end();

    return NextResponse.json({ rows, result });
  } catch (error) {
    console.error("アカウントが見つかりませんでした。");
    return NextResponse.json(
      { error: "アカウントが見つかりませんでした。" },
      { status: 500 }
    );
  }
}
