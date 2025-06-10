import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginModule } from "./login/login.module";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LoginModule],
})
export class AuthModule {}
