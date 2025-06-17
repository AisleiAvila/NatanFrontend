import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { TranslateModule } from "@ngx-translate/core";
import { CalendarComponent } from "./calendar/calendar.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "calendar",
    component: CalendarComponent,
  },
];

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    TranslateModule.forChild(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProviderModule {}
