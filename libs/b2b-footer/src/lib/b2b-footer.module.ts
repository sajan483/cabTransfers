import { NgModule } from '@angular/core';
import { B2bFooterComponent } from './components/footer/b2b-footer.component';
import { FooterLinksComponent } from './components/footer-links/footer-links.component';
import { FooterBottomComponent } from './components/footer-bottom/footer-bottom.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    B2bFooterComponent,
    FooterLinksComponent,
    FooterBottomComponent,
  ],
  imports: [FlexLayoutModule],
  exports: [B2bFooterComponent, FooterLinksComponent, FooterBottomComponent],
})
export class B2bFooterModule {}
