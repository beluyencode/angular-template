import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightNoteDirective } from './highlight-note.directive';
import { TranslatePopupComponent } from './translate-popup/translate-popup.component';



@NgModule({
  declarations: [
    HighlightNoteDirective,
    TranslatePopupComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightNoteDirective
  ]
})
export class HighlightNoteModule { }
