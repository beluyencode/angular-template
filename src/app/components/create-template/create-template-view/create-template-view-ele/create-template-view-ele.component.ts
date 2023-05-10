import { Component, Input, OnInit } from '@angular/core';
import { Template } from '../../create-template';
import { CreateTemplateService } from '../../create-template.service';

@Component({
  selector: 'app-create-template-view-ele',
  templateUrl: './create-template-view-ele.component.html',
  styleUrls: ['./create-template-view-ele.component.scss']
})
export class CreateTemplateViewEleComponent implements OnInit {
  @Input() data: Template;
  activeTemplate: Template | null;

  constructor(
    public createTemplateService: CreateTemplateService,
  ) { }

  ngOnInit(): void {
    this.createTemplateService.listen_active_template().subscribe((res: Template | null) => {
      this.activeTemplate = res;
    })
  }

  active() {
    this.createTemplateService.active_template.next(this.data);
  }
}
