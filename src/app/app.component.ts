import { Component, OnInit } from '@angular/core';
import { WritingAiService } from './writing-ai/writing-ai.service';

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
