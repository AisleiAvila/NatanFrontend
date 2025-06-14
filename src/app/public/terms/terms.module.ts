import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TermsComponent } from "./terms.component";

const routes: Routes = [{ path: "", component: TermsComponent }];

@NgModule({
  declarations: [TermsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TermsModule {}
