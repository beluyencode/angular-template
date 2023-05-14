import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Template } from '../../create-template';
import { CreateTemplateService } from '../../create-template.service';

@Directive({
  selector: '[appMoveSettingTemplateEle]'
})
export class MoveSettingTemplateEleDirective implements OnInit {
  @Input() isSelect = false;
  @Input() data: Template;

  constructor(
    public createTemplateService: CreateTemplateService,
    private ele: ElementRef

  ) { }

  ngOnInit(): void {
    this.createTemplateService.listen_active_template().subscribe((res: Template) => {
      if (res?.id === this.data.id) {
        this.isSelect = true;

      } else {
        this.isSelect = false;
      }
    })
  }

}
