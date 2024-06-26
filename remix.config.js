import { createRoutesFromFolders } from "@remix-run/v1-route-convention";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",

  routes(defineRoutes) {
    // return createRoutesFromFolders(defineRoutes)

    // return defineRoutes((route) => {
    //   if (process.env.INCLUDE_TEST_ROUTES) {
    //     if (process.env.NODE_ENV === "production") {
    //       console.warn("WARNING: NODE_ENV is set to production");
    //       return;
    //     }
    //     route("__tests/login", "__test-routes__/login.tsx");
    //   }
    // });

    const customRoutes = defineRoutes((route) => {
      if (process.env.INCLUDE_TEST_ROUTES) {
        if (process.env.NODE_ENV === "production") {
          console.warn("WARNING: NODE_ENV is set to production");
          return;
        }
        route("__tests/login", "__test-routes__/login.tsx");
        route("__tests/delete-user", "__test-routes__/delete-user.tsx");
      }
    });

    const folderRoutes = createRoutesFromFolders(defineRoutes);

    const mergedRoutes = Object.assign({}, customRoutes, folderRoutes);
    return mergedRoutes;
  },
};
