import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./public/public.module").then((m) => m.PublicModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "client",
    loadChildren: () =>
      import("./client/client.module").then((m) => m.ClientModule),
    canActivate: [AuthGuard],
  },
  {
    path: "provider",
    loadChildren: () =>
      import("./provider/provider.module").then((m) => m.ProviderModule),
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
