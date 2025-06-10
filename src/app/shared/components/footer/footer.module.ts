import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FooterComponent } from "./footer.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslateModule],
  exports: [FooterComponent],
})
export class FooterModule {}
