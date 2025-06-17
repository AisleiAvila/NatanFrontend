import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SubcategoryListComponent } from "./subcategory-list/subcategory-list.component";
import { SubcategoryFormComponent } from "./subcategory-form/subcategory-form.component";

const routes: Routes = [
  {
    path: "",
    component: SubcategoryListComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SubcategoryListComponent,
    SubcategoryFormComponent,
  ],
})
export class SubcategoriesModule {}
