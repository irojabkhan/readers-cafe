
export { default } from "next-auth/middleware"

export const config = { matcher: ["/home", "/books/:path*", "/coffee/:path*", "/cart"] }