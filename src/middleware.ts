import { NextRequest } from "next/server";
import { MiddlewareBase } from "./middleware-config/middleware-base";
import { ServerUsagePostMiddleware } from "./app/api/server-usage/middleware";

export async function middleware(req: NextRequest) {
  // Register middleware
  const middlewares: MiddlewareBase[] = [
    new ServerUsagePostMiddleware(req)
  ]

  // Execute middleware
  for (const middleware of middlewares) {
    const result = await middleware.execute();
    if (result) return result
  }
}

export const config = {
  matcher: [
    '/((?!common|raise|fonts|_next|icon.ico|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
  runtime: 'nodejs',
};