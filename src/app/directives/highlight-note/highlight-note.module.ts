import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightNoteDirective } from './highlight-note.directive';



@NgModule({
  declarations: [
    HighlightNoteDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightNoteDirective
  ]
})
export class HighlightNoteModule { }
