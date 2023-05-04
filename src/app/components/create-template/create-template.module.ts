import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTemplateComponent } from './create-template.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    CreateTemplateComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    CreateTemplateComponent
  ]
})
export class CreateTemplateModule { }
