import { Component, OnInit } from '@angular/core';
import { BackgroundTemplate, Template } from '../create-template';
import { CreateTemplateService } from '../create-template.service';

@Component({
  selector: 'app-create-template-info',
  templateUrl: './create-template-info.component.html',
  styleUrls: ['./create-template-info.component.scss']
})
export class CreateTemplateInfoComponent implements OnInit {
  activeTemplate: Template | BackgroundTemplate;

  constructor(
    public createTemplateService: CreateTemplateService,
  ) { }

  ngOnInit(): void {
    this.createTemplateService.listen_active_template().subscribe((res: Template) => {
      if (res) {
        this.activeTemplate = res;
      } else {
        this.activeTemplate = this.createTemplateService.background;
      }
    })
  }

}
