import { NextResponse } from "next/server";

// @ts-expect-error require typization
import { isAuthenticated } from "@slidebook/server/lib/authenticate.js";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        if (isAuthenticated(password)) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: "Invalid host password" }, { status: 401 });
        }
    } catch {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
