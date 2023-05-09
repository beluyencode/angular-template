import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTemplateComponent } from './create-template.component';
import { CreateTemplateInfoComponent } from './create-template-info/create-template-info.component';
import { CreateTemplateListComponent } from './create-template-list/create-template-list.component';
import { CreateTemplateService } from './create-template.service';
import { CreateTemplateViewComponent } from './create-template-view/create-template-view.component';


@NgModule({
  declarations: [
    CreateTemplateComponent,
    CreateTemplateInfoComponent,
    CreateTemplateListComponent,
    CreateTemplateViewComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CreateTemplateComponent
  ],
  providers: [
    CreateTemplateService
  ]
})
export class CreateTemplateModule { }
