import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTemplateComponent } from './create-template.component';
import { CreateTemplateInfoComponent } from './create-template-info/create-template-info.component';
import { CreateTemplateListComponent } from './create-template-list/create-template-list.component';
import { CreateTemplateService } from './create-template.service';
import { CreateTemplateViewComponent } from './create-template-view/create-template-view.component';
import { FormsModule } from '@angular/forms';
import { CreateTemplateViewEleComponent } from './create-template-view/create-template-view-ele/create-template-view-ele.component';
import { MoveSettingTemplateEleDirective } from './create-template-view/create-template-view-ele/move-setting-template-ele.directive';


@NgModule({
  declarations: [
    CreateTemplateComponent,
    CreateTemplateInfoComponent,
    CreateTemplateListComponent,
    CreateTemplateViewComponent,
    CreateTemplateViewEleComponent,
    MoveSettingTemplateEleDirective,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CreateTemplateComponent
  ],
  providers: []
})
export class CreateTemplateModule { }
