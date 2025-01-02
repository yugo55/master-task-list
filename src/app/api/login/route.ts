import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

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
    const [result] = await connection.execute(
      "SELECT EXISTS(SELECT * FROM users WHERE email = ? AND password = ?) AS user_check",
      [res.email, res.password]
    );
    await connection.end();

    return NextResponse.json(result);
  } catch (error) {
    console.error("アカウントが見つかりませんでした。");
    return NextResponse.json(
      { error: "アカウントが見つかりませんでした。" },
      { status: 500 }
    );
  }
}
