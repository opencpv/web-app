import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if USE_WAITLIST is enabled
  const useWaitlist = process.env.USE_WAITLIST === "true";

  // Get the current path
  const path = request.nextUrl.pathname;

  // If waitlist is enabled and we're not on landing page or api routes
  if (
    useWaitlist &&
    path !== "/landing" &&
    !path.startsWith("/api/") &&
    !path.includes("._next") &&
    !path.includes("/static/")
  ) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  // Allow access to all other pages when waitlist is disabled or conditions not met
  return NextResponse.next();
}

// Configure which paths the middleware will run on
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. all files in public directory
     */
    "/((?!api|_next|static|[\\w-]+\\.\\w+).*)",
  ],
};
