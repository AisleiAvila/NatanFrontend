import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TranslateModule } from "@ngx-translate/core";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    TranslateModule.forChild(),
    DashboardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
