import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RequestServiceComponent } from "../client/request-service/request-service.component";
import { HomeModule } from "./home/home.module";
import { ContactModule } from "./contact/contact.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "services",
    loadChildren: () =>
      import("./services/services.module").then((m) => m.ServicesModule),
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
  {
    path: "thank-you",
    loadChildren: () =>
      import("./thank-you/thank-you.module").then((m) => m.ThankYouModule),
  },
  {
    path: "terms",
    loadChildren: () =>
      import("./terms/terms.module").then((m) => m.TermsModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HomeModule,
    TranslateModule.forChild(),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicModule {}
