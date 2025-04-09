import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        if (password === process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: "Invalid admin password" }, { status: 401 });
        }
    } catch {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
