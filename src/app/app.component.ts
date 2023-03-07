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
  constructor(private writtingAiService: WritingAiService) { }

  ngOnInit(): void {
    this.writtingAiService.getData().subscribe((res2: any) => {
      if (res2) {
        console.log(res2);
        this.arrGrammar = res2
        // this.arrGrammar = res2?.data?.data;
      } else {
        this.arrGrammar = [];
      }
    })
  }

}
