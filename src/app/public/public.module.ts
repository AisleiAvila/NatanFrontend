import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RequestServiceComponent } from "../client/request-service/request-service.component";
import { HomeModule } from "./home/home.module";
import { ContactModule } from "./contact/contact.module";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "request-service",
    component: RequestServiceComponent,
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./contact/contact.module").then((m) => m.ContactModule),
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), HomeModule],
})
export class PublicModule {}
