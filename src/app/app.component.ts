import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data = [1, 2]
  title = 'angular-template';
  arrGrammar: any = null;
  constructor() { }

  ngOnInit(): void {

  }

}
