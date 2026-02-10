import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || "oykotxim";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  if (password === DASHBOARD_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("dashboard-auth", "authenticated", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30日間
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ success: false, message: "パスワードが正しくありません" }, { status: 401 });
}
