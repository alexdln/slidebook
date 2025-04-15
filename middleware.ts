import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (!pathname.match(/^\/(\d+|admin|list)$/)) {
        return NextResponse.redirect(new URL("/1", request.url));
    }

    if (pathname.match(/^\/\d+\/(\d+|f|l)$/)) {
        return NextResponse.rewrite(new URL(pathname.match(/^\/\d+/)?.[1] ?? "/1", request.url));
    }

    return NextResponse.next();
}
