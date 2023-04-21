import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightNoteDirective } from './highlight-note.directive';
import { TranslatePopupComponent } from './translate-popup/translate-popup.component';
import { TranslatePopupService } from './translate-popup/translate-popup.service';

import { HttpClientModule } from '@angular/common/http'
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

@NgModule({
  declarations: [
    HighlightNoteDirective,
    TranslatePopupComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HighlightNoteDirective
  ],
  providers: [
    TranslatePopupService
  ]
})
export class HighlightNoteModule { }
