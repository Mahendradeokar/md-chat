import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const protectedRoutes = ["/conversation/:id", "/settings", "/"];

const isProtectedRoute = createRouteMatcher(protectedRoutes);
const isAuthPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const isAuthenticated = await convexAuth.isAuthenticated();

    if (isAuthPage(request) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/");
    }
    if (isProtectedRoute(request) && !isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }
  },
  { cookieConfig: { maxAge: 60 * 60 * 24 * 30 }, verbose: false },
);

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
