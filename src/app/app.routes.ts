import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./public/public.routes").then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.routes").then((m) => m.ADMIN_ROUTES),
  },
  {
    path: "client",
    loadChildren: () =>
      import("./client/client.module").then((m) => m.ClientModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
