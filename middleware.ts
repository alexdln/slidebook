import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Redirect root to first slide
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/1", request.url));
    }

    // Handle invalid pathnames
    if (request.nextUrl.pathname !== "/admin" && !request.nextUrl.pathname.match(/^\/\d+$/)) {
        return NextResponse.redirect(new URL("/1", request.url));
    }

    return NextResponse.next();
}
