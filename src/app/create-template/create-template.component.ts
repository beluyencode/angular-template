import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

  listElement: any = [];

  constructor(
  ) {

  }

  ngOnInit(): void {

  }


  addElement() {
    this.listElement.push({
      name: 'element' + this.listElement.length,
      color: '',
      fontSize: 15,
      content: 'element' + this.listElement.length,
      position: {
        top: 0,
        left: 0
      }
    });
  }
}
