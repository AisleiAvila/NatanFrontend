import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientList } from "./client-list/client-list";
import { ClientForm } from "./client-form/client-form";

@NgModule({
  imports: [CommonModule, ClientList, ClientForm],
  // Não declarar ou exportar ClientsPageComponent standalone
})
export class ClientsModule {}
