import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { HomeModule } from "./home/home.module";

// Components
import { ServicesComponent } from "./services/services.component";
import { ContactComponent } from "./contact/contact.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "services",
    component: ServicesComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
];

@NgModule({
  declarations: [ServicesComponent, ContactComponent],
  imports: [SharedModule, RouterModule.forChild(routes), HomeModule],
})
export class PublicModule {}
