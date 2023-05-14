import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TypeScreen } from './create-template';
import { CreateTemplateService } from './create-template.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
  providers: [
    CreateTemplateService
  ]
})
export class CreateTemplateComponent implements OnInit {
  @ViewChild('view') ele: ElementRef;

  constructor(
    public createTemplateService: CreateTemplateService,
  ) { }

  ngOnInit(): void {
  }

}
