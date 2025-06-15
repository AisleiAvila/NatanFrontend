import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageSelectorModule } from "./components/language-selector/language-selector.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, LanguageSelectorModule, TranslateModule],
  exports: [CommonModule, LanguageSelectorModule, TranslateModule],
})
export class SharedModule {}
