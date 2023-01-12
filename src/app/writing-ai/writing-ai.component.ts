import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CheckGrammarFeedbackType, WritingAiResType } from './writing-ai';
import { WritingAiService } from './writing-ai.service';

@Component({
  selector: 'app-writing-ai',
  templateUrl: './writing-ai.component.html',
  styleUrls: ['./writing-ai.component.scss']
})
export class WritingAiComponent implements OnInit {
  @ViewChild('writingResults') ele: ElementRef;
  data: any = [];

  constructor(
    private writingAi: WritingAiService,
    private renderer2: Renderer2
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

  createGrammarError() {
    const div = this.renderer2.createElement('span');

  }



}
