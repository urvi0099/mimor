import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailToLinkPipe } from './email-to-link.pipe';
import { UrlToLinkPipe } from './url-to-link.pipe';
import { PhoneToLinkPipe } from './phone-to-link.pipe';

@NgModule({
  declarations: [
    EmailToLinkPipe,
    UrlToLinkPipe,
    PhoneToLinkPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    EmailToLinkPipe,
    UrlToLinkPipe,
    PhoneToLinkPipe
  ],
})
export class PipesModule { }
