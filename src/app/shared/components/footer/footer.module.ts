import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FooterComponent } from "./footer.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    FooterComponent,
  ],
  exports: [FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterModule {}
