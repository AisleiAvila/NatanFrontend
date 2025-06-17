import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ThankYouComponent } from "./thank-you.component";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [{ path: "", component: ThankYouComponent }];

@NgModule({
  declarations: [ThankYouComponent],
  imports: [CommonModule, MatButtonModule, RouterModule.forChild(routes)],
})
export class ThankYouModule {}
