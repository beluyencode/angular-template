import { Component } from '@angular/core';
import { CreateTemplateService } from '../create-template.service';

@Component({
  selector: 'app-create-template-list',
  templateUrl: './create-template-list.component.html',
  styleUrls: ['./create-template-list.component.scss']
})
export class CreateTemplateListComponent {

  constructor(
    private createTemplateService: CreateTemplateService
  ) { }

  fullScreen() {
    this.createTemplateService.fullScreen.next(true);
  }
}
