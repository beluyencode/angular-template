import { Directive, Input, OnInit } from '@angular/core';
import { Template } from '../../create-template';

@Directive({
  selector: '[appMoveSettingTemplateEle]'
})
export class MoveSettingTemplateEleDirective implements OnInit {
  @Input() isSelect = false;
  @Input() data: Template;

  constructor() { }

  ngOnInit(): void {
    console.log(this.isSelect);
  }

}
