import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTemplateComponent } from './create-template.component';
import { TemplateEleComponent } from './template-ele/template-ele.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    CreateTemplateComponent,
    TemplateEleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    CreateTemplateComponent
  ]
})
export class CreateTemplateModule { }
