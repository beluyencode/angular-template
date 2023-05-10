import { Component, OnInit } from '@angular/core';
import { BackgroundTemplate, Template, TypeAction } from '../create-template';
import { CreateTemplateService } from '../create-template.service';

@Component({
  selector: 'app-create-template-info',
  templateUrl: './create-template-info.component.html',
  styleUrls: ['./create-template-info.component.scss']
})
export class CreateTemplateInfoComponent implements OnInit {
  activeTemplate: any;
  isTemplate = false;

  constructor(
    public createTemplateService: CreateTemplateService,
  ) { }

  ngOnInit(): void {
    this.createTemplateService.listen_active_template().subscribe((res: Template) => {
      if (res) {
        this.activeTemplate = res;
        this.isTemplate = true;
      } else {
        this.activeTemplate = this.createTemplateService.background;
        this.isTemplate = false;
      }
    })
  }

  saveAttr() {
    this.createTemplateService.changeTemplate(this.activeTemplate, TypeAction.CHANGE);
  }

}
