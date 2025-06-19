import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ADMIN_ROUTES } from "./admin.routes";
import { ClientsModule } from "./clients/clients-module";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ADMIN_ROUTES), ClientsModule],
})
export class AdminModule {}
