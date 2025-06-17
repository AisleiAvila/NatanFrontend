import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ContactComponent } from "./contact.component";
import { LanguageSelectorModule } from "@shared/components/language-selector/language-selector.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";

const routes: Routes = [
  {
    path: "",
    component: ContactComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    LanguageSelectorModule,
    TranslateModule.forChild(),
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    ContactComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContactModule {}
