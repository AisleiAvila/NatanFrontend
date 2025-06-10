import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HeaderModule } from "./components/header/header.module";
import { FooterModule } from "./components/footer/footer.module";
import { CookieBannerComponent } from "./cookie-banner/cookie-banner.component";
import { LanguageSelectorModule } from "./components/language-selector/language-selector.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [CookieBannerComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    LanguageSelectorModule,
    TranslateModule,
  ],
  exports: [
    HeaderModule,
    FooterModule,
    CookieBannerComponent,
    LanguageSelectorModule,
    TranslateModule,
  ],
})
export class SharedModule {}
