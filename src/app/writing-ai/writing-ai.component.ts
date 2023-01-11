import { Component, OnInit } from '@angular/core';
import { CheckGrammarFeedbackType, WritingAiResType } from './writing-ai';
import { WritingAiService } from './writing-ai.service';

@Component({
  selector: 'app-writing-ai',
  templateUrl: './writing-ai.component.html',
  styleUrls: ['./writing-ai.component.scss']
})
export class WritingAiComponent implements OnInit {
  data: any = [];

  constructor(
    private writingAi: WritingAiService
  ) { }

  ngOnInit(): void {
    this.writingAi.getData().subscribe((res: WritingAiResType) => {
      this.data = this.convertResData(res.check_grammar_feedback);
    })
  }

  convertResData(array: CheckGrammarFeedbackType[]) {
    let data: any = [];
    let prevData = '';
    let prevIndex = 0;
    array.forEach((element: CheckGrammarFeedbackType, index: number) => {
      if (prevData !== element.context) {
        prevData = element.context;
        if (index !== 0) {
          data.push(array.slice(prevIndex, index));
          prevIndex = index;
        }
      }
    });
    data.push(array.slice(prevIndex, array.length));
    return data;
  }



}
