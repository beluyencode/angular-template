import { Component, OnInit } from '@angular/core';
import { BackgroundTemplate, Template, TypeAction, TypeAlign, TypeScreen } from '../create-template';
import { CreateTemplateService } from '../create-template.service';

@Component({
  selector: 'app-create-template-info',
  templateUrl: './create-template-info.component.html',
  styleUrls: ['./create-template-info.component.scss']
})
export class CreateTemplateInfoComponent implements OnInit {
  activeTemplate: any;
  isTemplate = false;
  typeAlign: Array<string> = Object.values(TypeAlign);
  typeScreen = Object.values(TypeScreen);
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
    this.createTemplateService.changeTemplate(TypeAction.CHANGE, this.activeTemplate);
  }

  log(e: any) {
    console.log(e);

  }
}
