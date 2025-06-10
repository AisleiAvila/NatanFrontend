import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
